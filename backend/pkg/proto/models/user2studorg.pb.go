// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        v3.21.12
// source: models/user2studorg.proto

package models

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type User2Studorg struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	UserID        *UserID                `protobuf:"bytes,1,opt,name=userID,proto3" json:"userID,omitempty"`
	StudorgID     *StudorgID             `protobuf:"bytes,2,opt,name=studorgID,proto3" json:"studorgID,omitempty"`
	Role          StudorgRole            `protobuf:"varint,3,opt,name=role,proto3,enum=studorg.StudorgRole" json:"role,omitempty"`
	AdmissionTime *timestamppb.Timestamp `protobuf:"bytes,4,opt,name=admissionTime,proto3" json:"admissionTime,omitempty"`
	ContactInfo   string                 `protobuf:"bytes,5,opt,name=contactInfo,proto3" json:"contactInfo,omitempty"`
	CustomRole    string                 `protobuf:"bytes,6,opt,name=customRole,proto3" json:"customRole,omitempty"`
	Info          string                 `protobuf:"bytes,7,opt,name=info,proto3" json:"info,omitempty"`
	IsContact     bool                   `protobuf:"varint,8,opt,name=isContact,proto3" json:"isContact,omitempty"`
}

func (x *User2Studorg) Reset() {
	*x = User2Studorg{}
	if protoimpl.UnsafeEnabled {
		mi := &file_models_user2studorg_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *User2Studorg) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*User2Studorg) ProtoMessage() {}

func (x *User2Studorg) ProtoReflect() protoreflect.Message {
	mi := &file_models_user2studorg_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use User2Studorg.ProtoReflect.Descriptor instead.
func (*User2Studorg) Descriptor() ([]byte, []int) {
	return file_models_user2studorg_proto_rawDescGZIP(), []int{0}
}

func (x *User2Studorg) GetUserID() *UserID {
	if x != nil {
		return x.UserID
	}
	return nil
}

func (x *User2Studorg) GetStudorgID() *StudorgID {
	if x != nil {
		return x.StudorgID
	}
	return nil
}

func (x *User2Studorg) GetRole() StudorgRole {
	if x != nil {
		return x.Role
	}
	return StudorgRole_OTHER_ROLE
}

func (x *User2Studorg) GetAdmissionTime() *timestamppb.Timestamp {
	if x != nil {
		return x.AdmissionTime
	}
	return nil
}

func (x *User2Studorg) GetContactInfo() string {
	if x != nil {
		return x.ContactInfo
	}
	return ""
}

func (x *User2Studorg) GetCustomRole() string {
	if x != nil {
		return x.CustomRole
	}
	return ""
}

func (x *User2Studorg) GetInfo() string {
	if x != nil {
		return x.Info
	}
	return ""
}

func (x *User2Studorg) GetIsContact() bool {
	if x != nil {
		return x.IsContact
	}
	return false
}

var File_models_user2studorg_proto protoreflect.FileDescriptor

var file_models_user2studorg_proto_rawDesc = []byte{
	0x0a, 0x19, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x73, 0x2f, 0x75, 0x73, 0x65, 0x72, 0x32, 0x73, 0x74,
	0x75, 0x64, 0x6f, 0x72, 0x67, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0c, 0x75, 0x73, 0x65,
	0x72, 0x32, 0x73, 0x74, 0x75, 0x64, 0x6f, 0x72, 0x67, 0x1a, 0x1f, 0x67, 0x6f, 0x6f, 0x67, 0x6c,
	0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69, 0x6d, 0x65, 0x73,
	0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x11, 0x6d, 0x6f, 0x64, 0x65,
	0x6c, 0x73, 0x2f, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x14, 0x6d,
	0x6f, 0x64, 0x65, 0x6c, 0x73, 0x2f, 0x73, 0x74, 0x75, 0x64, 0x6f, 0x72, 0x67, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x22, 0xc6, 0x02, 0x0a, 0x0c, 0x55, 0x73, 0x65, 0x72, 0x32, 0x53, 0x74, 0x75,
	0x64, 0x6f, 0x72, 0x67, 0x12, 0x24, 0x0a, 0x06, 0x75, 0x73, 0x65, 0x72, 0x49, 0x44, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x0c, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x55, 0x73, 0x65, 0x72,
	0x49, 0x44, 0x52, 0x06, 0x75, 0x73, 0x65, 0x72, 0x49, 0x44, 0x12, 0x30, 0x0a, 0x09, 0x73, 0x74,
	0x75, 0x64, 0x6f, 0x72, 0x67, 0x49, 0x44, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e,
	0x73, 0x74, 0x75, 0x64, 0x6f, 0x72, 0x67, 0x2e, 0x53, 0x74, 0x75, 0x64, 0x6f, 0x72, 0x67, 0x49,
	0x44, 0x52, 0x09, 0x73, 0x74, 0x75, 0x64, 0x6f, 0x72, 0x67, 0x49, 0x44, 0x12, 0x28, 0x0a, 0x04,
	0x72, 0x6f, 0x6c, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x14, 0x2e, 0x73, 0x74, 0x75,
	0x64, 0x6f, 0x72, 0x67, 0x2e, 0x53, 0x74, 0x75, 0x64, 0x6f, 0x72, 0x67, 0x52, 0x6f, 0x6c, 0x65,
	0x52, 0x04, 0x72, 0x6f, 0x6c, 0x65, 0x12, 0x40, 0x0a, 0x0d, 0x61, 0x64, 0x6d, 0x69, 0x73, 0x73,
	0x69, 0x6f, 0x6e, 0x54, 0x69, 0x6d, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e,
	0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e,
	0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x0d, 0x61, 0x64, 0x6d, 0x69, 0x73,
	0x73, 0x69, 0x6f, 0x6e, 0x54, 0x69, 0x6d, 0x65, 0x12, 0x20, 0x0a, 0x0b, 0x63, 0x6f, 0x6e, 0x74,
	0x61, 0x63, 0x74, 0x49, 0x6e, 0x66, 0x6f, 0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x63,
	0x6f, 0x6e, 0x74, 0x61, 0x63, 0x74, 0x49, 0x6e, 0x66, 0x6f, 0x12, 0x1e, 0x0a, 0x0a, 0x63, 0x75,
	0x73, 0x74, 0x6f, 0x6d, 0x52, 0x6f, 0x6c, 0x65, 0x18, 0x06, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0a,
	0x63, 0x75, 0x73, 0x74, 0x6f, 0x6d, 0x52, 0x6f, 0x6c, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x69, 0x6e,
	0x66, 0x6f, 0x18, 0x07, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x69, 0x6e, 0x66, 0x6f, 0x12, 0x1c,
	0x0a, 0x09, 0x69, 0x73, 0x43, 0x6f, 0x6e, 0x74, 0x61, 0x63, 0x74, 0x18, 0x08, 0x20, 0x01, 0x28,
	0x08, 0x52, 0x09, 0x69, 0x73, 0x43, 0x6f, 0x6e, 0x74, 0x61, 0x63, 0x74, 0x42, 0x3d, 0x5a, 0x3b,
	0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x44, 0x75, 0x62, 0x72, 0x6f,
	0x76, 0x45, 0x76, 0x61, 0x2f, 0x68, 0x69, 0x67, 0x68, 0x65, 0x72, 0x5f, 0x73, 0x65, 0x61, 0x72,
	0x63, 0x68, 0x2f, 0x62, 0x61, 0x63, 0x6b, 0x65, 0x6e, 0x64, 0x2f, 0x70, 0x6b, 0x67, 0x2f, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x73, 0x62, 0x06, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x33,
}

var (
	file_models_user2studorg_proto_rawDescOnce sync.Once
	file_models_user2studorg_proto_rawDescData = file_models_user2studorg_proto_rawDesc
)

func file_models_user2studorg_proto_rawDescGZIP() []byte {
	file_models_user2studorg_proto_rawDescOnce.Do(func() {
		file_models_user2studorg_proto_rawDescData = protoimpl.X.CompressGZIP(file_models_user2studorg_proto_rawDescData)
	})
	return file_models_user2studorg_proto_rawDescData
}

var file_models_user2studorg_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_models_user2studorg_proto_goTypes = []interface{}{
	(*User2Studorg)(nil),          // 0: user2studorg.User2Studorg
	(*UserID)(nil),                // 1: user.UserID
	(*StudorgID)(nil),             // 2: studorg.StudorgID
	(StudorgRole)(0),              // 3: studorg.StudorgRole
	(*timestamppb.Timestamp)(nil), // 4: google.protobuf.Timestamp
}
var file_models_user2studorg_proto_depIdxs = []int32{
	1, // 0: user2studorg.User2Studorg.userID:type_name -> user.UserID
	2, // 1: user2studorg.User2Studorg.studorgID:type_name -> studorg.StudorgID
	3, // 2: user2studorg.User2Studorg.role:type_name -> studorg.StudorgRole
	4, // 3: user2studorg.User2Studorg.admissionTime:type_name -> google.protobuf.Timestamp
	4, // [4:4] is the sub-list for method output_type
	4, // [4:4] is the sub-list for method input_type
	4, // [4:4] is the sub-list for extension type_name
	4, // [4:4] is the sub-list for extension extendee
	0, // [0:4] is the sub-list for field type_name
}

func init() { file_models_user2studorg_proto_init() }
func file_models_user2studorg_proto_init() {
	if File_models_user2studorg_proto != nil {
		return
	}
	file_models_user_proto_init()
	file_models_studorg_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_models_user2studorg_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*User2Studorg); i {
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
			RawDescriptor: file_models_user2studorg_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_models_user2studorg_proto_goTypes,
		DependencyIndexes: file_models_user2studorg_proto_depIdxs,
		MessageInfos:      file_models_user2studorg_proto_msgTypes,
	}.Build()
	File_models_user2studorg_proto = out.File
	file_models_user2studorg_proto_rawDesc = nil
	file_models_user2studorg_proto_goTypes = nil
	file_models_user2studorg_proto_depIdxs = nil
}