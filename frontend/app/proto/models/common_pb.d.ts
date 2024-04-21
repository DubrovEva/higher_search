import * as jspb from 'google-protobuf'



export class Contact extends jspb.Message {
  getKind(): string;
  setKind(value: string): Contact;

  getValue(): string;
  setValue(value: string): Contact;

  getDescription(): string;
  setDescription(value: string): Contact;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Contact.AsObject;
  static toObject(includeInstance: boolean, msg: Contact): Contact.AsObject;
  static serializeBinaryToWriter(message: Contact, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Contact;
  static deserializeBinaryFromReader(message: Contact, reader: jspb.BinaryReader): Contact;
}

export namespace Contact {
  export type AsObject = {
    kind: string,
    value: string,
    description: string,
  }
}

