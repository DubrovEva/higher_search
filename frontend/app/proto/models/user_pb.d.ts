import * as jspb from 'google-protobuf'

import * as models_common_pb from '../models/common_pb';


export class UserID extends jspb.Message {
  getId(): number;
  setId(value: number): UserID;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserID.AsObject;
  static toObject(includeInstance: boolean, msg: UserID): UserID.AsObject;
  static serializeBinaryToWriter(message: UserID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserID;
  static deserializeBinaryFromReader(message: UserID, reader: jspb.BinaryReader): UserID;
}

export namespace UserID {
  export type AsObject = {
    id: number,
  }
}

export class UserInfo extends jspb.Message {
  getName(): string;
  setName(value: string): UserInfo;

  getSurname(): string;
  setSurname(value: string): UserInfo;

  getMiddleName(): string;
  setMiddleName(value: string): UserInfo;

  getDescription(): string;
  setDescription(value: string): UserInfo;

  getEmail(): string;
  setEmail(value: string): UserInfo;

  getContactsList(): Array<models_common_pb.Contact>;
  setContactsList(value: Array<models_common_pb.Contact>): UserInfo;
  clearContactsList(): UserInfo;
  addContacts(value?: models_common_pb.Contact, index?: number): models_common_pb.Contact;

  getSalt(): number;
  setSalt(value: number): UserInfo;

  getHash(): string;
  setHash(value: string): UserInfo;

  getRole(): Role;
  setRole(value: Role): UserInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserInfo.AsObject;
  static toObject(includeInstance: boolean, msg: UserInfo): UserInfo.AsObject;
  static serializeBinaryToWriter(message: UserInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserInfo;
  static deserializeBinaryFromReader(message: UserInfo, reader: jspb.BinaryReader): UserInfo;
}

export namespace UserInfo {
  export type AsObject = {
    name: string,
    surname: string,
    middleName: string,
    description: string,
    email: string,
    contactsList: Array<models_common_pb.Contact.AsObject>,
    salt: number,
    hash: string,
    role: Role,
  }
}

export class User extends jspb.Message {
  getId(): UserID | undefined;
  setId(value?: UserID): User;
  hasId(): boolean;
  clearId(): User;

  getUserInfo(): UserInfo | undefined;
  setUserInfo(value?: UserInfo): User;
  hasUserInfo(): boolean;
  clearUserInfo(): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id?: UserID.AsObject,
    userInfo?: UserInfo.AsObject,
  }
}

export enum Role { 
  REGULAR = 0,
  ADMIN = 1,
  HEAD = 2,
  MODERATOR = 3,
  DEVELOPER = 4,
}
