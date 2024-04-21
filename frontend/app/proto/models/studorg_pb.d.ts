import * as jspb from 'google-protobuf'

import * as models_user_pb from '../models/user_pb';
import * as models_common_pb from '../models/common_pb';


export class StudorgID extends jspb.Message {
  getId(): number;
  setId(value: number): StudorgID;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StudorgID.AsObject;
  static toObject(includeInstance: boolean, msg: StudorgID): StudorgID.AsObject;
  static serializeBinaryToWriter(message: StudorgID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StudorgID;
  static deserializeBinaryFromReader(message: StudorgID, reader: jspb.BinaryReader): StudorgID;
}

export namespace StudorgID {
  export type AsObject = {
    id: number,
  }
}

export class StudorgInfo extends jspb.Message {
  getName(): string;
  setName(value: string): StudorgInfo;

  getDescription(): string;
  setDescription(value: string): StudorgInfo;

  getHead(): models_user_pb.UserID | undefined;
  setHead(value?: models_user_pb.UserID): StudorgInfo;
  hasHead(): boolean;
  clearHead(): StudorgInfo;

  getContactsList(): Array<models_common_pb.Contact>;
  setContactsList(value: Array<models_common_pb.Contact>): StudorgInfo;
  clearContactsList(): StudorgInfo;
  addContacts(value?: models_common_pb.Contact, index?: number): models_common_pb.Contact;

  getStatus(): StudorgStatus;
  setStatus(value: StudorgStatus): StudorgInfo;

  getFaculty(): string;
  setFaculty(value: string): StudorgInfo;

  getCampus(): string;
  setCampus(value: string): StudorgInfo;

  getLinksList(): Array<models_common_pb.Contact>;
  setLinksList(value: Array<models_common_pb.Contact>): StudorgInfo;
  clearLinksList(): StudorgInfo;
  addLinks(value?: models_common_pb.Contact, index?: number): models_common_pb.Contact;

  getLanguage(): string;
  setLanguage(value: string): StudorgInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StudorgInfo.AsObject;
  static toObject(includeInstance: boolean, msg: StudorgInfo): StudorgInfo.AsObject;
  static serializeBinaryToWriter(message: StudorgInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StudorgInfo;
  static deserializeBinaryFromReader(message: StudorgInfo, reader: jspb.BinaryReader): StudorgInfo;
}

export namespace StudorgInfo {
  export type AsObject = {
    name: string,
    description: string,
    head?: models_user_pb.UserID.AsObject,
    contactsList: Array<models_common_pb.Contact.AsObject>,
    status: StudorgStatus,
    faculty: string,
    campus: string,
    linksList: Array<models_common_pb.Contact.AsObject>,
    language: string,
  }
}

export class Studorg extends jspb.Message {
  getId(): StudorgID | undefined;
  setId(value?: StudorgID): Studorg;
  hasId(): boolean;
  clearId(): Studorg;

  getStudorgInfo(): StudorgInfo | undefined;
  setStudorgInfo(value?: StudorgInfo): Studorg;
  hasStudorgInfo(): boolean;
  clearStudorgInfo(): Studorg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Studorg.AsObject;
  static toObject(includeInstance: boolean, msg: Studorg): Studorg.AsObject;
  static serializeBinaryToWriter(message: Studorg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Studorg;
  static deserializeBinaryFromReader(message: Studorg, reader: jspb.BinaryReader): Studorg;
}

export namespace Studorg {
  export type AsObject = {
    id?: StudorgID.AsObject,
    studorgInfo?: StudorgInfo.AsObject,
  }
}

export enum StudorgStatus { 
  NOT_OFFICIAL = 0,
  OFFICIAL = 1,
}
