// @generated by protobuf-ts 2.9.4 with parameter long_type_string
// @generated from protobuf file "models/common.proto" (package "common", syntax proto3)
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
/**
 * @generated from protobuf message common.Links
 */
export interface Links {
    /**
     * @generated from protobuf field: string kind = 1;
     */
    kind: string;
    /**
     * @generated from protobuf field: string value = 2;
     */
    value: string;
    /**
     * @generated from protobuf field: string description = 3;
     */
    description: string;
}
/**
 * @generated from protobuf message common.Tag
 */
export interface Tag {
    /**
     * @generated from protobuf field: string tag = 1;
     */
    tag: string;
}
/**
 * @generated from protobuf message common.Tags
 */
export interface Tags {
    /**
     * @generated from protobuf field: repeated string tags = 1;
     */
    tags: string[];
}
/**
 * @generated from protobuf enum common.Campus
 */
export enum Campus {
    /**
     * @generated from protobuf enum value: MSK = 0;
     */
    MSK = 0,
    /**
     * @generated from protobuf enum value: NOV = 1;
     */
    NOV = 1,
    /**
     * @generated from protobuf enum value: OTHER_CAMPUS = 2;
     */
    OTHER_CAMPUS = 2,
    /**
     * @generated from protobuf enum value: PER = 3;
     */
    PER = 3,
    /**
     * @generated from protobuf enum value: SPB = 4;
     */
    SPB = 4
}
/**
 * @generated from protobuf enum common.Faculty
 */
export enum Faculty {
    /**
     * @generated from protobuf enum value: BINST = 0;
     */
    BINST = 0,
    /**
     * @generated from protobuf enum value: BIOLOGY = 1;
     */
    BIOLOGY = 1,
    /**
     * @generated from protobuf enum value: CHEMISTRY = 2;
     */
    CHEMISTRY = 2,
    /**
     * @generated from protobuf enum value: CMD = 3;
     */
    CMD = 3,
    /**
     * @generated from protobuf enum value: CS = 4;
     */
    CS = 4,
    /**
     * @generated from protobuf enum value: ECONOMICS = 5;
     */
    ECONOMICS = 5,
    /**
     * @generated from protobuf enum value: GEOGRAPHY = 6;
     */
    GEOGRAPHY = 6,
    /**
     * @generated from protobuf enum value: GOROD = 7;
     */
    GOROD = 7,
    /**
     * @generated from protobuf enum value: GSB = 8;
     */
    GSB = 8,
    /**
     * @generated from protobuf enum value: HUM = 9;
     */
    HUM = 9,
    /**
     * @generated from protobuf enum value: ICEF = 10;
     */
    ICEF = 10,
    /**
     * @generated from protobuf enum value: INMAN = 11;
     */
    INMAN = 11,
    /**
     * @generated from protobuf enum value: ISSEK = 12;
     */
    ISSEK = 12,
    /**
     * @generated from protobuf enum value: LANG = 13;
     */
    LANG = 13,
    /**
     * @generated from protobuf enum value: LAW = 14;
     */
    LAW = 14,
    /**
     * @generated from protobuf enum value: MATH = 15;
     */
    MATH = 15,
    /**
     * @generated from protobuf enum value: MIEM = 16;
     */
    MIEM = 16,
    /**
     * @generated from protobuf enum value: OTHER_FACULTY = 17;
     */
    OTHER_FACULTY = 17,
    /**
     * @generated from protobuf enum value: PHYSICS = 18;
     */
    PHYSICS = 18,
    /**
     * @generated from protobuf enum value: PRAVO = 19;
     */
    PRAVO = 19,
    /**
     * @generated from protobuf enum value: SOCIAL = 20;
     */
    SOCIAL = 20,
    /**
     * @generated from protobuf enum value: WE = 21;
     */
    WE = 21
}
/**
 * @generated from protobuf enum common.Language
 */
export enum Language {
    /**
     * @generated from protobuf enum value: AR = 0;
     */
    AR = 0,
    /**
     * @generated from protobuf enum value: DE = 1;
     */
    DE = 1,
    /**
     * @generated from protobuf enum value: EN = 2;
     */
    EN = 2,
    /**
     * @generated from protobuf enum value: ES = 3;
     */
    ES = 3,
    /**
     * @generated from protobuf enum value: FR = 4;
     */
    FR = 4,
    /**
     * @generated from protobuf enum value: HI = 5;
     */
    HI = 5,
    /**
     * @generated from protobuf enum value: IT = 6;
     */
    IT = 6,
    /**
     * @generated from protobuf enum value: JA = 7;
     */
    JA = 7,
    /**
     * @generated from protobuf enum value: KO = 8;
     */
    KO = 8,
    /**
     * @generated from protobuf enum value: RU = 9;
     */
    RU = 9,
    /**
     * @generated from protobuf enum value: ZH = 10;
     */
    ZH = 10
}
/**
 * @generated from protobuf enum common.Gender
 */
export enum Gender {
    /**
     * @generated from protobuf enum value: FEMALE = 0;
     */
    FEMALE = 0,
    /**
     * @generated from protobuf enum value: MALE = 1;
     */
    MALE = 1,
    /**
     * @generated from protobuf enum value: OTHER_GENDER = 2;
     */
    OTHER_GENDER = 2
}
// @generated message type with reflection information, may provide speed optimized methods
class Links$Type extends MessageType<Links> {
    constructor() {
        super("common.Links", [
            { no: 1, name: "kind", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "value", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Links>): Links {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.kind = "";
        message.value = "";
        message.description = "";
        if (value !== undefined)
            reflectionMergePartial<Links>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Links): Links {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string kind */ 1:
                    message.kind = reader.string();
                    break;
                case /* string value */ 2:
                    message.value = reader.string();
                    break;
                case /* string description */ 3:
                    message.description = reader.string();
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
    internalBinaryWrite(message: Links, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string kind = 1; */
        if (message.kind !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.kind);
        /* string value = 2; */
        if (message.value !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.value);
        /* string description = 3; */
        if (message.description !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.description);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message common.Links
 */
export const Links = new Links$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Tag$Type extends MessageType<Tag> {
    constructor() {
        super("common.Tag", [
            { no: 1, name: "tag", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Tag>): Tag {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tag = "";
        if (value !== undefined)
            reflectionMergePartial<Tag>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Tag): Tag {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string tag */ 1:
                    message.tag = reader.string();
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
    internalBinaryWrite(message: Tag, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string tag = 1; */
        if (message.tag !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tag);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message common.Tag
 */
export const Tag = new Tag$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Tags$Type extends MessageType<Tags> {
    constructor() {
        super("common.Tags", [
            { no: 1, name: "tags", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Tags>): Tags {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tags = [];
        if (value !== undefined)
            reflectionMergePartial<Tags>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Tags): Tags {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string tags */ 1:
                    message.tags.push(reader.string());
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
    internalBinaryWrite(message: Tags, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated string tags = 1; */
        for (let i = 0; i < message.tags.length; i++)
            writer.tag(1, WireType.LengthDelimited).string(message.tags[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message common.Tags
 */
export const Tags = new Tags$Type();
