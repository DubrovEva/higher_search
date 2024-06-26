// @generated by protobuf-ts 2.9.4 with parameter long_type_string
// @generated from protobuf file "models/user.proto" (package "user", syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "../google/protobuf/timestamp";
import { Gender } from "./common";
import { Faculty } from "./common";
import { Links } from "./common";
/**
 * @generated from protobuf message user.User
 */
export interface User {
    /**
     * @generated from protobuf field: user.UserID ID = 1 [json_name = "ID"];
     */
    iD?: UserID;
    /**
     * @generated from protobuf field: user.UserInfo user_info = 2;
     */
    userInfo?: UserInfo;
}
/**
 * @generated from protobuf message user.UserID
 */
export interface UserID {
    /**
     * @generated from protobuf field: int64 ID = 1 [json_name = "ID"];
     */
    iD: string;
}
/**
 * @generated from protobuf message user.UserIDs
 */
export interface UserIDs {
    /**
     * @generated from protobuf field: repeated int64 IDs = 1 [json_name = "IDs"];
     */
    iDs: string[];
}
/**
 * @generated from protobuf message user.UserInfo
 */
export interface UserInfo {
    /**
     * @generated from protobuf field: string email = 1;
     */
    email: string;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: string surname = 3;
     */
    surname: string;
    /**
     * @generated from protobuf field: string middle_name = 4;
     */
    middleName: string;
    /**
     * @generated from protobuf field: user.ProjectRole role = 5;
     */
    role: ProjectRole;
    /**
     * @generated from protobuf field: string hash = 6;
     */
    hash: string;
    /**
     * @generated from protobuf field: string salt = 7;
     */
    salt: string;
    /**
     * @generated from protobuf field: string shortDescription = 8;
     */
    shortDescription: string;
    /**
     * @generated from protobuf field: string description = 9;
     */
    description: string;
    /**
     * @generated from protobuf field: string avatar = 10;
     */
    avatar: string;
    /**
     * @generated from protobuf field: repeated common.Links links = 11;
     */
    links: Links[];
    /**
     * @generated from protobuf field: common.Faculty faculty = 12;
     */
    faculty: Faculty;
    /**
     * @generated from protobuf field: common.Gender gender = 13;
     */
    gender: Gender;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp birth = 14;
     */
    birth?: Timestamp;
    /**
     * @generated from protobuf field: string EducationInfo = 15 [json_name = "EducationInfo"];
     */
    educationInfo: string;
}
/**
 * @generated from protobuf message user.Users
 */
export interface Users {
    /**
     * @generated from protobuf field: repeated user.User users = 1;
     */
    users: User[];
}
/**
 * @generated from protobuf message user.AuthInfo
 */
export interface AuthInfo {
    /**
     * @generated from protobuf field: bool isAuth = 1;
     */
    isAuth: boolean;
    /**
     * @generated from protobuf field: user.UserID userID = 2;
     */
    userID?: UserID;
}
/**
 * @generated from protobuf enum user.ProjectRole
 */
export enum ProjectRole {
    /**
     * @generated from protobuf enum value: ORDINARY = 0;
     */
    ORDINARY = 0,
    /**
     * @generated from protobuf enum value: DEVELOPER = 1;
     */
    DEVELOPER = 1,
    /**
     * @generated from protobuf enum value: MODERATOR = 2;
     */
    MODERATOR = 2
}
// @generated message type with reflection information, may provide speed optimized methods
class User$Type extends MessageType<User> {
    constructor() {
        super("user.User", [
            { no: 1, name: "ID", kind: "message", jsonName: "ID", T: () => UserID },
            { no: 2, name: "user_info", kind: "message", T: () => UserInfo }
        ]);
    }
    create(value?: PartialMessage<User>): User {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<User>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: User): User {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* user.UserID ID = 1 [json_name = "ID"];*/ 1:
                    message.iD = UserID.internalBinaryRead(reader, reader.uint32(), options, message.iD);
                    break;
                case /* user.UserInfo user_info */ 2:
                    message.userInfo = UserInfo.internalBinaryRead(reader, reader.uint32(), options, message.userInfo);
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
    internalBinaryWrite(message: User, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* user.UserID ID = 1 [json_name = "ID"]; */
        if (message.iD)
            UserID.internalBinaryWrite(message.iD, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* user.UserInfo user_info = 2; */
        if (message.userInfo)
            UserInfo.internalBinaryWrite(message.userInfo, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message user.User
 */
export const User = new User$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserID$Type extends MessageType<UserID> {
    constructor() {
        super("user.UserID", [
            { no: 1, name: "ID", kind: "scalar", jsonName: "ID", T: 3 /*ScalarType.INT64*/ }
        ]);
    }
    create(value?: PartialMessage<UserID>): UserID {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.iD = "0";
        if (value !== undefined)
            reflectionMergePartial<UserID>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UserID): UserID {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int64 ID = 1 [json_name = "ID"];*/ 1:
                    message.iD = reader.int64().toString();
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
    internalBinaryWrite(message: UserID, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int64 ID = 1 [json_name = "ID"]; */
        if (message.iD !== "0")
            writer.tag(1, WireType.Varint).int64(message.iD);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message user.UserID
 */
export const UserID = new UserID$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserIDs$Type extends MessageType<UserIDs> {
    constructor() {
        super("user.UserIDs", [
            { no: 1, name: "IDs", kind: "scalar", jsonName: "IDs", repeat: 1 /*RepeatType.PACKED*/, T: 3 /*ScalarType.INT64*/ }
        ]);
    }
    create(value?: PartialMessage<UserIDs>): UserIDs {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.iDs = [];
        if (value !== undefined)
            reflectionMergePartial<UserIDs>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UserIDs): UserIDs {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated int64 IDs = 1 [json_name = "IDs"];*/ 1:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.iDs.push(reader.int64().toString());
                    else
                        message.iDs.push(reader.int64().toString());
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
    internalBinaryWrite(message: UserIDs, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated int64 IDs = 1 [json_name = "IDs"]; */
        if (message.iDs.length) {
            writer.tag(1, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.iDs.length; i++)
                writer.int64(message.iDs[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message user.UserIDs
 */
export const UserIDs = new UserIDs$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserInfo$Type extends MessageType<UserInfo> {
    constructor() {
        super("user.UserInfo", [
            { no: 1, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "surname", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "middle_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "role", kind: "enum", T: () => ["user.ProjectRole", ProjectRole] },
            { no: 6, name: "hash", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "salt", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "shortDescription", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 9, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 10, name: "avatar", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 11, name: "links", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Links },
            { no: 12, name: "faculty", kind: "enum", T: () => ["common.Faculty", Faculty] },
            { no: 13, name: "gender", kind: "enum", T: () => ["common.Gender", Gender] },
            { no: 14, name: "birth", kind: "message", T: () => Timestamp },
            { no: 15, name: "EducationInfo", kind: "scalar", jsonName: "EducationInfo", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<UserInfo>): UserInfo {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.email = "";
        message.name = "";
        message.surname = "";
        message.middleName = "";
        message.role = 0;
        message.hash = "";
        message.salt = "";
        message.shortDescription = "";
        message.description = "";
        message.avatar = "";
        message.links = [];
        message.faculty = 0;
        message.gender = 0;
        message.educationInfo = "";
        if (value !== undefined)
            reflectionMergePartial<UserInfo>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UserInfo): UserInfo {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string email */ 1:
                    message.email = reader.string();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* string surname */ 3:
                    message.surname = reader.string();
                    break;
                case /* string middle_name */ 4:
                    message.middleName = reader.string();
                    break;
                case /* user.ProjectRole role */ 5:
                    message.role = reader.int32();
                    break;
                case /* string hash */ 6:
                    message.hash = reader.string();
                    break;
                case /* string salt */ 7:
                    message.salt = reader.string();
                    break;
                case /* string shortDescription */ 8:
                    message.shortDescription = reader.string();
                    break;
                case /* string description */ 9:
                    message.description = reader.string();
                    break;
                case /* string avatar */ 10:
                    message.avatar = reader.string();
                    break;
                case /* repeated common.Links links */ 11:
                    message.links.push(Links.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* common.Faculty faculty */ 12:
                    message.faculty = reader.int32();
                    break;
                case /* common.Gender gender */ 13:
                    message.gender = reader.int32();
                    break;
                case /* google.protobuf.Timestamp birth */ 14:
                    message.birth = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.birth);
                    break;
                case /* string EducationInfo = 15 [json_name = "EducationInfo"];*/ 15:
                    message.educationInfo = reader.string();
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
    internalBinaryWrite(message: UserInfo, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string email = 1; */
        if (message.email !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.email);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* string surname = 3; */
        if (message.surname !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.surname);
        /* string middle_name = 4; */
        if (message.middleName !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.middleName);
        /* user.ProjectRole role = 5; */
        if (message.role !== 0)
            writer.tag(5, WireType.Varint).int32(message.role);
        /* string hash = 6; */
        if (message.hash !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.hash);
        /* string salt = 7; */
        if (message.salt !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.salt);
        /* string shortDescription = 8; */
        if (message.shortDescription !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.shortDescription);
        /* string description = 9; */
        if (message.description !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.description);
        /* string avatar = 10; */
        if (message.avatar !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.avatar);
        /* repeated common.Links links = 11; */
        for (let i = 0; i < message.links.length; i++)
            Links.internalBinaryWrite(message.links[i], writer.tag(11, WireType.LengthDelimited).fork(), options).join();
        /* common.Faculty faculty = 12; */
        if (message.faculty !== 0)
            writer.tag(12, WireType.Varint).int32(message.faculty);
        /* common.Gender gender = 13; */
        if (message.gender !== 0)
            writer.tag(13, WireType.Varint).int32(message.gender);
        /* google.protobuf.Timestamp birth = 14; */
        if (message.birth)
            Timestamp.internalBinaryWrite(message.birth, writer.tag(14, WireType.LengthDelimited).fork(), options).join();
        /* string EducationInfo = 15 [json_name = "EducationInfo"]; */
        if (message.educationInfo !== "")
            writer.tag(15, WireType.LengthDelimited).string(message.educationInfo);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message user.UserInfo
 */
export const UserInfo = new UserInfo$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Users$Type extends MessageType<Users> {
    constructor() {
        super("user.Users", [
            { no: 1, name: "users", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => User }
        ]);
    }
    create(value?: PartialMessage<Users>): Users {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.users = [];
        if (value !== undefined)
            reflectionMergePartial<Users>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Users): Users {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated user.User users */ 1:
                    message.users.push(User.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: Users, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated user.User users = 1; */
        for (let i = 0; i < message.users.length; i++)
            User.internalBinaryWrite(message.users[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message user.Users
 */
export const Users = new Users$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AuthInfo$Type extends MessageType<AuthInfo> {
    constructor() {
        super("user.AuthInfo", [
            { no: 1, name: "isAuth", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "userID", kind: "message", T: () => UserID }
        ]);
    }
    create(value?: PartialMessage<AuthInfo>): AuthInfo {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.isAuth = false;
        if (value !== undefined)
            reflectionMergePartial<AuthInfo>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AuthInfo): AuthInfo {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool isAuth */ 1:
                    message.isAuth = reader.bool();
                    break;
                case /* user.UserID userID */ 2:
                    message.userID = UserID.internalBinaryRead(reader, reader.uint32(), options, message.userID);
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
    internalBinaryWrite(message: AuthInfo, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bool isAuth = 1; */
        if (message.isAuth !== false)
            writer.tag(1, WireType.Varint).bool(message.isAuth);
        /* user.UserID userID = 2; */
        if (message.userID)
            UserID.internalBinaryWrite(message.userID, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message user.AuthInfo
 */
export const AuthInfo = new AuthInfo$Type();
