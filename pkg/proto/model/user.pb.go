// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.21.12
// source: model/user.proto

package model

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

type Role int32

const (
	Role_UNKNOWN   Role = 0
	Role_REGULAR   Role = 1
	Role_HEAD      Role = 2
	Role_MODERATOR Role = 3
	Role_DEVELOPER Role = 4
)

// Enum value maps for Role.
var (
	Role_name = map[int32]string{
		0: "UNKNOWN",
		1: "REGULAR",
		2: "HEAD",
		3: "MODERATOR",
		4: "DEVELOPER",
	}
	Role_value = map[string]int32{
		"UNKNOWN":   0,
		"REGULAR":   1,
		"HEAD":      2,
		"MODERATOR": 3,
		"DEVELOPER": 4,
	}
)

func (x Role) Enum() *Role {
	p := new(Role)
	*p = x
	return p
}

func (x Role) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (Role) Descriptor() protoreflect.EnumDescriptor {
	return file_model_user_proto_enumTypes[0].Descriptor()
}

func (Role) Type() protoreflect.EnumType {
	return &file_model_user_proto_enumTypes[0]
}

func (x Role) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use Role.Descriptor instead.
func (Role) EnumDescriptor() ([]byte, []int) {
	return file_model_user_proto_rawDescGZIP(), []int{0}
}

type UserID struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id int64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
}

func (x *UserID) Reset() {
	*x = UserID{}
	if protoimpl.UnsafeEnabled {
		mi := &file_model_user_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UserID) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UserID) ProtoMessage() {}

func (x *UserID) ProtoReflect() protoreflect.Message {
	mi := &file_model_user_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UserID.ProtoReflect.Descriptor instead.
func (*UserID) Descriptor() ([]byte, []int) {
	return file_model_user_proto_rawDescGZIP(), []int{0}
}

func (x *UserID) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

type UserInfo struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name        string     `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	Surname     string     `protobuf:"bytes,3,opt,name=surname,proto3" json:"surname,omitempty"`
	MiddleName  string     `protobuf:"bytes,4,opt,name=middle_name,json=middleName,proto3" json:"middle_name,omitempty"`
	Description string     `protobuf:"bytes,5,opt,name=description,proto3" json:"description,omitempty"`
	Email       string     `protobuf:"bytes,6,opt,name=email,proto3" json:"email,omitempty"`
	Contacts    []*Contact `protobuf:"bytes,7,rep,name=contacts,proto3" json:"contacts,omitempty"`
	Salt        string     `protobuf:"bytes,8,opt,name=salt,proto3" json:"salt,omitempty"`
	Hash        string     `protobuf:"bytes,9,opt,name=hash,proto3" json:"hash,omitempty"`
	Role        Role       `protobuf:"varint,10,opt,name=role,proto3,enum=user.Role" json:"role,omitempty"`
}

func (x *UserInfo) Reset() {
	*x = UserInfo{}
	if protoimpl.UnsafeEnabled {
		mi := &file_model_user_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UserInfo) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UserInfo) ProtoMessage() {}

func (x *UserInfo) ProtoReflect() protoreflect.Message {
	mi := &file_model_user_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UserInfo.ProtoReflect.Descriptor instead.
func (*UserInfo) Descriptor() ([]byte, []int) {
	return file_model_user_proto_rawDescGZIP(), []int{1}
}

func (x *UserInfo) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *UserInfo) GetSurname() string {
	if x != nil {
		return x.Surname
	}
	return ""
}

func (x *UserInfo) GetMiddleName() string {
	if x != nil {
		return x.MiddleName
	}
	return ""
}

func (x *UserInfo) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

func (x *UserInfo) GetEmail() string {
	if x != nil {
		return x.Email
	}
	return ""
}

func (x *UserInfo) GetContacts() []*Contact {
	if x != nil {
		return x.Contacts
	}
	return nil
}

func (x *UserInfo) GetSalt() string {
	if x != nil {
		return x.Salt
	}
	return ""
}

func (x *UserInfo) GetHash() string {
	if x != nil {
		return x.Hash
	}
	return ""
}

func (x *UserInfo) GetRole() Role {
	if x != nil {
		return x.Role
	}
	return Role_UNKNOWN
}

type User struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id       *UserID   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	UserInfo *UserInfo `protobuf:"bytes,2,opt,name=user_info,json=userInfo,proto3" json:"user_info,omitempty"`
}

func (x *User) Reset() {
	*x = User{}
	if protoimpl.UnsafeEnabled {
		mi := &file_model_user_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *User) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*User) ProtoMessage() {}

func (x *User) ProtoReflect() protoreflect.Message {
	mi := &file_model_user_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use User.ProtoReflect.Descriptor instead.
func (*User) Descriptor() ([]byte, []int) {
	return file_model_user_proto_rawDescGZIP(), []int{2}
}

func (x *User) GetId() *UserID {
	if x != nil {
		return x.Id
	}
	return nil
}

func (x *User) GetUserInfo() *UserInfo {
	if x != nil {
		return x.UserInfo
	}
	return nil
}

type Contact struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Kind        string `protobuf:"bytes,1,opt,name=kind,proto3" json:"kind,omitempty"`
	Value       string `protobuf:"bytes,2,opt,name=value,proto3" json:"value,omitempty"`
	Description string `protobuf:"bytes,3,opt,name=description,proto3" json:"description,omitempty"`
}

func (x *Contact) Reset() {
	*x = Contact{}
	if protoimpl.UnsafeEnabled {
		mi := &file_model_user_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Contact) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Contact) ProtoMessage() {}

func (x *Contact) ProtoReflect() protoreflect.Message {
	mi := &file_model_user_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Contact.ProtoReflect.Descriptor instead.
func (*Contact) Descriptor() ([]byte, []int) {
	return file_model_user_proto_rawDescGZIP(), []int{3}
}

func (x *Contact) GetKind() string {
	if x != nil {
		return x.Kind
	}
	return ""
}

func (x *Contact) GetValue() string {
	if x != nil {
		return x.Value
	}
	return ""
}

func (x *Contact) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

var File_model_user_proto protoreflect.FileDescriptor

var file_model_user_proto_rawDesc = []byte{
	0x0a, 0x10, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2f, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x12, 0x04, 0x75, 0x73, 0x65, 0x72, 0x22, 0x18, 0x0a, 0x06, 0x55, 0x73, 0x65, 0x72,
	0x49, 0x44, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x02,
	0x69, 0x64, 0x22, 0x84, 0x02, 0x0a, 0x08, 0x55, 0x73, 0x65, 0x72, 0x49, 0x6e, 0x66, 0x6f, 0x12,
	0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e,
	0x61, 0x6d, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x73, 0x75, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x03,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x73, 0x75, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1f, 0x0a,
	0x0b, 0x6d, 0x69, 0x64, 0x64, 0x6c, 0x65, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x04, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x0a, 0x6d, 0x69, 0x64, 0x64, 0x6c, 0x65, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x20,
	0x0a, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x05, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69, 0x6f, 0x6e,
	0x12, 0x14, 0x0a, 0x05, 0x65, 0x6d, 0x61, 0x69, 0x6c, 0x18, 0x06, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x05, 0x65, 0x6d, 0x61, 0x69, 0x6c, 0x12, 0x29, 0x0a, 0x08, 0x63, 0x6f, 0x6e, 0x74, 0x61, 0x63,
	0x74, 0x73, 0x18, 0x07, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e,
	0x43, 0x6f, 0x6e, 0x74, 0x61, 0x63, 0x74, 0x52, 0x08, 0x63, 0x6f, 0x6e, 0x74, 0x61, 0x63, 0x74,
	0x73, 0x12, 0x12, 0x0a, 0x04, 0x73, 0x61, 0x6c, 0x74, 0x18, 0x08, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x04, 0x73, 0x61, 0x6c, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x68, 0x61, 0x73, 0x68, 0x18, 0x09, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x04, 0x68, 0x61, 0x73, 0x68, 0x12, 0x1e, 0x0a, 0x04, 0x72, 0x6f, 0x6c,
	0x65, 0x18, 0x0a, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x0a, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x52,
	0x6f, 0x6c, 0x65, 0x52, 0x04, 0x72, 0x6f, 0x6c, 0x65, 0x22, 0x51, 0x0a, 0x04, 0x55, 0x73, 0x65,
	0x72, 0x12, 0x1c, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0c, 0x2e,
	0x75, 0x73, 0x65, 0x72, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x49, 0x44, 0x52, 0x02, 0x69, 0x64, 0x12,
	0x2b, 0x0a, 0x09, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x69, 0x6e, 0x66, 0x6f, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x49, 0x6e,
	0x66, 0x6f, 0x52, 0x08, 0x75, 0x73, 0x65, 0x72, 0x49, 0x6e, 0x66, 0x6f, 0x22, 0x55, 0x0a, 0x07,
	0x43, 0x6f, 0x6e, 0x74, 0x61, 0x63, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x6b, 0x69, 0x6e, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6b, 0x69, 0x6e, 0x64, 0x12, 0x14, 0x0a, 0x05, 0x76,
	0x61, 0x6c, 0x75, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75,
	0x65, 0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69, 0x6f, 0x6e,
	0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74,
	0x69, 0x6f, 0x6e, 0x2a, 0x48, 0x0a, 0x04, 0x52, 0x6f, 0x6c, 0x65, 0x12, 0x0b, 0x0a, 0x07, 0x55,
	0x4e, 0x4b, 0x4e, 0x4f, 0x57, 0x4e, 0x10, 0x00, 0x12, 0x0b, 0x0a, 0x07, 0x52, 0x45, 0x47, 0x55,
	0x4c, 0x41, 0x52, 0x10, 0x01, 0x12, 0x08, 0x0a, 0x04, 0x48, 0x45, 0x41, 0x44, 0x10, 0x02, 0x12,
	0x0d, 0x0a, 0x09, 0x4d, 0x4f, 0x44, 0x45, 0x52, 0x41, 0x54, 0x4f, 0x52, 0x10, 0x03, 0x12, 0x0d,
	0x0a, 0x09, 0x44, 0x45, 0x56, 0x45, 0x4c, 0x4f, 0x50, 0x45, 0x52, 0x10, 0x04, 0x42, 0x34, 0x5a,
	0x32, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x44, 0x75, 0x62, 0x72,
	0x6f, 0x76, 0x45, 0x76, 0x61, 0x2f, 0x68, 0x69, 0x67, 0x68, 0x65, 0x72, 0x5f, 0x73, 0x65, 0x61,
	0x72, 0x63, 0x68, 0x2f, 0x70, 0x6b, 0x67, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6d, 0x6f,
	0x64, 0x65, 0x6c, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_model_user_proto_rawDescOnce sync.Once
	file_model_user_proto_rawDescData = file_model_user_proto_rawDesc
)

func file_model_user_proto_rawDescGZIP() []byte {
	file_model_user_proto_rawDescOnce.Do(func() {
		file_model_user_proto_rawDescData = protoimpl.X.CompressGZIP(file_model_user_proto_rawDescData)
	})
	return file_model_user_proto_rawDescData
}

var file_model_user_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_model_user_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_model_user_proto_goTypes = []interface{}{
	(Role)(0),        // 0: user.Role
	(*UserID)(nil),   // 1: user.UserID
	(*UserInfo)(nil), // 2: user.UserInfo
	(*User)(nil),     // 3: user.User
	(*Contact)(nil),  // 4: user.Contact
}
var file_model_user_proto_depIdxs = []int32{
	4, // 0: user.UserInfo.contacts:type_name -> user.Contact
	0, // 1: user.UserInfo.role:type_name -> user.Role
	1, // 2: user.User.id:type_name -> user.UserID
	2, // 3: user.User.user_info:type_name -> user.UserInfo
	4, // [4:4] is the sub-list for method output_type
	4, // [4:4] is the sub-list for method input_type
	4, // [4:4] is the sub-list for extension type_name
	4, // [4:4] is the sub-list for extension extendee
	0, // [0:4] is the sub-list for field type_name
}

func init() { file_model_user_proto_init() }
func file_model_user_proto_init() {
	if File_model_user_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_model_user_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UserID); i {
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
		file_model_user_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UserInfo); i {
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
		file_model_user_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*User); i {
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
		file_model_user_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Contact); i {
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
			RawDescriptor: file_model_user_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_model_user_proto_goTypes,
		DependencyIndexes: file_model_user_proto_depIdxs,
		EnumInfos:         file_model_user_proto_enumTypes,
		MessageInfos:      file_model_user_proto_msgTypes,
	}.Build()
	File_model_user_proto = out.File
	file_model_user_proto_rawDesc = nil
	file_model_user_proto_goTypes = nil
	file_model_user_proto_depIdxs = nil
}
