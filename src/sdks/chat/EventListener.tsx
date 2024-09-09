// import { MessageReactionPayload, TypingEventPayload } from "./Events";
// import { Channel } from "./channel";
// import { Message, User } from "./types";
// interface IEventListener {
//   onTyping?: (channel: Channel, event: TypingEventPayload) => void;
//   onMessage?: (channel: Channel, message: any) => void;
//   onMessageUpdated?: (channel: Channel, message: Message) => void;
//   onMessageDeleted?: (channel: Channel, message: Message) => void;
//   onUserJoined?: (channel: Channel, user: User) => void;
//   onUserLeft?: (channel: Channel, user: User) => void;
//   onChannelUpdated?: (channel: Channel) => void;
//   onChannelDeleted?: (channel: Channel) => void;
//   onChannelRead?: (channel: Channel) => void;
//   onChannelDelivered?: (channel: Channel) => void;
//   onChannelAdded?: (channel: Channel) => void;
//   onReactionAdded?: (channel: Channel, event: MessageReactionPayload) => void;
//   onReactionRemoved?: (channel: Channel, event: MessageReactionPayload) => void;
// }

// export class EventListener implements IEventListener {
//   handlers: IEventListener;
//   constructor(handlers: IEventListener) {
//     this.handlers = handlers;
//   }

//   onTyping(channel: Channel, event: TypingEventPayload) {
//     this.handlers.onTyping?.(channel, event);
//   }

//   onMessage(channel: Channel, message: Message) {
//     this.handlers.onMessage?.(channel, message);
//   }

//   onUserJoined(channel: Channel, user: User) {
//     this.handlers.onUserJoined?.(channel, user);
//   }

//   onUserLeft(channel: Channel, user: User) {
//     this.handlers.onUserLeft?.(channel, user);
//   }

//   onChannelUpdated(channel: Channel) {
//     this.handlers.onChannelUpdated?.(channel);
//   }

//   onChannelAdded(channel: Channel) {
//     this.handlers.onChannelAdded?.(channel);
//   }
//   onChannelDeleted(channel: Channel) {
//     this.handlers.onChannelDeleted?.(channel);
//   }

//   onChannelRead(channel: Channel) {
//     this.handlers.onChannelRead?.(channel);
//   }

//   onChannelDelivered(channel: Channel) {
//     this.handlers.onChannelDelivered?.(channel);
//   }

//   onReactionAdded(channel: Channel, event: MessageReactionPayload) {
//     this.handlers.onReactionAdded?.(channel, event);
//   }

//   onReactionRemoved(channel: Channel, event: MessageReactionPayload) {
//     this.handlers.onReactionRemoved?.(channel, event);
//   }

//   onMessageUpdated(channel: Channel, message: Message) {
//     this.handlers.onMessageUpdated?.(channel, message);
//   }

//   onMessageDeleted(channel: Channel, message: Message) {
//     this.handlers.onMessageDeleted?.(channel, message);
//   }

//   remove() {
//     this.handlers = {};
//   }
// }
