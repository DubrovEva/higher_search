// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.33.0
// 	protoc        v3.21.12
// source: models/participant.proto

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

type Participant struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id            string                 `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	UserID        *UserID                `protobuf:"bytes,2,opt,name=userID,proto3" json:"userID,omitempty"`
	StudorgID     *StudorgID             `protobuf:"bytes,3,opt,name=studorgID,proto3" json:"studorgID,omitempty"`
	UserInfo      *UserInfo              `protobuf:"bytes,4,opt,name=userInfo,proto3" json:"userInfo,omitempty"`
	Role          StudorgRole            `protobuf:"varint,5,opt,name=role,proto3,enum=studorg.StudorgRole" json:"role,omitempty"`
	AdmissionTime *timestamppb.Timestamp `protobuf:"bytes,6,opt,name=admissionTime,proto3" json:"admissionTime,omitempty"`
	ContactInfo   string                 `protobuf:"bytes,7,opt,name=contactInfo,proto3" json:"contactInfo,omitempty"`
	CustomRole    string                 `protobuf:"bytes,8,opt,name=customRole,proto3" json:"customRole,omitempty"`
	Info          string                 `protobuf:"bytes,9,opt,name=info,proto3" json:"info,omitempty"`
	IsContact     bool                   `protobuf:"varint,10,opt,name=isContact,proto3" json:"isContact,omitempty"`
}

func (x *Participant) Reset() {
	*x = Participant{}
	if protoimpl.UnsafeEnabled {
		mi := &file_models_participant_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Participant) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Participant) ProtoMessage() {}

func (x *Participant) ProtoReflect() protoreflect.Message {
	mi := &file_models_participant_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Participant.ProtoReflect.Descriptor instead.
func (*Participant) Descriptor() ([]byte, []int) {
	return file_models_participant_proto_rawDescGZIP(), []int{0}
}

func (x *Participant) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *Participant) GetUserID() *UserID {
	if x != nil {
		return x.UserID
	}
	return nil
}

func (x *Participant) GetStudorgID() *StudorgID {
	if x != nil {
		return x.StudorgID
	}
	return nil
}

func (x *Participant) GetUserInfo() *UserInfo {
	if x != nil {
		return x.UserInfo
	}
	return nil
}

func (x *Participant) GetRole() StudorgRole {
	if x != nil {
		return x.Role
	}
	return StudorgRole_OTHER_ROLE
}

func (x *Participant) GetAdmissionTime() *timestamppb.Timestamp {
	if x != nil {
		return x.AdmissionTime
	}
	return nil
}

func (x *Participant) GetContactInfo() string {
	if x != nil {
		return x.ContactInfo
	}
	return ""
}

func (x *Participant) GetCustomRole() string {
	if x != nil {
		return x.CustomRole
	}
	return ""
}

func (x *Participant) GetInfo() string {
	if x != nil {
		return x.Info
	}
	return ""
}

func (x *Participant) GetIsContact() bool {
	if x != nil {
		return x.IsContact
	}
	return false
}

type Participants struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Participants []*Participant `protobuf:"bytes,1,rep,name=participants,proto3" json:"participants,omitempty"`
}

func (x *Participants) Reset() {
	*x = Participants{}
	if protoimpl.UnsafeEnabled {
		mi := &file_models_participant_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Participants) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Participants) ProtoMessage() {}

func (x *Participants) ProtoReflect() protoreflect.Message {
	mi := &file_models_participant_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Participants.ProtoReflect.Descriptor instead.
func (*Participants) Descriptor() ([]byte, []int) {
	return file_models_participant_proto_rawDescGZIP(), []int{1}
}

func (x *Participants) GetParticipants() []*Participant {
	if x != nil {
		return x.Participants
	}
	return nil
}

var File_models_participant_proto protoreflect.FileDescriptor

var file_models_participant_proto_rawDesc = []byte{
	0x0a, 0x18, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x73, 0x2f, 0x70, 0x61, 0x72, 0x74, 0x69, 0x63, 0x69,
	0x70, 0x61, 0x6e, 0x74, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0b, 0x70, 0x61, 0x72, 0x74,
	0x69, 0x63, 0x69, 0x70, 0x61, 0x6e, 0x74, 0x1a, 0x1f, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61,
	0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x11, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x73,
	0x2f, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x14, 0x6d, 0x6f, 0x64,
	0x65, 0x6c, 0x73, 0x2f, 0x73, 0x74, 0x75, 0x64, 0x6f, 0x72, 0x67, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x22, 0x81, 0x03, 0x0a, 0x0b, 0x50, 0x61, 0x72, 0x74, 0x69, 0x63, 0x69, 0x70, 0x61, 0x6e,
	0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69,
	0x64, 0x12, 0x24, 0x0a, 0x06, 0x75, 0x73, 0x65, 0x72, 0x49, 0x44, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x0c, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x49, 0x44, 0x52,
	0x06, 0x75, 0x73, 0x65, 0x72, 0x49, 0x44, 0x12, 0x30, 0x0a, 0x09, 0x73, 0x74, 0x75, 0x64, 0x6f,
	0x72, 0x67, 0x49, 0x44, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x73, 0x74, 0x75,
	0x64, 0x6f, 0x72, 0x67, 0x2e, 0x53, 0x74, 0x75, 0x64, 0x6f, 0x72, 0x67, 0x49, 0x44, 0x52, 0x09,
	0x73, 0x74, 0x75, 0x64, 0x6f, 0x72, 0x67, 0x49, 0x44, 0x12, 0x2a, 0x0a, 0x08, 0x75, 0x73, 0x65,
	0x72, 0x49, 0x6e, 0x66, 0x6f, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x75, 0x73,
	0x65, 0x72, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x49, 0x6e, 0x66, 0x6f, 0x52, 0x08, 0x75, 0x73, 0x65,
	0x72, 0x49, 0x6e, 0x66, 0x6f, 0x12, 0x28, 0x0a, 0x04, 0x72, 0x6f, 0x6c, 0x65, 0x18, 0x05, 0x20,
	0x01, 0x28, 0x0e, 0x32, 0x14, 0x2e, 0x73, 0x74, 0x75, 0x64, 0x6f, 0x72, 0x67, 0x2e, 0x53, 0x74,
	0x75, 0x64, 0x6f, 0x72, 0x67, 0x52, 0x6f, 0x6c, 0x65, 0x52, 0x04, 0x72, 0x6f, 0x6c, 0x65, 0x12,
	0x40, 0x0a, 0x0d, 0x61, 0x64, 0x6d, 0x69, 0x73, 0x73, 0x69, 0x6f, 0x6e, 0x54, 0x69, 0x6d, 0x65,
	0x18, 0x06, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61,
	0x6d, 0x70, 0x52, 0x0d, 0x61, 0x64, 0x6d, 0x69, 0x73, 0x73, 0x69, 0x6f, 0x6e, 0x54, 0x69, 0x6d,
	0x65, 0x12, 0x20, 0x0a, 0x0b, 0x63, 0x6f, 0x6e, 0x74, 0x61, 0x63, 0x74, 0x49, 0x6e, 0x66, 0x6f,
	0x18, 0x07, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x63, 0x6f, 0x6e, 0x74, 0x61, 0x63, 0x74, 0x49,
	0x6e, 0x66, 0x6f, 0x12, 0x1e, 0x0a, 0x0a, 0x63, 0x75, 0x73, 0x74, 0x6f, 0x6d, 0x52, 0x6f, 0x6c,
	0x65, 0x18, 0x08, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0a, 0x63, 0x75, 0x73, 0x74, 0x6f, 0x6d, 0x52,
	0x6f, 0x6c, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x69, 0x6e, 0x66, 0x6f, 0x18, 0x09, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x04, 0x69, 0x6e, 0x66, 0x6f, 0x12, 0x1c, 0x0a, 0x09, 0x69, 0x73, 0x43, 0x6f, 0x6e,
	0x74, 0x61, 0x63, 0x74, 0x18, 0x0a, 0x20, 0x01, 0x28, 0x08, 0x52, 0x09, 0x69, 0x73, 0x43, 0x6f,
	0x6e, 0x74, 0x61, 0x63, 0x74, 0x22, 0x4c, 0x0a, 0x0c, 0x50, 0x61, 0x72, 0x74, 0x69, 0x63, 0x69,
	0x70, 0x61, 0x6e, 0x74, 0x73, 0x12, 0x3c, 0x0a, 0x0c, 0x70, 0x61, 0x72, 0x74, 0x69, 0x63, 0x69,
	0x70, 0x61, 0x6e, 0x74, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x18, 0x2e, 0x70, 0x61,
	0x72, 0x74, 0x69, 0x63, 0x69, 0x70, 0x61, 0x6e, 0x74, 0x2e, 0x50, 0x61, 0x72, 0x74, 0x69, 0x63,
	0x69, 0x70, 0x61, 0x6e, 0x74, 0x52, 0x0c, 0x70, 0x61, 0x72, 0x74, 0x69, 0x63, 0x69, 0x70, 0x61,
	0x6e, 0x74, 0x73, 0x42, 0x3d, 0x5a, 0x3b, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f,
	0x6d, 0x2f, 0x44, 0x75, 0x62, 0x72, 0x6f, 0x76, 0x45, 0x76, 0x61, 0x2f, 0x68, 0x69, 0x67, 0x68,
	0x65, 0x72, 0x5f, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x2f, 0x62, 0x61, 0x63, 0x6b, 0x65, 0x6e,
	0x64, 0x2f, 0x70, 0x6b, 0x67, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6d, 0x6f, 0x64, 0x65,
	0x6c, 0x73, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_models_participant_proto_rawDescOnce sync.Once
	file_models_participant_proto_rawDescData = file_models_participant_proto_rawDesc
)

func file_models_participant_proto_rawDescGZIP() []byte {
	file_models_participant_proto_rawDescOnce.Do(func() {
		file_models_participant_proto_rawDescData = protoimpl.X.CompressGZIP(file_models_participant_proto_rawDescData)
	})
	return file_models_participant_proto_rawDescData
}

var file_models_participant_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_models_participant_proto_goTypes = []interface{}{
	(*Participant)(nil),           // 0: participant.Participant
	(*Participants)(nil),          // 1: participant.Participants
	(*UserID)(nil),                // 2: user.UserID
	(*StudorgID)(nil),             // 3: studorg.StudorgID
	(*UserInfo)(nil),              // 4: user.UserInfo
	(StudorgRole)(0),              // 5: studorg.StudorgRole
	(*timestamppb.Timestamp)(nil), // 6: google.protobuf.Timestamp
}
var file_models_participant_proto_depIdxs = []int32{
	2, // 0: participant.Participant.userID:type_name -> user.UserID
	3, // 1: participant.Participant.studorgID:type_name -> studorg.StudorgID
	4, // 2: participant.Participant.userInfo:type_name -> user.UserInfo
	5, // 3: participant.Participant.role:type_name -> studorg.StudorgRole
	6, // 4: participant.Participant.admissionTime:type_name -> google.protobuf.Timestamp
	0, // 5: participant.Participants.participants:type_name -> participant.Participant
	6, // [6:6] is the sub-list for method output_type
	6, // [6:6] is the sub-list for method input_type
	6, // [6:6] is the sub-list for extension type_name
	6, // [6:6] is the sub-list for extension extendee
	0, // [0:6] is the sub-list for field type_name
}

func init() { file_models_participant_proto_init() }
func file_models_participant_proto_init() {
	if File_models_participant_proto != nil {
		return
	}
	file_models_user_proto_init()
	file_models_studorg_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_models_participant_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Participant); i {
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
		file_models_participant_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Participants); i {
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
			RawDescriptor: file_models_participant_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_models_participant_proto_goTypes,
		DependencyIndexes: file_models_participant_proto_depIdxs,
		MessageInfos:      file_models_participant_proto_msgTypes,
	}.Build()
	File_models_participant_proto = out.File
	file_models_participant_proto_rawDesc = nil
	file_models_participant_proto_goTypes = nil
	file_models_participant_proto_depIdxs = nil
}