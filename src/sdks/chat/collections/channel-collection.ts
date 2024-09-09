// import _ from "lodash";
// import { Channel } from "../channel";
// import { Collection, ResultHandler } from "./colection";
// import { ChatSDK } from "../ChatSDK";
// import { ChannelsQueryFilter } from "../types";

// export class ChannelsCollection extends Collection<Channel> {
//   private sdk: ChatSDK;
//   private filter: ChannelsQueryFilter;

//   constructor(sdk: ChatSDK, filter: ChannelsQueryFilter) {
//     super();
//     this.sdk = sdk;
//     this.filter = filter;
//   }
//   init(handler: ResultHandler<Channel>): void {
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
//       let channels;
//       const dbChannels = (channels = await this.sdk.queryChannels(
//         {
//           ...this.filter,
//           after_ts: _.first(this.data)?.data.last_message_at,
//         },
//         { source: "local" }
//       ));

//       channels = this.sdk.activateChannels(dbChannels);

//       this.data = [...this.data, ...channels];
//       this.handler?.onCacheResult(this.data);

//       if (channels.length < (this.filter.limit ?? 20)) {
//         const fetchedChannels = await this.sdk.queryChannels(
//           {
//             ...this.filter,
//             limit: (this.filter.limit ?? 20) - channels.length,
//             after_ts: _.first(this.data)?.data.last_message_at,
//           },
//           { source: "remote" }
//         );
//         const fetchedActiveChannels =
//           this.sdk.activateChannels(fetchedChannels);
//         this.data = [...this.data, ...fetchedActiveChannels];
//         channels = channels.concat(fetchedActiveChannels);
//         this.handler?.onApiResult(this.data);
//       }

//       this.isFetchingNext = false;
//       this._hasPrevious = channels.length === (this.filter.limit ?? 20);
//       this.nextPromise = null;
//       resolve(channels);
//     });

//     return this.nextPromise;
//   }

//   async loadPrevious() {
//     if (this.isFetchingPrevious && this.previousPromise) {
//       return this.previousPromise;
//     }
//     if (!this._hasPrevious) {
//       return [];
//     }

//     this.isFetchingPrevious = true;

//     this.previousPromise = new Promise(async (resolve, reject) => {
//       let channels;
//       const dbChannels = await this.sdk.queryChannels(
//         {
//           ...this.filter,
//           before_ts: _.last(this.data)?.data.last_message_at,
//         },
//         { source: "local" }
//       );
//       channels = this.sdk.activateChannels(dbChannels);
//       this.data = [...this.data, ...channels];
//       this.handler?.onCacheResult(this.data);

//       if (channels.length < (this.filter.limit ?? 20)) {
//         const fetchedChannels = await this.sdk.queryChannels(
//           {
//             ...this.filter,
//             limit: 20 - channels.length,
//             before_ts: _.last(this.data)?.data.last_message_at,
//           },
//           { source: "remote" }
//         );

//         const fetchedActiveChannels =
//           this.sdk.activateChannels(fetchedChannels);

//         this.data = [...this.data, ...fetchedActiveChannels];

//         this.handler?.onApiResult(this.data);
//         channels = channels.concat(fetchedActiveChannels);
//       }

//       this.isFetchingPrevious = false;
//       this._hasPrevious = channels.length === (this.filter.limit ?? 20);
//       this.previousPromise = null;
//       resolve(channels);
//     });
//     return this.previousPromise;
//   }
// }
