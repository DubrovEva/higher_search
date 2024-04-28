// @generated by protobuf-ts 2.9.4 with parameter long_type_string
// @generated from protobuf file "api/router.proto" (package "router", syntax proto3)
// tslint:disable
import { StudorgInfo } from "../models/studorg";
import { StudorgID } from "../models/studorg";
import { UserInfo } from "../models/user";
import { UserID } from "../models/user";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Studorg } from "../models/studorg";
import { User } from "../models/user";
/**
 * @generated from protobuf message router.UserResponse
 */
export interface UserResponse {
    /**
     * @generated from protobuf oneof: response
     */
    response: {
        oneofKind: "err";
        /**
         * @generated from protobuf field: router.Error err = 1;
         */
        err: Error;
    } | {
        oneofKind: "user";
        /**
         * @generated from protobuf field: user.User user = 2;
         */
        user: User;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message router.StudorgResponse
 */
export interface StudorgResponse {
    /**
     * @generated from protobuf oneof: response
     */
    response: {
        oneofKind: "err";
        /**
         * @generated from protobuf field: router.Error err = 1;
         */
        err: Error;
    } | {
        oneofKind: "studorg";
        /**
         * @generated from protobuf field: studorg.Studorg studorg = 2;
         */
        studorg: Studorg;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message router.Error
 */
export interface Error {
    /**
     * @generated from protobuf field: string msg = 1;
     */
    msg: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class UserResponse$Type extends MessageType<UserResponse> {
    constructor() {
        super("router.UserResponse", [
            { no: 1, name: "err", kind: "message", oneof: "response", T: () => Error },
            { no: 2, name: "user", kind: "message", oneof: "response", T: () => User }
        ]);
    }
    create(value?: PartialMessage<UserResponse>): UserResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.response = { oneofKind: undefined };
        if (value !== undefined)
            reflectionMergePartial<UserResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UserResponse): UserResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* router.Error err */ 1:
                    message.response = {
                        oneofKind: "err",
                        err: Error.internalBinaryRead(reader, reader.uint32(), options, (message.response as any).err)
                    };
                    break;
                case /* user.User user */ 2:
                    message.response = {
                        oneofKind: "user",
                        user: User.internalBinaryRead(reader, reader.uint32(), options, (message.response as any).user)
                    };
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UserResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* router.Error err = 1; */
        if (message.response.oneofKind === "err")
            Error.internalBinaryWrite(message.response.err, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* user.User user = 2; */
        if (message.response.oneofKind === "user")
            User.internalBinaryWrite(message.response.user, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message router.UserResponse
 */
export const UserResponse = new UserResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class StudorgResponse$Type extends MessageType<StudorgResponse> {
    constructor() {
        super("router.StudorgResponse", [
            { no: 1, name: "err", kind: "message", oneof: "response", T: () => Error },
            { no: 2, name: "studorg", kind: "message", oneof: "response", T: () => Studorg }
        ]);
    }
    create(value?: PartialMessage<StudorgResponse>): StudorgResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.response = { oneofKind: undefined };
        if (value !== undefined)
            reflectionMergePartial<StudorgResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: StudorgResponse): StudorgResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* router.Error err */ 1:
                    message.response = {
                        oneofKind: "err",
                        err: Error.internalBinaryRead(reader, reader.uint32(), options, (message.response as any).err)
                    };
                    break;
                case /* studorg.Studorg studorg */ 2:
                    message.response = {
                        oneofKind: "studorg",
                        studorg: Studorg.internalBinaryRead(reader, reader.uint32(), options, (message.response as any).studorg)
                    };
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: StudorgResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* router.Error err = 1; */
        if (message.response.oneofKind === "err")
            Error.internalBinaryWrite(message.response.err, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* studorg.Studorg studorg = 2; */
        if (message.response.oneofKind === "studorg")
            Studorg.internalBinaryWrite(message.response.studorg, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message router.StudorgResponse
 */
export const StudorgResponse = new StudorgResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Error$Type extends MessageType<Error> {
    constructor() {
        super("router.Error", [
            { no: 1, name: "msg", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Error>): Error {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.msg = "";
        if (value !== undefined)
            reflectionMergePartial<Error>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Error): Error {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string msg */ 1:
                    message.msg = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Error, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string msg = 1; */
        if (message.msg !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.msg);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message router.Error
 */
export const Error = new Error$Type();
/**
 * @generated ServiceType for protobuf service router.Router
 */
export const Router = new ServiceType("router.Router", [
    { name: "GetUser", options: {}, I: UserID, O: UserResponse },
    { name: "InsertUser", options: {}, I: UserInfo, O: UserResponse },
    { name: "UpdateUser", options: {}, I: User, O: UserResponse },
    { name: "GetStudorg", options: {}, I: StudorgID, O: StudorgResponse },
    { name: "InsertStudorg", options: {}, I: StudorgInfo, O: StudorgResponse },
    { name: "UpdateStudorg", options: {}, I: Studorg, O: StudorgResponse }
]);