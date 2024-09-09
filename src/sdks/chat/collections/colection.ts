// export interface ResultHandler<T> {
//   onCacheResult: (data: Array<T>) => void;
//   onApiResult: (data: Array<T>) => void;
// }
// export abstract class Collection<T> {
//   protected _hasNext: boolean;
//   protected _hasPrevious: boolean;
//   protected isFetchingPrevious: boolean;
//   protected isFetchingNext: boolean;
//   protected data: Array<T>;
//   protected handler?: ResultHandler<T>;
//   protected nextPromise: Promise<Array<T>> | null = null;
//   protected previousPromise: Promise<Array<T>> | null = null;

//   get hasNext() {
//     return this._hasNext;
//   }

//   get hasPrevious() {
//     return this._hasPrevious;
//   }

//   dispose() {
//     this.data = [];
//     this._hasNext = true;
//     this._hasPrevious = true;
//     this.isFetchingPrevious = false;
//     this.isFetchingNext = false;
//     this.nextPromise = null;
//     this.previousPromise = null;
//     this.handler = undefined;
//   }

//   constructor() {
//     this._hasNext = true;
//     this._hasPrevious = true;
//     this.isFetchingPrevious = false;
//     this.isFetchingNext = false;
//     this.data = [];
//   }

//   init(handler: ResultHandler<T>) {
//     this.handler = handler;
//   }

//   abstract loadNext(): Promise<Array<T>>;

//   abstract loadPrevious(): Promise<Array<T>>;
// }
