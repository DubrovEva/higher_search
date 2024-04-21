import * as jspb from 'google-protobuf'

import * as models_user_pb from '../models/user_pb';
import * as models_studorg_pb from '../models/studorg_pb';


export class UserResponse extends jspb.Message {
  getErr(): Error | undefined;
  setErr(value?: Error): UserResponse;
  hasErr(): boolean;
  clearErr(): UserResponse;

  getUser(): models_user_pb.User | undefined;
  setUser(value?: models_user_pb.User): UserResponse;
  hasUser(): boolean;
  clearUser(): UserResponse;

  getResponseCase(): UserResponse.ResponseCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserResponse): UserResponse.AsObject;
  static serializeBinaryToWriter(message: UserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserResponse;
  static deserializeBinaryFromReader(message: UserResponse, reader: jspb.BinaryReader): UserResponse;
}

export namespace UserResponse {
  export type AsObject = {
    err?: Error.AsObject,
    user?: models_user_pb.User.AsObject,
  }

  export enum ResponseCase { 
    RESPONSE_NOT_SET = 0,
    ERR = 1,
    USER = 2,
  }
}

export class StudorgResponse extends jspb.Message {
  getErr(): Error | undefined;
  setErr(value?: Error): StudorgResponse;
  hasErr(): boolean;
  clearErr(): StudorgResponse;

  getStudorg(): models_studorg_pb.Studorg | undefined;
  setStudorg(value?: models_studorg_pb.Studorg): StudorgResponse;
  hasStudorg(): boolean;
  clearStudorg(): StudorgResponse;

  getResponseCase(): StudorgResponse.ResponseCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StudorgResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StudorgResponse): StudorgResponse.AsObject;
  static serializeBinaryToWriter(message: StudorgResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StudorgResponse;
  static deserializeBinaryFromReader(message: StudorgResponse, reader: jspb.BinaryReader): StudorgResponse;
}

export namespace StudorgResponse {
  export type AsObject = {
    err?: Error.AsObject,
    studorg?: models_studorg_pb.Studorg.AsObject,
  }

  export enum ResponseCase { 
    RESPONSE_NOT_SET = 0,
    ERR = 1,
    STUDORG = 2,
  }
}

export class Error extends jspb.Message {
  getMsg(): string;
  setMsg(value: string): Error;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Error.AsObject;
  static toObject(includeInstance: boolean, msg: Error): Error.AsObject;
  static serializeBinaryToWriter(message: Error, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Error;
  static deserializeBinaryFromReader(message: Error, reader: jspb.BinaryReader): Error;
}

export namespace Error {
  export type AsObject = {
    msg: string,
  }
}

