// import { Channel, Message } from "./types";

// export enum EventsType {
//   ChannelEnter = "channel.enter",
//   ChannelExit = "channel.exit",
//   ChannelTyping = "channel.typing",
//   ChannelSubscribe = "channel.subscribe",
//   ChannelUnsubscribe = "channel.unsubscribe",
//   ChannelDeleted = "channel.deleted",
//   ChannelUpdated = "channel.updated",
//   ChannelNew = "channel.new",
//   ChannelRead = "channel.read",
//   ChannelDelivered = "channel.delivered",
//   MessageDeleted = "message.deleted",
//   MessageUpdated = "message.updated",
//   MessageReaction = "message.reaction",
//   MessageReactionDeleted = "message.reaction.deleted",
//   MessageNew = "message.new",
//   UserBlocked = "user.blocked",
//   UserUnblocked = "user.unblocked",
//   UserPresence = "user.presence",
//   UserUpdated = "user.updated",
//   UserSubscribe = "user.subscribe",
//   UserUnsubscribe = "user.unsubscribe",

//   // local
//   ChannelMessages = "channel.messages",
// }

// export type MessageReactionPayload = {
//   reaction: string;
//   uid: string;
//   cid: string;
//   mid: string;
//   updatedAt?: number;
//   success?: boolean;
// };

// export type TypingEventPayload = {
//   cid: string;
//   uid?: string;
//   typing: boolean;
// };

// export type MessageDeletedPayload = {
//   cid: string;
//   mid: string;
// };

// export type ChannelPresencePayload = {
//   uid: string;
//   cid: string;
// };

// export type MessageUpdatedPayload = {
//   cid: string;
//   message: Partial<Message>;
// };

// export type MessageNewPayload = {
//   cid: string;
//   message: Message;
// };

// export type ChannelDeletedPayload = {
//   cid: string;
// };

// export type ChannelUpdatedPayload = {
//   cid: string;
//   channel: Partial<Channel>;
// };

// export type ChannelNewPayload = {
//   cid: string;
//   channel: Channel;
// };

// export type ChannelReadPayload = {
//   cid: string;
//   uid: string;
//   ts: number;
// };

// export type UserPresencePayload = {
//   uid: string;
//   is_online: boolean;
//   last_seen_at?: number;
// };

// export type UserSubscribe = {
//   uid: string;
// };

// export type EventPayloads =
//   | TypingEventPayload
//   | MessageDeletedPayload
//   | MessageUpdatedPayload
//   | MessageNewPayload
//   | ChannelDeletedPayload
//   | ChannelUpdatedPayload
//   | ChannelNewPayload
//   | ChannelReadPayload
//   | UserSubscribe;
