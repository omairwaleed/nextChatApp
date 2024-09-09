// export type Message = {
//   id: string;
//   cid: string;
//   uid: string;
//   asset_url?: string | null;
//   asset_type?: string | null;
//   type: MessageType;
//   custom_type?: string | null;
//   status: MessageStatus;
//   dedup_id?: string | null;
//   parent_id?: string | null;
//   parent_message?: Message | null;
//   og_metadata?: OGMetadata | null;
//   isSenderMe?: boolean | null;
//   reactions?: {
//     [uid: string]: string;
//   } | null;
//   deletion?: {
//     [uid: string]: boolean;
//   } | null;
//   content: string;
//   updated_at: number;
//   created_at: number;
// };

// export type OGMetadata = {
//   url: string;
//   title?: string;
//   description?: string;
//   image?: {
//     url: string;
//     width?: number;
//     height?: number;
//     alt?: string;
//     type?: string;
//   };
//   type?: string | "video" | "audio" | "image";
// };

// export enum MessageStatus {
//   Pending = "pending",
//   Sent = "sent",
//   Read = "read",
//   Delivered = "delivered",
//   Error = "error",
// }

// export type MessageType = "text" | "image" | "video" | "audio" | "file";

// export type SendMessageOptions = {
//   push?: boolean;
//   silent?: boolean;
// };

// export type SendMessageInput = {
//   content: string;
//   type: MessageType;
//   parent_id?: string;
//   asset_id?: string;
// };

// export type Channel = {
//   id: string;
//   user?: Pick<User, "uid" | "name" | "avatarURL">;
//   last_message?: Message;
//   last_message_at?: number;
//   last_delivered_at?: number;
//   last_read_at?: number;
//   is_blocked?: boolean;
//   is_blocking?: boolean;
//   unread_count: number;
//   members: Pick<User, "uid" | "name" | "avatarURL">[];
//   membersIds?: string[];
//   created_at: number;
//   updated_at: number;
// };
// export type User = {
//   uid: string;
//   name: string;
//   avatarURL?: string;
// };

// export type MessagesQueryFilter = {
//   next_limit?: number;
//   prev_limit?: number;
//   message_id?: string;
// };

// export type MessagesQueryResponse = {
//   messages: Message[];
// };

// export type ChannelsQueryFilter = {
//   cids?: string[];
//   before_ts?: number;
//   after_ts?: number;
//   ts_type?: "last_message_at" | "updated_at";
//   order?: "asc" | "desc";
//   limit?: number;
//   members_exactly_in?: string;
//   members_include_in?: string;
//   subscribe?: boolean;
// };

// export type ChannelQueryOptions = {
//   state?: boolean;
//   presence?: boolean;
//   subscribe?: boolean;
// };

// export type ChannelsQueryResponse = {
//   channels: Channel[];
// };
