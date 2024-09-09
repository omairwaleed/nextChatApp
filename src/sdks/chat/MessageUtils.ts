// import { Message } from "./types";
// import _ from "lodash";

// export class MessageUtils {
//   static last(messages: Message[]) {
//     return _.last(messages);
//   }

//   static first(messages: Message[]) {
//     return _.first(messages);
//   }

//   static addMessage(messages: Message[], message: Message) {
//     const placeholderMessageIndex = messages.findIndex(
//       (m) => m.id == message.dedup_id
//     );

//     if (placeholderMessageIndex !== -1) {
//       const oldMessage = messages[placeholderMessageIndex];
//       messages[placeholderMessageIndex] = { ...oldMessage, ...message };
//       return [...messages];
//     }
//     messages.unshift(message);
//     return [...messages];
//   }

//   static updateMessage(messages: Message[], message: Message) {
//     const index = messages.findIndex((m) => m.id === message.id);
//     if (index === -1) {
//       return messages;
//     }

//     const oldMessage = messages[index];

//     messages[index] = { ...oldMessage, ...message };

//     return [...messages];
//   }

//   static addMessageReaction(
//     messages: Message[],
//     id: string,
//     reaction: string,
//     uid: string
//   ) {
//     const messageIndex = messages.findIndex((m) => m.id === id);

//     if (messageIndex === -1) {
//       return messages;
//     }
//     const currentMessage = messages[messageIndex];
//     const reactions = { ...(currentMessage.reactions || {}) };
//     reactions[uid] = reaction;

//     const message = { ...currentMessage, reactions };

//     messages[messageIndex] = message;
//     return [...messages];
//   }

//   static deleteMessageReaction(messages: Message[], id: string, uid: string) {
//     const index = messages.findIndex((m) => m.id === id);

//     if (index === -1) {
//       return messages;
//     }

//     const message = messages[index];
//     // @ts-ignore
//     const reactions = { ...(message.reactions || {}) };
//     delete reactions[uid];

//     const newMessage = { ...message, reactions: { ...reactions } };
//     messages[index] = { ...newMessage };

//     return [...messages];
//   }
// }
