// import { MessageUtils } from "../MessageUtils";
// import { Channel } from "../channel";
// import { Message, MessagesQueryFilter } from "../types";
// import { Collection, ResultHandler } from "./colection";

// export class MessagesCollection extends Collection<Message> {
//   private channel: Channel;
//   private filter: MessagesQueryFilter;
//   constructor(channel: Channel, filter: MessagesQueryFilter) {
//     super();
//     this.channel = channel;
//     this.filter = filter;
//   }
//   init(handler: ResultHandler<Message>): void {
//     super.init(handler);
//     this.loadNext();
//   }
//   async loadNext() {
//     if (this.isFetchingNext && this.nextPromise) {
//       return this.nextPromise;
//     }
//     if (!this._hasNext) {
//       return [];
//     }
//     this.isFetchingNext = true;
//     this.nextPromise = new Promise(async (resolve, reject) => {
//       const queriedMessages = await this.channel.queryMessages(
//         {
//           ...this.filter,
//           prev_limit: 0,
//           message_id: MessageUtils.first(this.data)?.id,
//         },
//         { source: "local" }
//       );
//       // // Logger.debug('queriedMessages', queriedMessages);

//       this.data = [...queriedMessages, ...this.data];
//       this.handler?.onCacheResult(this.data);

//       const fetchedMessages = await this.channel.queryMessages(
//         {
//           ...this.filter,
//           prev_limit: 0,
//           next_limit: 20 - queriedMessages.length,
//           message_id: MessageUtils.first(this.data)?.id,
//         },
//         { source: "remote" }
//       );
//       this.data = [...fetchedMessages, ...this.data];
//       const messages = queriedMessages.concat(fetchedMessages);
//       this.isFetchingNext = false;
//       this._hasNext = fetchedMessages.length === (this.filter.next_limit ?? 20);
//       this.handler?.onApiResult(this.data);
//       this.nextPromise = null;
//       resolve(messages);
//     });

//     return this.nextPromise;
//   }

//   async loadPrevious() {
//     // Logger.debug(
//     //   'Loading previous messages',
//     //   this.isFetchingPrevious,
//     //   this.previousPromise == null,
//     //   this._hasPrevious,
//     // );
//     if (this.isFetchingPrevious && this.previousPromise) {
//       return this.previousPromise;
//     }
//     if (!this._hasPrevious) {
//       return [];
//     }

//     this.isFetchingPrevious = true;

//     this.previousPromise = new Promise(async (resolve, reject) => {
//       let messages = [];
//       messages = await this.channel.queryMessages(
//         {
//           prev_limit: 20,
//           message_id: MessageUtils.last(this.data)?.id,
//         },
//         { source: "local" }
//       );

//       this.data = [...this.data, ...messages];
//       this.handler?.onCacheResult(this.data);

//       if (messages.length < 20) {
//         const fetchedMessages = await this.channel.queryMessages(
//           {
//             prev_limit: 20 - messages.length,
//             message_id: MessageUtils.last(this.data)?.id,
//           },
//           { source: "remote" }
//         );

//         this.data = [...this.data, ...fetchedMessages];
//         messages = messages.concat(fetchedMessages);
//         this.handler?.onApiResult(this.data);
//       }

//       this.isFetchingPrevious = false;
//       this.previousPromise = null;
//       // Logger.debug('Messages Length', messages.length, this.filter.prev_limit ?? 20);
//       this._hasPrevious = messages.length === (this.filter.prev_limit ?? 20);
//       resolve(messages);
//     });
//     return this.previousPromise;
//   }
// }
