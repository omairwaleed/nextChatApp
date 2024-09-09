// import { ChatSDK } from "./ChatSDK";
// import { io, Socket } from "socket.io-client";
// import { EventPayloads, EventsType } from "./Events";
// import _ from "lodash";
// export class Connection {
//   sdk: ChatSDK;
//   socket?: Socket;
//   isConnecting: boolean;
//   isDisconnected: boolean;
//   isResolved: boolean;
//   wsPromise: Promise<void> | null;
//   resolvePromise?: () => void;
//   rejectPromise?: (reason?: Socket.DisconnectReason | Error) => void;
//   lastAvailable: number | null;
//   constructor(sdk: ChatSDK) {
//     this.sdk = sdk;
//     this.isConnecting = false;
//     this.isDisconnected = false;
//     this.wsPromise = null;
//     this.isResolved = false;
//     this.lastAvailable = null;

//     window.addEventListener("offline", this.onlineStatusChanged);
//     window.addEventListener("online", this.onlineStatusChanged);
//   }

//   onlineStatusChanged() {
//     if (window.navigator.onLine) {
//       if (this.isDisconnected) {
//         this.socket?.connect();
//       }
//     } else {
//       this.isDisconnected = true;
//     }
//   }

//   async connect() {
//     if (this.isConnecting || this.isResolved) {
//       return;
//     }
//     this.isConnecting = true;
//     if (this.socket) {
//       this.socket.disconnect();
//       this.socket.removeAllListeners();
//       this.socket = undefined;
//     }
//     this.socket = io(this.sdk.wsUrl, {
//       path: "/ws",
//       transports: ["websocket"],
//       auth: {
//         token: this.sdk.token,
//       },
//     });

//     this.wsPromise = new Promise<void>((resolve, reject) => {
//       this.resolvePromise = resolve;
//       this.rejectPromise = reject;
//     });

//     this.socket.on("connect", async () => {
//       this.isConnecting = false;
//       this.isResolved = true;
//       this.isDisconnected = false;
//       this.lastAvailable = null;
//       this.resolvePromise?.();
//       await this.sdk.pushSync();
//       await this.sdk.pullSync();
//     });

//     this.socket.on("reconnect", () => {
//       this.isConnecting = false;
//       this.isResolved = true;
//       this.isDisconnected = false;
//       console.log("reconnect", this.lastAvailable);
//       if (this.lastAvailable) {
//         this.sdk.pullSync(this.lastAvailable);
//       }
//       this.sdk.pushSync();
//       this.sdk.onReconnect();
//       this.lastAvailable = null;
//       this.resolvePromise?.();
//     });

//     this.socket.on("disconnect", (reason) => {
//       this.lastAvailable = Date.now();
//       this.isConnecting = false;
//       this.isResolved = false;
//       this.isDisconnected = true;
//       this.rejectPromise?.(reason);
//     });

//     this.socket.on("connect_error", (error) => {
//       console.error({
//         context: error,
//         tag: Connection.name,
//         message: "connect_error",
//       });
//       this.isConnecting = false;
//       this.isResolved = false;
//       this.isDisconnected = true;
//       this.rejectPromise?.(error);
//     });

//     this.socket.on("connect_timeout", (error) => {
//       console.error({
//         context: error,
//         tag: Connection.name,
//         message: "connect_timeout",
//       });
//       this.isConnecting = false;
//       this.isResolved = false;
//       this.isDisconnected = true;
//       this.rejectPromise?.(error);
//     });

//     this.socket.on("reconnect_failed", (error) => {
//       // Logger.debug('reconnect_failed', error);
//       this.isConnecting = false;
//       this.isResolved = false;
//       this.isDisconnected = true;
//       this.rejectPromise?.(error);
//     });

//     this.socket.on("reconnecting", (attempt) => {
//       // Logger.debug('reconnecting', attempt);
//       this.isConnecting = true;
//       this.isResolved = false;
//       this.isDisconnected = false;
//       this.wsPromise = new Promise<void>((resolve, reject) => {
//         this.resolvePromise = resolve;
//         this.rejectPromise = reject;
//       });
//     });

//     this.socket.on("error", (error) => {
//       // Logger.debug('error', error);
//       this.isConnecting = false;
//       this.isResolved = false;
//       this.isDisconnected = true;
//       this.rejectPromise?.(error);
//     });

//     this.socket.onAny((event: EventsType, ...data: EventPayloads[]) => {
//       this.sdk.handleEvent(event, _.first(data));
//     });

//     return this.wsPromise;
//   }

//   disconnect() {
//     this.isConnecting = false;
//     this.isResolved = false;
//     this.isDisconnected = true;
//     this.socket?.disconnect();
//     this.socket?.removeAllListeners();
//     this.socket = undefined;
//   }

//   async sendEvent(eventType: EventsType, event: EventPayloads) {
//     if (this.isDisconnected) {
//       return;
//     }
//     if (this.isConnecting && this.wsPromise) {
//       await this.wsPromise;
//     }
//     this.socket?.emit(eventType, event);
//   }
// }
