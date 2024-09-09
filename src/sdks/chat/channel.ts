// import { getUrls } from "../../utilis/string";
// import { ChatSDK } from "./ChatSDK";
// import {
//   EventPayloads,
//   EventsType,
//   TypingEventPayload,
//   ChannelPresencePayload,
//   ChannelReadPayload,
//   MessageReactionPayload,
// } from "./Events";
// import { MessagesCollection } from "./collections/messages-collection";
// import {
//   Message,
//   Channel as ChannelType,
//   MessagesQueryFilter,
//   MessageStatus,
//   SendMessageInput,
// } from "./types";
// import _ from "lodash";
// type ChannelOptions = {
//   offline?: boolean;
//   isInit?: boolean;
// };
// export class Channel {
//   sdk: ChatSDK;
//   id: string;
//   lastTypingEvent: Date | null;
//   isTyping: boolean;
//   isInit?: boolean;
//   isJoined?: boolean;
//   isSubscribed: boolean;
//   data: Partial<ChannelType>;

//   constructor(
//     sdk: ChatSDK,
//     id: string,
//     data?: Partial<ChannelType>,
//     options: ChannelOptions = { isInit: true, offline: false }
//   ) {
//     this.sdk = sdk;
//     this.id = id;
//     this.lastTypingEvent = null;
//     this.isTyping = false;
//     this.data = (data ?? {}) as ChannelType;
//     this.isJoined = false;
//     this.isSubscribed = false;
//     this.isInit = options.isInit;
//   }

//   get membersID() {
//     return this.data?.membersIds?.sort().join(",");
//   }

//   private async fetch(create = false) {
//     if (this.isInit) {
//       return;
//     }
//     let query;
//     if (this.data.membersIds) {
//       const membersStr = this.data.membersIds.sort().join(",");
//       query = { members_exactly_in: membersStr };
//     } else if (this.id) {
//       query = { cids: [this.id] };
//     }

//     const channels = await this.sdk.queryChannels(query);
//     const channel: Channel | undefined = _.first(channels);

//     if (channel) {
//       console.log("Channel found");
//       this.update(channel, { isInit: true });
//       if (this.data.membersIds) {
//         const membersStr = this.data.membersIds.sort().join(",");
//         this.sdk.removeChannel(`members:${membersStr}`);
//       }
//       this.sdk.channels.set(channel.id, this);
//     } else if (create) {
//       await this.create();
//     }

//     await Promise.all([this.subscribe(), this.enter()]);
//   }

//   get unreadCount() {
//     return this.data.unread_count ?? 0;
//   }

//   async create() {
//     if (this.data.membersIds) {
//       await this.sdk.createChannel(this.data.membersIds);
//     }
//   }

//   async enter() {
//     if (this.isJoined || !this.isInit) {
//       return;
//     }

//     this.sdk.sendEvent(EventsType.ChannelEnter, {
//       cid: this.id,
//     } as ChannelPresencePayload);
//     this.isJoined = true;
//   }

//   async exit() {
//     if (!this.isJoined || !this.isInit) {
//       return;
//     }
//     this.sdk.sendEvent(EventsType.ChannelExit, {
//       cid: this.id,
//     } as ChannelPresencePayload);
//     this.lastTypingEvent = null;
//     this.isTyping = false;
//     this.isJoined = false;
//     this.isSubscribed = false;
//   }

//   async block() {
//     const uid = this.data.user?.uid;
//     if (uid) await this.sdk.blockUser(uid);
//   }

//   async unblock() {
//     const uid = this.data.user?.uid;
//     if (uid) await this.sdk.unblockUser(uid);
//   }

//   async sendReaction(mid: string, reaction: string) {
//     this.sdk.listeners.forEach((listener) => {
//       listener.onReactionAdded(this, {
//         cid: this.id,
//         mid,
//         reaction,
//         uid: this.sdk.user?.uid!,
//       });
//     });

//     await Promise.all([
//       this.sdk.cacheManager.addMessageReaction(
//         mid,
//         reaction,
//         this.sdk.user?.uid!
//       ),
//       this.sdk.sendReaction(reaction, mid, this.id),
//     ]);
//   }

//   async deleteReaction(mid: string) {
//     this.sdk.listeners.forEach((listener) => {
//       listener.onReactionRemoved(this, {
//         cid: this.id,
//         mid,
//         uid: this.sdk.user?.uid!,
//         reaction: "",
//       });
//     });
//     await this.sdk.deleteReaction(mid, this.id);
//   }

//   async subscribe() {
//     if (this.isInit && !this.isSubscribed) {
//       await this.sdk.subscribeToChannel(this.id, this.data.user?.uid!);
//       this.isSubscribed = true;
//     }
//   }

//   async unsubscribe() {
//     if (this.isInit && this.isSubscribed) {
//       await this.sdk.unsubscribeToChannel(this.id, this.data.user?.uid!);
//       this.isSubscribed = false;
//     }
//   }

//   update(data: Partial<ChannelType>, options?: ChannelOptions) {
//     this.data = { ...(this.data ?? {}), ...data };

//     if (data.id) {
//       this.id = data.id;
//     }

//     if (options) {
//       this.isInit = options.isInit ?? this.isInit;
//     }

//     if (this.isJoined && !this.isSubscribed) {
//       this.subscribe();
//     }

//     if (this.isInit) {
//       //@ts-ignore
//       this.sdk.cacheManager.saveChannel(this.data);
//     }

//     return this;
//   }

//   async queryMessages(
//     filter: MessagesQueryFilter = {},
//     config: { source?: "local" | "remote" } = { source: "local" }
//   ) {
//     await this.fetch();
//     if (!this.isInit) {
//       return [];
//     }

//     const { source } = config;

//     if (source == "local") {
//       return this.sdk.cacheManager.queryMessages(this.id, { ...filter });
//     }
//     if (source == "remote") {
//       await this.sdk.checkConnection();

//       const apiMessages = await this.sdk.queryMessages(this.id, filter);

//       this.sdk.cacheManager.saveMessages(apiMessages);
//       return apiMessages;
//     }
//     return [];
//   }

//   async sendMessage(message: SendMessageInput) {
//     if (!this.isInit) {
//       await this.fetch(true);
//     }
//     const now = Date.now();
//     const localMessage: Message = {
//       cid: this.id,
//       ...message,
//       uid: this.sdk.user?.uid!,
//       isSenderMe: true,
//       dedup_id: now.toString(),
//       type: "text",
//       created_at: now,
//       updated_at: now,
//       status: MessageStatus.Pending,
//       id: now.toString(),
//     };

//     const urls = getUrls(message.content);

//     if (urls && urls.length) {
//       const url = urls[0];
//       const metadata = this.sdk.ogCache.get(url);
//       if (metadata) {
//         localMessage.og_metadata = metadata;
//       }
//     }
//     this.sdk.listeners.forEach((listener) => {
//       listener.onMessage(this, localMessage);
//       listener.onChannelUpdated(
//         this.update({
//           last_message: localMessage,
//           last_message_at: localMessage.created_at,
//         })
//       );
//     });
//     console.log("message sent", localMessage);
//     await this.sdk.cacheManager.saveMessage(localMessage);

//     // parent message is used for saving in cache only no need to send it

//     const apiMessage = await this.sdk.sendMessage(this.id, {
//       ...message,
//       parent_message: undefined,
//       dedup_id: localMessage.dedup_id,
//     });
//     apiMessage.isSenderMe = true;
//     apiMessage.status = MessageStatus.Sent;

//     this.sdk.setLastSyncAt(apiMessage.created_at);
//   }

//   async markRead() {
//     await this.sdk.markRead(this.id);
//     this.sdk.listeners.forEach((listener) => {
//       listener.onChannelUpdated(this.update({ unread_count: 0 }));
//     });
//   }

//   async startTyping() {
//     if (!this.isInit) {
//       return;
//     }
//     const now = new Date();
//     const diff =
//       this.lastTypingEvent && now.getTime() - this.lastTypingEvent.getTime();
//     this.isTyping = true;
//     if (diff === null || diff > 2000) {
//       this.lastTypingEvent = new Date();
//       await this.sendEvent(EventsType.ChannelTyping, {
//         cid: this.id,
//         typing: true,
//       } as TypingEventPayload);
//     }
//   }

//   async stopTyping() {
//     if (!this.isInit) {
//       return;
//     }
//     this.lastTypingEvent = null;
//     this.isTyping = false;
//     await this.sendEvent(EventsType.ChannelTyping, {
//       cid: this.id,
//       typing: false,
//     } as TypingEventPayload);
//   }

//   async sendEvent(eventType: EventsType, event: EventPayloads) {
//     await this.sdk.sendEvent(eventType, event);
//   }

//   messageCollection(filter: MessagesQueryFilter) {
//     return new MessagesCollection(this, filter);
//   }

//   async handleEvent(eventType: EventsType, event: any) {
//     const { message, channel } = event;

//     switch (eventType) {
//       case EventsType.ChannelUpdated: {
//         console.log("ChannelUpdated");
//         if (channel) {
//           this.sdk.listeners.forEach((listener) => {
//             listener.onChannelUpdated(this.update(channel));
//           });
//           this.sdk.cacheManager.saveChannel(channel);
//         }

//         break;
//       }
//       case EventsType.MessageNew: {
//         const isSenderMe = message.uid === this.sdk.user?.uid;
//         console.log("neww", message);
//         message.status = MessageStatus.Sent;
//         message.isSenderMe = isSenderMe;
//         const update: any = {};
//         if (!isSenderMe) {
//           update.unread_count = this.unreadCount + 1;
//           this.sdk.markDelivered(this.id);
//         }

//         update.last_message = message;
//         update.last_message_at = message.created_at;

//         this.sdk.listeners.forEach((listener) => {
//           listener.onMessage(this, message);
//           listener.onChannelUpdated(this.update(update));
//         });

//         await Promise.all([
//           this.sdk.cacheManager.deleteMessage(message.dedup_id),
//           this.sdk.cacheManager.saveMessage(message),
//         ]);

//         break;
//       }
//       case EventsType.MessageUpdated: {
//         this.sdk.listeners.forEach((listener) => {
//           listener.onMessageUpdated(this, message);
//         });
//         this.sdk.cacheManager.saveMessage(message);

//         break;
//       }
//       case EventsType.MessageReaction: {
//         const { mid, reaction, uid } = event as MessageReactionPayload;

//         this.sdk.listeners.forEach((listener) => {
//           listener.onReactionAdded(this, { cid: this.id, mid, reaction, uid });
//         });

//         await this.sdk.cacheManager.addMessageReaction(mid, reaction, uid);

//         break;
//       }
//       case EventsType.MessageReactionDeleted: {
//         const { mid, uid } = event as MessageReactionPayload;
//         this.sdk.listeners.forEach((listener) => {
//           listener.onReactionRemoved(this, {
//             cid: this.id,
//             mid,
//             reaction: "",
//             uid,
//           });
//         });

//         await this.sdk.cacheManager.deleteMessageReaction(mid, uid);
//         break;
//       }

//       case EventsType.ChannelRead: {
//         const { ts } = event as ChannelReadPayload;
//         this.sdk.listeners.forEach((listener) =>
//           listener.onChannelRead(this.update({ last_read_at: ts }))
//         );
//         this.sdk.cacheManager.updateChannelMessageStatus(
//           this.id,
//           ts,
//           MessageStatus.Read
//         );
//         break;
//       }
//       case EventsType.ChannelDelivered: {
//         const { ts } = event as ChannelReadPayload;
//         this.sdk.listeners.forEach((listener) =>
//           listener.onChannelDelivered(this.update({ last_delivered_at: ts }))
//         );
//         this.sdk.cacheManager.updateChannelMessageStatus(
//           this.id,
//           ts,
//           MessageStatus.Delivered
//         );

//         break;
//       }
//       case EventsType.ChannelTyping: {
//         this.sdk.listeners.forEach((listener) =>
//           listener.onTyping(this, event as TypingEventPayload)
//         );

//         break;
//       }
//     }
//   }
// }
