// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        v3.21.12
// source: models/common.proto

package models

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Campus int32

const (
	Campus_OTHER_CAMPUS Campus = 0
	Campus_MSK          Campus = 1
	Campus_NOV          Campus = 2
	Campus_PER          Campus = 3
	Campus_SPB          Campus = 4
	Campus_ONLINE       Campus = 5
)

// Enum value maps for Campus.
var (
	Campus_name = map[int32]string{
		0: "OTHER_CAMPUS",
		1: "MSK",
		2: "NOV",
		3: "PER",
		4: "SPB",
		5: "ONLINE",
	}
	Campus_value = map[string]int32{
		"OTHER_CAMPUS": 0,
		"MSK":          1,
		"NOV":          2,
		"PER":          3,
		"SPB":          4,
		"ONLINE":       5,
	}
)

func (x Campus) Enum() *Campus {
	p := new(Campus)
	*p = x
	return p
}

func (x Campus) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (Campus) Descriptor() protoreflect.EnumDescriptor {
	return file_models_common_proto_enumTypes[0].Descriptor()
}

func (Campus) Type() protoreflect.EnumType {
	return &file_models_common_proto_enumTypes[0]
}

func (x Campus) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use Campus.Descriptor instead.
func (Campus) EnumDescriptor() ([]byte, []int) {
	return file_models_common_proto_rawDescGZIP(), []int{0}
}

type Faculty int32

const (
	Faculty_OTHER_FACULTY Faculty = 0
	Faculty_BIOLOGY       Faculty = 1
	Faculty_CHEMISTRY     Faculty = 2
	Faculty_CMD           Faculty = 3
	Faculty_CS            Faculty = 4
	Faculty_ECONOMICS     Faculty = 5
	Faculty_GEOGRAPHY     Faculty = 6
	Faculty_GOROD         Faculty = 7
	Faculty_GSB           Faculty = 8
	Faculty_HUM           Faculty = 9
	Faculty_ICEF          Faculty = 10
	Faculty_INMAN         Faculty = 11
	Faculty_ISSEK         Faculty = 12
	Faculty_LANG          Faculty = 13
	Faculty_LAW           Faculty = 14
	Faculty_MATH          Faculty = 15
	Faculty_MIEM          Faculty = 16
	Faculty_BINST         Faculty = 17
	Faculty_PHYSICS       Faculty = 18
	Faculty_PRAVO         Faculty = 19
	Faculty_SOCIAL        Faculty = 20
	Faculty_WE            Faculty = 21
)

// Enum value maps for Faculty.
var (
	Faculty_name = map[int32]string{
		0:  "OTHER_FACULTY",
		1:  "BIOLOGY",
		2:  "CHEMISTRY",
		3:  "CMD",
		4:  "CS",
		5:  "ECONOMICS",
		6:  "GEOGRAPHY",
		7:  "GOROD",
		8:  "GSB",
		9:  "HUM",
		10: "ICEF",
		11: "INMAN",
		12: "ISSEK",
		13: "LANG",
		14: "LAW",
		15: "MATH",
		16: "MIEM",
		17: "BINST",
		18: "PHYSICS",
		19: "PRAVO",
		20: "SOCIAL",
		21: "WE",
	}
	Faculty_value = map[string]int32{
		"OTHER_FACULTY": 0,
		"BIOLOGY":       1,
		"CHEMISTRY":     2,
		"CMD":           3,
		"CS":            4,
		"ECONOMICS":     5,
		"GEOGRAPHY":     6,
		"GOROD":         7,
		"GSB":           8,
		"HUM":           9,
		"ICEF":          10,
		"INMAN":         11,
		"ISSEK":         12,
		"LANG":          13,
		"LAW":           14,
		"MATH":          15,
		"MIEM":          16,
		"BINST":         17,
		"PHYSICS":       18,
		"PRAVO":         19,
		"SOCIAL":        20,
		"WE":            21,
	}
)

func (x Faculty) Enum() *Faculty {
	p := new(Faculty)
	*p = x
	return p
}

func (x Faculty) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (Faculty) Descriptor() protoreflect.EnumDescriptor {
	return file_models_common_proto_enumTypes[1].Descriptor()
}

func (Faculty) Type() protoreflect.EnumType {
	return &file_models_common_proto_enumTypes[1]
}

func (x Faculty) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use Faculty.Descriptor instead.
func (Faculty) EnumDescriptor() ([]byte, []int) {
	return file_models_common_proto_rawDescGZIP(), []int{1}
}

type Language int32

const (
	Language_OTHER_LANGUAGE Language = 0
	Language_RU             Language = 1
	Language_EN             Language = 2
	Language_ES             Language = 3
	Language_FR             Language = 4
	Language_HI             Language = 5
	Language_IT             Language = 6
	Language_JA             Language = 7
	Language_KO             Language = 8
	Language_AR             Language = 9
	Language_ZH             Language = 10
	Language_DE             Language = 11
)

// Enum value maps for Language.
var (
	Language_name = map[int32]string{
		0:  "OTHER_LANGUAGE",
		1:  "RU",
		2:  "EN",
		3:  "ES",
		4:  "FR",
		5:  "HI",
		6:  "IT",
		7:  "JA",
		8:  "KO",
		9:  "AR",
		10: "ZH",
		11: "DE",
	}
	Language_value = map[string]int32{
		"OTHER_LANGUAGE": 0,
		"RU":             1,
		"EN":             2,
		"ES":             3,
		"FR":             4,
		"HI":             5,
		"IT":             6,
		"JA":             7,
		"KO":             8,
		"AR":             9,
		"ZH":             10,
		"DE":             11,
	}
)

func (x Language) Enum() *Language {
	p := new(Language)
	*p = x
	return p
}

func (x Language) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (Language) Descriptor() protoreflect.EnumDescriptor {
	return file_models_common_proto_enumTypes[2].Descriptor()
}

func (Language) Type() protoreflect.EnumType {
	return &file_models_common_proto_enumTypes[2]
}

func (x Language) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use Language.Descriptor instead.
func (Language) EnumDescriptor() ([]byte, []int) {
	return file_models_common_proto_rawDescGZIP(), []int{2}
}

type Gender int32

const (
	Gender_OTHER_GENDER Gender = 0
	Gender_FEMALE       Gender = 1
	Gender_MALE         Gender = 2
)

// Enum value maps for Gender.
var (
	Gender_name = map[int32]string{
		0: "OTHER_GENDER",
		1: "FEMALE",
		2: "MALE",
	}
	Gender_value = map[string]int32{
		"OTHER_GENDER": 0,
		"FEMALE":       1,
		"MALE":         2,
	}
)

func (x Gender) Enum() *Gender {
	p := new(Gender)
	*p = x
	return p
}

func (x Gender) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (Gender) Descriptor() protoreflect.EnumDescriptor {
	return file_models_common_proto_enumTypes[3].Descriptor()
}

func (Gender) Type() protoreflect.EnumType {
	return &file_models_common_proto_enumTypes[3]
}

func (x Gender) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use Gender.Descriptor instead.
func (Gender) EnumDescriptor() ([]byte, []int) {
	return file_models_common_proto_rawDescGZIP(), []int{3}
}

type Links struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Kind        string `protobuf:"bytes,1,opt,name=kind,proto3" json:"kind,omitempty"`
	Value       string `protobuf:"bytes,2,opt,name=value,proto3" json:"value,omitempty"`
	Description string `protobuf:"bytes,3,opt,name=description,proto3" json:"description,omitempty"`
}

func (x *Links) Reset() {
	*x = Links{}
	if protoimpl.UnsafeEnabled {
		mi := &file_models_common_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Links) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Links) ProtoMessage() {}

func (x *Links) ProtoReflect() protoreflect.Message {
	mi := &file_models_common_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Links.ProtoReflect.Descriptor instead.
func (*Links) Descriptor() ([]byte, []int) {
	return file_models_common_proto_rawDescGZIP(), []int{0}
}

func (x *Links) GetKind() string {
	if x != nil {
		return x.Kind
	}
	return ""
}

func (x *Links) GetValue() string {
	if x != nil {
		return x.Value
	}
	return ""
}

func (x *Links) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

type Tag struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Tag string `protobuf:"bytes,1,opt,name=tag,proto3" json:"tag,omitempty"`
}

func (x *Tag) Reset() {
	*x = Tag{}
	if protoimpl.UnsafeEnabled {
		mi := &file_models_common_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Tag) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Tag) ProtoMessage() {}

func (x *Tag) ProtoReflect() protoreflect.Message {
	mi := &file_models_common_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Tag.ProtoReflect.Descriptor instead.
func (*Tag) Descriptor() ([]byte, []int) {
	return file_models_common_proto_rawDescGZIP(), []int{1}
}

func (x *Tag) GetTag() string {
	if x != nil {
		return x.Tag
	}
	return ""
}

type Tags struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Tags []string `protobuf:"bytes,1,rep,name=tags,proto3" json:"tags,omitempty"`
}

func (x *Tags) Reset() {
	*x = Tags{}
	if protoimpl.UnsafeEnabled {
		mi := &file_models_common_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Tags) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Tags) ProtoMessage() {}

func (x *Tags) ProtoReflect() protoreflect.Message {
	mi := &file_models_common_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Tags.ProtoReflect.Descriptor instead.
func (*Tags) Descriptor() ([]byte, []int) {
	return file_models_common_proto_rawDescGZIP(), []int{2}
}

func (x *Tags) GetTags() []string {
	if x != nil {
		return x.Tags
	}
	return nil
}

var File_models_common_proto protoreflect.FileDescriptor

var file_models_common_proto_rawDesc = []byte{
	0x0a, 0x13, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x73, 0x2f, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06, 0x63, 0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x22, 0x53, 0x0a,
	0x05, 0x4c, 0x69, 0x6e, 0x6b, 0x73, 0x12, 0x12, 0x0a, 0x04, 0x6b, 0x69, 0x6e, 0x64, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6b, 0x69, 0x6e, 0x64, 0x12, 0x14, 0x0a, 0x05, 0x76, 0x61,
	0x6c, 0x75, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65,
	0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69,
	0x6f, 0x6e, 0x22, 0x17, 0x0a, 0x03, 0x54, 0x61, 0x67, 0x12, 0x10, 0x0a, 0x03, 0x74, 0x61, 0x67,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x74, 0x61, 0x67, 0x22, 0x1a, 0x0a, 0x04, 0x54,
	0x61, 0x67, 0x73, 0x12, 0x12, 0x0a, 0x04, 0x74, 0x61, 0x67, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28,
	0x09, 0x52, 0x04, 0x74, 0x61, 0x67, 0x73, 0x2a, 0x4a, 0x0a, 0x06, 0x43, 0x61, 0x6d, 0x70, 0x75,
	0x73, 0x12, 0x10, 0x0a, 0x0c, 0x4f, 0x54, 0x48, 0x45, 0x52, 0x5f, 0x43, 0x41, 0x4d, 0x50, 0x55,
	0x53, 0x10, 0x00, 0x12, 0x07, 0x0a, 0x03, 0x4d, 0x53, 0x4b, 0x10, 0x01, 0x12, 0x07, 0x0a, 0x03,
	0x4e, 0x4f, 0x56, 0x10, 0x02, 0x12, 0x07, 0x0a, 0x03, 0x50, 0x45, 0x52, 0x10, 0x03, 0x12, 0x07,
	0x0a, 0x03, 0x53, 0x50, 0x42, 0x10, 0x04, 0x12, 0x0a, 0x0a, 0x06, 0x4f, 0x4e, 0x4c, 0x49, 0x4e,
	0x45, 0x10, 0x05, 0x2a, 0x82, 0x02, 0x0a, 0x07, 0x46, 0x61, 0x63, 0x75, 0x6c, 0x74, 0x79, 0x12,
	0x11, 0x0a, 0x0d, 0x4f, 0x54, 0x48, 0x45, 0x52, 0x5f, 0x46, 0x41, 0x43, 0x55, 0x4c, 0x54, 0x59,
	0x10, 0x00, 0x12, 0x0b, 0x0a, 0x07, 0x42, 0x49, 0x4f, 0x4c, 0x4f, 0x47, 0x59, 0x10, 0x01, 0x12,
	0x0d, 0x0a, 0x09, 0x43, 0x48, 0x45, 0x4d, 0x49, 0x53, 0x54, 0x52, 0x59, 0x10, 0x02, 0x12, 0x07,
	0x0a, 0x03, 0x43, 0x4d, 0x44, 0x10, 0x03, 0x12, 0x06, 0x0a, 0x02, 0x43, 0x53, 0x10, 0x04, 0x12,
	0x0d, 0x0a, 0x09, 0x45, 0x43, 0x4f, 0x4e, 0x4f, 0x4d, 0x49, 0x43, 0x53, 0x10, 0x05, 0x12, 0x0d,
	0x0a, 0x09, 0x47, 0x45, 0x4f, 0x47, 0x52, 0x41, 0x50, 0x48, 0x59, 0x10, 0x06, 0x12, 0x09, 0x0a,
	0x05, 0x47, 0x4f, 0x52, 0x4f, 0x44, 0x10, 0x07, 0x12, 0x07, 0x0a, 0x03, 0x47, 0x53, 0x42, 0x10,
	0x08, 0x12, 0x07, 0x0a, 0x03, 0x48, 0x55, 0x4d, 0x10, 0x09, 0x12, 0x08, 0x0a, 0x04, 0x49, 0x43,
	0x45, 0x46, 0x10, 0x0a, 0x12, 0x09, 0x0a, 0x05, 0x49, 0x4e, 0x4d, 0x41, 0x4e, 0x10, 0x0b, 0x12,
	0x09, 0x0a, 0x05, 0x49, 0x53, 0x53, 0x45, 0x4b, 0x10, 0x0c, 0x12, 0x08, 0x0a, 0x04, 0x4c, 0x41,
	0x4e, 0x47, 0x10, 0x0d, 0x12, 0x07, 0x0a, 0x03, 0x4c, 0x41, 0x57, 0x10, 0x0e, 0x12, 0x08, 0x0a,
	0x04, 0x4d, 0x41, 0x54, 0x48, 0x10, 0x0f, 0x12, 0x08, 0x0a, 0x04, 0x4d, 0x49, 0x45, 0x4d, 0x10,
	0x10, 0x12, 0x09, 0x0a, 0x05, 0x42, 0x49, 0x4e, 0x53, 0x54, 0x10, 0x11, 0x12, 0x0b, 0x0a, 0x07,
	0x50, 0x48, 0x59, 0x53, 0x49, 0x43, 0x53, 0x10, 0x12, 0x12, 0x09, 0x0a, 0x05, 0x50, 0x52, 0x41,
	0x56, 0x4f, 0x10, 0x13, 0x12, 0x0a, 0x0a, 0x06, 0x53, 0x4f, 0x43, 0x49, 0x41, 0x4c, 0x10, 0x14,
	0x12, 0x06, 0x0a, 0x02, 0x57, 0x45, 0x10, 0x15, 0x2a, 0x76, 0x0a, 0x08, 0x4c, 0x61, 0x6e, 0x67,
	0x75, 0x61, 0x67, 0x65, 0x12, 0x12, 0x0a, 0x0e, 0x4f, 0x54, 0x48, 0x45, 0x52, 0x5f, 0x4c, 0x41,
	0x4e, 0x47, 0x55, 0x41, 0x47, 0x45, 0x10, 0x00, 0x12, 0x06, 0x0a, 0x02, 0x52, 0x55, 0x10, 0x01,
	0x12, 0x06, 0x0a, 0x02, 0x45, 0x4e, 0x10, 0x02, 0x12, 0x06, 0x0a, 0x02, 0x45, 0x53, 0x10, 0x03,
	0x12, 0x06, 0x0a, 0x02, 0x46, 0x52, 0x10, 0x04, 0x12, 0x06, 0x0a, 0x02, 0x48, 0x49, 0x10, 0x05,
	0x12, 0x06, 0x0a, 0x02, 0x49, 0x54, 0x10, 0x06, 0x12, 0x06, 0x0a, 0x02, 0x4a, 0x41, 0x10, 0x07,
	0x12, 0x06, 0x0a, 0x02, 0x4b, 0x4f, 0x10, 0x08, 0x12, 0x06, 0x0a, 0x02, 0x41, 0x52, 0x10, 0x09,
	0x12, 0x06, 0x0a, 0x02, 0x5a, 0x48, 0x10, 0x0a, 0x12, 0x06, 0x0a, 0x02, 0x44, 0x45, 0x10, 0x0b,
	0x2a, 0x30, 0x0a, 0x06, 0x47, 0x65, 0x6e, 0x64, 0x65, 0x72, 0x12, 0x10, 0x0a, 0x0c, 0x4f, 0x54,
	0x48, 0x45, 0x52, 0x5f, 0x47, 0x45, 0x4e, 0x44, 0x45, 0x52, 0x10, 0x00, 0x12, 0x0a, 0x0a, 0x06,
	0x46, 0x45, 0x4d, 0x41, 0x4c, 0x45, 0x10, 0x01, 0x12, 0x08, 0x0a, 0x04, 0x4d, 0x41, 0x4c, 0x45,
	0x10, 0x02, 0x42, 0x3d, 0x5a, 0x3b, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d,
	0x2f, 0x44, 0x75, 0x62, 0x72, 0x6f, 0x76, 0x45, 0x76, 0x61, 0x2f, 0x68, 0x69, 0x67, 0x68, 0x65,
	0x72, 0x5f, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x2f, 0x62, 0x61, 0x63, 0x6b, 0x65, 0x6e, 0x64,
	0x2f, 0x70, 0x6b, 0x67, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6d, 0x6f, 0x64, 0x65, 0x6c,
	0x73, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_models_common_proto_rawDescOnce sync.Once
	file_models_common_proto_rawDescData = file_models_common_proto_rawDesc
)

func file_models_common_proto_rawDescGZIP() []byte {
	file_models_common_proto_rawDescOnce.Do(func() {
		file_models_common_proto_rawDescData = protoimpl.X.CompressGZIP(file_models_common_proto_rawDescData)
	})
	return file_models_common_proto_rawDescData
}

var file_models_common_proto_enumTypes = make([]protoimpl.EnumInfo, 4)
var file_models_common_proto_msgTypes = make([]protoimpl.MessageInfo, 3)
var file_models_common_proto_goTypes = []interface{}{
	(Campus)(0),   // 0: common.Campus
	(Faculty)(0),  // 1: common.Faculty
	(Language)(0), // 2: common.Language
	(Gender)(0),   // 3: common.Gender
	(*Links)(nil), // 4: common.Links
	(*Tag)(nil),   // 5: common.Tag
	(*Tags)(nil),  // 6: common.Tags
}
var file_models_common_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_models_common_proto_init() }
func file_models_common_proto_init() {
	if File_models_common_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_models_common_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Links); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_models_common_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Tag); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_models_common_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Tags); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_models_common_proto_rawDesc,
			NumEnums:      4,
			NumMessages:   3,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_models_common_proto_goTypes,
		DependencyIndexes: file_models_common_proto_depIdxs,
		EnumInfos:         file_models_common_proto_enumTypes,
		MessageInfos:      file_models_common_proto_msgTypes,
	}.Build()
	File_models_common_proto = out.File
	file_models_common_proto_rawDesc = nil
	file_models_common_proto_goTypes = nil
	file_models_common_proto_depIdxs = nil
}
