// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.21.12
// source: api/router.proto

package api

import (
	context "context"
	models "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// RouterClient is the client API for Router service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type RouterClient interface {
	GetUser(ctx context.Context, in *models.UserID, opts ...grpc.CallOption) (*UserResponse, error)
	GetUsers(ctx context.Context, in *models.UserIDs, opts ...grpc.CallOption) (*UsersResponse, error)
	InsertUser(ctx context.Context, in *models.UserInfo, opts ...grpc.CallOption) (*UserResponse, error)
	UpdateUser(ctx context.Context, in *models.User, opts ...grpc.CallOption) (*UserResponse, error)
	AuthorizeUser(ctx context.Context, in *AuthorizationRequest, opts ...grpc.CallOption) (*UserIDResponse, error)
	IsAuth(ctx context.Context, in *WithoutParameters, opts ...grpc.CallOption) (*models.AuthInfo, error)
	Logout(ctx context.Context, in *WithoutParameters, opts ...grpc.CallOption) (*SuccessResponse, error)
	RegisterUser(ctx context.Context, in *RegistrationRequest, opts ...grpc.CallOption) (*UserIDResponse, error)
	GetAllStudorgs(ctx context.Context, in *WithoutParameters, opts ...grpc.CallOption) (*StudorgsResponse, error)
	GetUserStudorgs(ctx context.Context, in *WithoutParameters, opts ...grpc.CallOption) (*StudorgsResponse, error)
	GetStudorg(ctx context.Context, in *models.StudorgID, opts ...grpc.CallOption) (*StudorgResponse, error)
	InsertStudorg(ctx context.Context, in *models.StudorgInfo, opts ...grpc.CallOption) (*StudorgIDResponse, error)
	UpdateStudorg(ctx context.Context, in *models.Studorg, opts ...grpc.CallOption) (*StudorgResponse, error)
	AddUserToStudorg(ctx context.Context, in *models.StudorgID, opts ...grpc.CallOption) (*SuccessResponse, error)
	CheckUserInStudorg(ctx context.Context, in *models.StudorgID, opts ...grpc.CallOption) (*SuccessResponse, error)
	DeleteUserFromStudorg(ctx context.Context, in *models.StudorgID, opts ...grpc.CallOption) (*SuccessResponse, error)
	UpdateUserInStudorg(ctx context.Context, in *UserToStudorg, opts ...grpc.CallOption) (*SuccessResponse, error)
	GetStudorgUsersNumber(ctx context.Context, in *models.StudorgID, opts ...grpc.CallOption) (*NumberResponse, error)
	GetUserStudorgsNumber(ctx context.Context, in *models.UserID, opts ...grpc.CallOption) (*NumberResponse, error)
}

type routerClient struct {
	cc grpc.ClientConnInterface
}

func NewRouterClient(cc grpc.ClientConnInterface) RouterClient {
	return &routerClient{cc}
}

func (c *routerClient) GetUser(ctx context.Context, in *models.UserID, opts ...grpc.CallOption) (*UserResponse, error) {
	out := new(UserResponse)
	err := c.cc.Invoke(ctx, "/router.Router/GetUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) GetUsers(ctx context.Context, in *models.UserIDs, opts ...grpc.CallOption) (*UsersResponse, error) {
	out := new(UsersResponse)
	err := c.cc.Invoke(ctx, "/router.Router/GetUsers", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) InsertUser(ctx context.Context, in *models.UserInfo, opts ...grpc.CallOption) (*UserResponse, error) {
	out := new(UserResponse)
	err := c.cc.Invoke(ctx, "/router.Router/InsertUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) UpdateUser(ctx context.Context, in *models.User, opts ...grpc.CallOption) (*UserResponse, error) {
	out := new(UserResponse)
	err := c.cc.Invoke(ctx, "/router.Router/UpdateUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) AuthorizeUser(ctx context.Context, in *AuthorizationRequest, opts ...grpc.CallOption) (*UserIDResponse, error) {
	out := new(UserIDResponse)
	err := c.cc.Invoke(ctx, "/router.Router/AuthorizeUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) IsAuth(ctx context.Context, in *WithoutParameters, opts ...grpc.CallOption) (*models.AuthInfo, error) {
	out := new(models.AuthInfo)
	err := c.cc.Invoke(ctx, "/router.Router/IsAuth", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) Logout(ctx context.Context, in *WithoutParameters, opts ...grpc.CallOption) (*SuccessResponse, error) {
	out := new(SuccessResponse)
	err := c.cc.Invoke(ctx, "/router.Router/Logout", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) RegisterUser(ctx context.Context, in *RegistrationRequest, opts ...grpc.CallOption) (*UserIDResponse, error) {
	out := new(UserIDResponse)
	err := c.cc.Invoke(ctx, "/router.Router/RegisterUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) GetAllStudorgs(ctx context.Context, in *WithoutParameters, opts ...grpc.CallOption) (*StudorgsResponse, error) {
	out := new(StudorgsResponse)
	err := c.cc.Invoke(ctx, "/router.Router/GetAllStudorgs", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) GetUserStudorgs(ctx context.Context, in *WithoutParameters, opts ...grpc.CallOption) (*StudorgsResponse, error) {
	out := new(StudorgsResponse)
	err := c.cc.Invoke(ctx, "/router.Router/GetUserStudorgs", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) GetStudorg(ctx context.Context, in *models.StudorgID, opts ...grpc.CallOption) (*StudorgResponse, error) {
	out := new(StudorgResponse)
	err := c.cc.Invoke(ctx, "/router.Router/GetStudorg", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) InsertStudorg(ctx context.Context, in *models.StudorgInfo, opts ...grpc.CallOption) (*StudorgIDResponse, error) {
	out := new(StudorgIDResponse)
	err := c.cc.Invoke(ctx, "/router.Router/InsertStudorg", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) UpdateStudorg(ctx context.Context, in *models.Studorg, opts ...grpc.CallOption) (*StudorgResponse, error) {
	out := new(StudorgResponse)
	err := c.cc.Invoke(ctx, "/router.Router/UpdateStudorg", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) AddUserToStudorg(ctx context.Context, in *models.StudorgID, opts ...grpc.CallOption) (*SuccessResponse, error) {
	out := new(SuccessResponse)
	err := c.cc.Invoke(ctx, "/router.Router/AddUserToStudorg", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) CheckUserInStudorg(ctx context.Context, in *models.StudorgID, opts ...grpc.CallOption) (*SuccessResponse, error) {
	out := new(SuccessResponse)
	err := c.cc.Invoke(ctx, "/router.Router/CheckUserInStudorg", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) DeleteUserFromStudorg(ctx context.Context, in *models.StudorgID, opts ...grpc.CallOption) (*SuccessResponse, error) {
	out := new(SuccessResponse)
	err := c.cc.Invoke(ctx, "/router.Router/DeleteUserFromStudorg", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) UpdateUserInStudorg(ctx context.Context, in *UserToStudorg, opts ...grpc.CallOption) (*SuccessResponse, error) {
	out := new(SuccessResponse)
	err := c.cc.Invoke(ctx, "/router.Router/UpdateUserInStudorg", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) GetStudorgUsersNumber(ctx context.Context, in *models.StudorgID, opts ...grpc.CallOption) (*NumberResponse, error) {
	out := new(NumberResponse)
	err := c.cc.Invoke(ctx, "/router.Router/GetStudorgUsersNumber", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *routerClient) GetUserStudorgsNumber(ctx context.Context, in *models.UserID, opts ...grpc.CallOption) (*NumberResponse, error) {
	out := new(NumberResponse)
	err := c.cc.Invoke(ctx, "/router.Router/GetUserStudorgsNumber", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// RouterServer is the server API for Router service.
// All implementations must embed UnimplementedRouterServer
// for forward compatibility
type RouterServer interface {
	GetUser(context.Context, *models.UserID) (*UserResponse, error)
	GetUsers(context.Context, *models.UserIDs) (*UsersResponse, error)
	InsertUser(context.Context, *models.UserInfo) (*UserResponse, error)
	UpdateUser(context.Context, *models.User) (*UserResponse, error)
	AuthorizeUser(context.Context, *AuthorizationRequest) (*UserIDResponse, error)
	IsAuth(context.Context, *WithoutParameters) (*models.AuthInfo, error)
	Logout(context.Context, *WithoutParameters) (*SuccessResponse, error)
	RegisterUser(context.Context, *RegistrationRequest) (*UserIDResponse, error)
	GetAllStudorgs(context.Context, *WithoutParameters) (*StudorgsResponse, error)
	GetUserStudorgs(context.Context, *WithoutParameters) (*StudorgsResponse, error)
	GetStudorg(context.Context, *models.StudorgID) (*StudorgResponse, error)
	InsertStudorg(context.Context, *models.StudorgInfo) (*StudorgIDResponse, error)
	UpdateStudorg(context.Context, *models.Studorg) (*StudorgResponse, error)
	AddUserToStudorg(context.Context, *models.StudorgID) (*SuccessResponse, error)
	CheckUserInStudorg(context.Context, *models.StudorgID) (*SuccessResponse, error)
	DeleteUserFromStudorg(context.Context, *models.StudorgID) (*SuccessResponse, error)
	UpdateUserInStudorg(context.Context, *UserToStudorg) (*SuccessResponse, error)
	GetStudorgUsersNumber(context.Context, *models.StudorgID) (*NumberResponse, error)
	GetUserStudorgsNumber(context.Context, *models.UserID) (*NumberResponse, error)
	mustEmbedUnimplementedRouterServer()
}

// UnimplementedRouterServer must be embedded to have forward compatible implementations.
type UnimplementedRouterServer struct {
}

func (UnimplementedRouterServer) GetUser(context.Context, *models.UserID) (*UserResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetUser not implemented")
}
func (UnimplementedRouterServer) GetUsers(context.Context, *models.UserIDs) (*UsersResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetUsers not implemented")
}
func (UnimplementedRouterServer) InsertUser(context.Context, *models.UserInfo) (*UserResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method InsertUser not implemented")
}
func (UnimplementedRouterServer) UpdateUser(context.Context, *models.User) (*UserResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateUser not implemented")
}
func (UnimplementedRouterServer) AuthorizeUser(context.Context, *AuthorizationRequest) (*UserIDResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AuthorizeUser not implemented")
}
func (UnimplementedRouterServer) IsAuth(context.Context, *WithoutParameters) (*models.AuthInfo, error) {
	return nil, status.Errorf(codes.Unimplemented, "method IsAuth not implemented")
}
func (UnimplementedRouterServer) Logout(context.Context, *WithoutParameters) (*SuccessResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Logout not implemented")
}
func (UnimplementedRouterServer) RegisterUser(context.Context, *RegistrationRequest) (*UserIDResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RegisterUser not implemented")
}
func (UnimplementedRouterServer) GetAllStudorgs(context.Context, *WithoutParameters) (*StudorgsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetAllStudorgs not implemented")
}
func (UnimplementedRouterServer) GetUserStudorgs(context.Context, *WithoutParameters) (*StudorgsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetUserStudorgs not implemented")
}
func (UnimplementedRouterServer) GetStudorg(context.Context, *models.StudorgID) (*StudorgResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetStudorg not implemented")
}
func (UnimplementedRouterServer) InsertStudorg(context.Context, *models.StudorgInfo) (*StudorgIDResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method InsertStudorg not implemented")
}
func (UnimplementedRouterServer) UpdateStudorg(context.Context, *models.Studorg) (*StudorgResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateStudorg not implemented")
}
func (UnimplementedRouterServer) AddUserToStudorg(context.Context, *models.StudorgID) (*SuccessResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AddUserToStudorg not implemented")
}
func (UnimplementedRouterServer) CheckUserInStudorg(context.Context, *models.StudorgID) (*SuccessResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CheckUserInStudorg not implemented")
}
func (UnimplementedRouterServer) DeleteUserFromStudorg(context.Context, *models.StudorgID) (*SuccessResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteUserFromStudorg not implemented")
}
func (UnimplementedRouterServer) UpdateUserInStudorg(context.Context, *UserToStudorg) (*SuccessResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateUserInStudorg not implemented")
}
func (UnimplementedRouterServer) GetStudorgUsersNumber(context.Context, *models.StudorgID) (*NumberResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetStudorgUsersNumber not implemented")
}
func (UnimplementedRouterServer) GetUserStudorgsNumber(context.Context, *models.UserID) (*NumberResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetUserStudorgsNumber not implemented")
}
func (UnimplementedRouterServer) mustEmbedUnimplementedRouterServer() {}

// UnsafeRouterServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to RouterServer will
// result in compilation errors.
type UnsafeRouterServer interface {
	mustEmbedUnimplementedRouterServer()
}

func RegisterRouterServer(s grpc.ServiceRegistrar, srv RouterServer) {
	s.RegisterService(&Router_ServiceDesc, srv)
}

func _Router_GetUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(models.UserID)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).GetUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/GetUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).GetUser(ctx, req.(*models.UserID))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_GetUsers_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(models.UserIDs)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).GetUsers(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/GetUsers",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).GetUsers(ctx, req.(*models.UserIDs))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_InsertUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(models.UserInfo)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).InsertUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/InsertUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).InsertUser(ctx, req.(*models.UserInfo))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_UpdateUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(models.User)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).UpdateUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/UpdateUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).UpdateUser(ctx, req.(*models.User))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_AuthorizeUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AuthorizationRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).AuthorizeUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/AuthorizeUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).AuthorizeUser(ctx, req.(*AuthorizationRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_IsAuth_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(WithoutParameters)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).IsAuth(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/IsAuth",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).IsAuth(ctx, req.(*WithoutParameters))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_Logout_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(WithoutParameters)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).Logout(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/Logout",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).Logout(ctx, req.(*WithoutParameters))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_RegisterUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RegistrationRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).RegisterUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/RegisterUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).RegisterUser(ctx, req.(*RegistrationRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_GetAllStudorgs_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(WithoutParameters)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).GetAllStudorgs(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/GetAllStudorgs",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).GetAllStudorgs(ctx, req.(*WithoutParameters))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_GetUserStudorgs_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(WithoutParameters)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).GetUserStudorgs(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/GetUserStudorgs",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).GetUserStudorgs(ctx, req.(*WithoutParameters))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_GetStudorg_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(models.StudorgID)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).GetStudorg(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/GetStudorg",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).GetStudorg(ctx, req.(*models.StudorgID))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_InsertStudorg_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(models.StudorgInfo)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).InsertStudorg(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/InsertStudorg",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).InsertStudorg(ctx, req.(*models.StudorgInfo))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_UpdateStudorg_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(models.Studorg)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).UpdateStudorg(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/UpdateStudorg",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).UpdateStudorg(ctx, req.(*models.Studorg))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_AddUserToStudorg_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(models.StudorgID)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).AddUserToStudorg(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/AddUserToStudorg",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).AddUserToStudorg(ctx, req.(*models.StudorgID))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_CheckUserInStudorg_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(models.StudorgID)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).CheckUserInStudorg(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/CheckUserInStudorg",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).CheckUserInStudorg(ctx, req.(*models.StudorgID))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_DeleteUserFromStudorg_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(models.StudorgID)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).DeleteUserFromStudorg(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/DeleteUserFromStudorg",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).DeleteUserFromStudorg(ctx, req.(*models.StudorgID))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_UpdateUserInStudorg_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UserToStudorg)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).UpdateUserInStudorg(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/UpdateUserInStudorg",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).UpdateUserInStudorg(ctx, req.(*UserToStudorg))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_GetStudorgUsersNumber_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(models.StudorgID)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).GetStudorgUsersNumber(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/GetStudorgUsersNumber",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).GetStudorgUsersNumber(ctx, req.(*models.StudorgID))
	}
	return interceptor(ctx, in, info, handler)
}

func _Router_GetUserStudorgsNumber_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(models.UserID)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RouterServer).GetUserStudorgsNumber(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/router.Router/GetUserStudorgsNumber",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RouterServer).GetUserStudorgsNumber(ctx, req.(*models.UserID))
	}
	return interceptor(ctx, in, info, handler)
}

// Router_ServiceDesc is the grpc.ServiceDesc for Router service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Router_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "router.Router",
	HandlerType: (*RouterServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetUser",
			Handler:    _Router_GetUser_Handler,
		},
		{
			MethodName: "GetUsers",
			Handler:    _Router_GetUsers_Handler,
		},
		{
			MethodName: "InsertUser",
			Handler:    _Router_InsertUser_Handler,
		},
		{
			MethodName: "UpdateUser",
			Handler:    _Router_UpdateUser_Handler,
		},
		{
			MethodName: "AuthorizeUser",
			Handler:    _Router_AuthorizeUser_Handler,
		},
		{
			MethodName: "IsAuth",
			Handler:    _Router_IsAuth_Handler,
		},
		{
			MethodName: "Logout",
			Handler:    _Router_Logout_Handler,
		},
		{
			MethodName: "RegisterUser",
			Handler:    _Router_RegisterUser_Handler,
		},
		{
			MethodName: "GetAllStudorgs",
			Handler:    _Router_GetAllStudorgs_Handler,
		},
		{
			MethodName: "GetUserStudorgs",
			Handler:    _Router_GetUserStudorgs_Handler,
		},
		{
			MethodName: "GetStudorg",
			Handler:    _Router_GetStudorg_Handler,
		},
		{
			MethodName: "InsertStudorg",
			Handler:    _Router_InsertStudorg_Handler,
		},
		{
			MethodName: "UpdateStudorg",
			Handler:    _Router_UpdateStudorg_Handler,
		},
		{
			MethodName: "AddUserToStudorg",
			Handler:    _Router_AddUserToStudorg_Handler,
		},
		{
			MethodName: "CheckUserInStudorg",
			Handler:    _Router_CheckUserInStudorg_Handler,
		},
		{
			MethodName: "DeleteUserFromStudorg",
			Handler:    _Router_DeleteUserFromStudorg_Handler,
		},
		{
			MethodName: "UpdateUserInStudorg",
			Handler:    _Router_UpdateUserInStudorg_Handler,
		},
		{
			MethodName: "GetStudorgUsersNumber",
			Handler:    _Router_GetStudorgUsersNumber_Handler,
		},
		{
			MethodName: "GetUserStudorgsNumber",
			Handler:    _Router_GetUserStudorgsNumber_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "api/router.proto",
}
