// @generated by protobuf-ts 2.9.4 with parameter long_type_string
// @generated from protobuf file "api/router.proto" (package "router", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { Router } from "./router";
import type { UsersNumberResponse } from "./router";
import type { UserToStudorg } from "./router";
import type { Studorg } from "../models/studorg";
import type { StudorgIDResponse } from "./router";
import type { StudorgInfo } from "../models/studorg";
import type { StudorgResponse } from "./router";
import type { StudorgID } from "../models/studorg";
import type { StudorgsResponse } from "./router";
import type { RegistrationRequest } from "./router";
import type { SuccessResponse } from "./router";
import type { AuthInfo } from "../models/user";
import type { WithoutParameters } from "./router";
import type { UserIDResponse } from "./router";
import type { AuthorizationRequest } from "./router";
import type { User } from "../models/user";
import type { UserInfo } from "../models/user";
import type { UsersResponse } from "./router";
import type { UserIDs } from "../models/user";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { UserResponse } from "./router";
import type { UserID } from "../models/user";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service router.Router
 */
export interface IRouterClient {
    /**
     * @generated from protobuf rpc: GetUser(user.UserID) returns (router.UserResponse);
     */
    getUser(input: UserID, options?: RpcOptions): UnaryCall<UserID, UserResponse>;
    /**
     * @generated from protobuf rpc: GetUsers(user.UserIDs) returns (router.UsersResponse);
     */
    getUsers(input: UserIDs, options?: RpcOptions): UnaryCall<UserIDs, UsersResponse>;
    /**
     * @generated from protobuf rpc: InsertUser(user.UserInfo) returns (router.UserResponse);
     */
    insertUser(input: UserInfo, options?: RpcOptions): UnaryCall<UserInfo, UserResponse>;
    /**
     * @generated from protobuf rpc: UpdateUser(user.User) returns (router.UserResponse);
     */
    updateUser(input: User, options?: RpcOptions): UnaryCall<User, UserResponse>;
    /**
     * @generated from protobuf rpc: AuthorizeUser(router.AuthorizationRequest) returns (router.UserIDResponse);
     */
    authorizeUser(input: AuthorizationRequest, options?: RpcOptions): UnaryCall<AuthorizationRequest, UserIDResponse>;
    /**
     * @generated from protobuf rpc: IsAuth(router.WithoutParameters) returns (user.AuthInfo);
     */
    isAuth(input: WithoutParameters, options?: RpcOptions): UnaryCall<WithoutParameters, AuthInfo>;
    /**
     * @generated from protobuf rpc: Logout(router.WithoutParameters) returns (router.SuccessResponse);
     */
    logout(input: WithoutParameters, options?: RpcOptions): UnaryCall<WithoutParameters, SuccessResponse>;
    /**
     * @generated from protobuf rpc: RegisterUser(router.RegistrationRequest) returns (router.UserIDResponse);
     */
    registerUser(input: RegistrationRequest, options?: RpcOptions): UnaryCall<RegistrationRequest, UserIDResponse>;
    /**
     * @generated from protobuf rpc: GetAllStudorgs(router.WithoutParameters) returns (router.StudorgsResponse);
     */
    getAllStudorgs(input: WithoutParameters, options?: RpcOptions): UnaryCall<WithoutParameters, StudorgsResponse>;
    /**
     * @generated from protobuf rpc: GetUserStudorgs(router.WithoutParameters) returns (router.StudorgsResponse);
     */
    getUserStudorgs(input: WithoutParameters, options?: RpcOptions): UnaryCall<WithoutParameters, StudorgsResponse>;
    /**
     * @generated from protobuf rpc: GetStudorg(studorg.StudorgID) returns (router.StudorgResponse);
     */
    getStudorg(input: StudorgID, options?: RpcOptions): UnaryCall<StudorgID, StudorgResponse>;
    /**
     * @generated from protobuf rpc: InsertStudorg(studorg.StudorgInfo) returns (router.StudorgIDResponse);
     */
    insertStudorg(input: StudorgInfo, options?: RpcOptions): UnaryCall<StudorgInfo, StudorgIDResponse>;
    /**
     * @generated from protobuf rpc: UpdateStudorg(studorg.Studorg) returns (router.StudorgResponse);
     */
    updateStudorg(input: Studorg, options?: RpcOptions): UnaryCall<Studorg, StudorgResponse>;
    /**
     * @generated from protobuf rpc: AddUserToStudorg(studorg.StudorgID) returns (router.SuccessResponse);
     */
    addUserToStudorg(input: StudorgID, options?: RpcOptions): UnaryCall<StudorgID, SuccessResponse>;
    /**
     * @generated from protobuf rpc: CheckUserInStudorg(studorg.StudorgID) returns (router.SuccessResponse);
     */
    checkUserInStudorg(input: StudorgID, options?: RpcOptions): UnaryCall<StudorgID, SuccessResponse>;
    /**
     * @generated from protobuf rpc: DeleteUserFromStudorg(studorg.StudorgID) returns (router.SuccessResponse);
     */
    deleteUserFromStudorg(input: StudorgID, options?: RpcOptions): UnaryCall<StudorgID, SuccessResponse>;
    /**
     * @generated from protobuf rpc: UpdateUserInStudorg(router.UserToStudorg) returns (router.SuccessResponse);
     */
    updateUserInStudorg(input: UserToStudorg, options?: RpcOptions): UnaryCall<UserToStudorg, SuccessResponse>;
    /**
     * @generated from protobuf rpc: GetStudorgUsersNumber(studorg.StudorgID) returns (router.UsersNumberResponse);
     */
    getStudorgUsersNumber(input: StudorgID, options?: RpcOptions): UnaryCall<StudorgID, UsersNumberResponse>;
}
/**
 * @generated from protobuf service router.Router
 */
export class RouterClient implements IRouterClient, ServiceInfo {
    typeName = Router.typeName;
    methods = Router.methods;
    options = Router.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: GetUser(user.UserID) returns (router.UserResponse);
     */
    getUser(input: UserID, options?: RpcOptions): UnaryCall<UserID, UserResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<UserID, UserResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetUsers(user.UserIDs) returns (router.UsersResponse);
     */
    getUsers(input: UserIDs, options?: RpcOptions): UnaryCall<UserIDs, UsersResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<UserIDs, UsersResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: InsertUser(user.UserInfo) returns (router.UserResponse);
     */
    insertUser(input: UserInfo, options?: RpcOptions): UnaryCall<UserInfo, UserResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UserInfo, UserResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UpdateUser(user.User) returns (router.UserResponse);
     */
    updateUser(input: User, options?: RpcOptions): UnaryCall<User, UserResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<User, UserResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: AuthorizeUser(router.AuthorizationRequest) returns (router.UserIDResponse);
     */
    authorizeUser(input: AuthorizationRequest, options?: RpcOptions): UnaryCall<AuthorizationRequest, UserIDResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<AuthorizationRequest, UserIDResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: IsAuth(router.WithoutParameters) returns (user.AuthInfo);
     */
    isAuth(input: WithoutParameters, options?: RpcOptions): UnaryCall<WithoutParameters, AuthInfo> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<WithoutParameters, AuthInfo>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: Logout(router.WithoutParameters) returns (router.SuccessResponse);
     */
    logout(input: WithoutParameters, options?: RpcOptions): UnaryCall<WithoutParameters, SuccessResponse> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<WithoutParameters, SuccessResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: RegisterUser(router.RegistrationRequest) returns (router.UserIDResponse);
     */
    registerUser(input: RegistrationRequest, options?: RpcOptions): UnaryCall<RegistrationRequest, UserIDResponse> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<RegistrationRequest, UserIDResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetAllStudorgs(router.WithoutParameters) returns (router.StudorgsResponse);
     */
    getAllStudorgs(input: WithoutParameters, options?: RpcOptions): UnaryCall<WithoutParameters, StudorgsResponse> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<WithoutParameters, StudorgsResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetUserStudorgs(router.WithoutParameters) returns (router.StudorgsResponse);
     */
    getUserStudorgs(input: WithoutParameters, options?: RpcOptions): UnaryCall<WithoutParameters, StudorgsResponse> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<WithoutParameters, StudorgsResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetStudorg(studorg.StudorgID) returns (router.StudorgResponse);
     */
    getStudorg(input: StudorgID, options?: RpcOptions): UnaryCall<StudorgID, StudorgResponse> {
        const method = this.methods[10], opt = this._transport.mergeOptions(options);
        return stackIntercept<StudorgID, StudorgResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: InsertStudorg(studorg.StudorgInfo) returns (router.StudorgIDResponse);
     */
    insertStudorg(input: StudorgInfo, options?: RpcOptions): UnaryCall<StudorgInfo, StudorgIDResponse> {
        const method = this.methods[11], opt = this._transport.mergeOptions(options);
        return stackIntercept<StudorgInfo, StudorgIDResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UpdateStudorg(studorg.Studorg) returns (router.StudorgResponse);
     */
    updateStudorg(input: Studorg, options?: RpcOptions): UnaryCall<Studorg, StudorgResponse> {
        const method = this.methods[12], opt = this._transport.mergeOptions(options);
        return stackIntercept<Studorg, StudorgResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: AddUserToStudorg(studorg.StudorgID) returns (router.SuccessResponse);
     */
    addUserToStudorg(input: StudorgID, options?: RpcOptions): UnaryCall<StudorgID, SuccessResponse> {
        const method = this.methods[13], opt = this._transport.mergeOptions(options);
        return stackIntercept<StudorgID, SuccessResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CheckUserInStudorg(studorg.StudorgID) returns (router.SuccessResponse);
     */
    checkUserInStudorg(input: StudorgID, options?: RpcOptions): UnaryCall<StudorgID, SuccessResponse> {
        const method = this.methods[14], opt = this._transport.mergeOptions(options);
        return stackIntercept<StudorgID, SuccessResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DeleteUserFromStudorg(studorg.StudorgID) returns (router.SuccessResponse);
     */
    deleteUserFromStudorg(input: StudorgID, options?: RpcOptions): UnaryCall<StudorgID, SuccessResponse> {
        const method = this.methods[15], opt = this._transport.mergeOptions(options);
        return stackIntercept<StudorgID, SuccessResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UpdateUserInStudorg(router.UserToStudorg) returns (router.SuccessResponse);
     */
    updateUserInStudorg(input: UserToStudorg, options?: RpcOptions): UnaryCall<UserToStudorg, SuccessResponse> {
        const method = this.methods[16], opt = this._transport.mergeOptions(options);
        return stackIntercept<UserToStudorg, SuccessResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetStudorgUsersNumber(studorg.StudorgID) returns (router.UsersNumberResponse);
     */
    getStudorgUsersNumber(input: StudorgID, options?: RpcOptions): UnaryCall<StudorgID, UsersNumberResponse> {
        const method = this.methods[17], opt = this._transport.mergeOptions(options);
        return stackIntercept<StudorgID, UsersNumberResponse>("unary", this._transport, method, opt, input);
    }
}
