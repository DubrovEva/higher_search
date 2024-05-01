// @generated by protobuf-ts 2.9.4 with parameter long_type_string
// @generated from protobuf file "api/router.proto" (package "router", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { Router } from "./router";
import type { UsersNumberResponse } from "./router";
import type { Studorg } from "../models/studorg";
import type { StudorgInfo } from "../models/studorg";
import type { StudorgResponse } from "./router";
import type { StudorgID } from "../models/studorg";
import type { StudorgsResponse } from "./router";
import type { UserStudorgs } from "../models/studorg";
import type { ValidationResponse } from "./router";
import type { WithoutParameters } from "./router";
import type { RegistrationRequest } from "./router";
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
     * @generated from protobuf rpc: AuthorizeUser(router.AuthorizationRequest) returns (router.UserResponse);
     */
    authorizeUser(input: AuthorizationRequest, options?: RpcOptions): UnaryCall<AuthorizationRequest, UserResponse>;
    /**
     * @generated from protobuf rpc: RegisterUser(router.RegistrationRequest) returns (router.UserResponse);
     */
    registerUser(input: RegistrationRequest, options?: RpcOptions): UnaryCall<RegistrationRequest, UserResponse>;
    /**
     * @generated from protobuf rpc: ValidateAuthorization(router.WithoutParameters) returns (router.ValidationResponse);
     */
    validateAuthorization(input: WithoutParameters, options?: RpcOptions): UnaryCall<WithoutParameters, ValidationResponse>;
    /**
     * @generated from protobuf rpc: GetUserStudorgs(user.UserID) returns (studorg.UserStudorgs);
     */
    getUserStudorgs(input: UserID, options?: RpcOptions): UnaryCall<UserID, UserStudorgs>;
    /**
     * @generated from protobuf rpc: GetAllStudorgs(router.WithoutParameters) returns (router.StudorgsResponse);
     */
    getAllStudorgs(input: WithoutParameters, options?: RpcOptions): UnaryCall<WithoutParameters, StudorgsResponse>;
    /**
     * @generated from protobuf rpc: GetStudorg(studorg.StudorgID) returns (router.StudorgResponse);
     */
    getStudorg(input: StudorgID, options?: RpcOptions): UnaryCall<StudorgID, StudorgResponse>;
    /**
     * @generated from protobuf rpc: InsertStudorg(studorg.StudorgInfo) returns (router.StudorgResponse);
     */
    insertStudorg(input: StudorgInfo, options?: RpcOptions): UnaryCall<StudorgInfo, StudorgResponse>;
    /**
     * @generated from protobuf rpc: UpdateStudorg(studorg.Studorg) returns (router.StudorgResponse);
     */
    updateStudorg(input: Studorg, options?: RpcOptions): UnaryCall<Studorg, StudorgResponse>;
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
     * @generated from protobuf rpc: AuthorizeUser(router.AuthorizationRequest) returns (router.UserResponse);
     */
    authorizeUser(input: AuthorizationRequest, options?: RpcOptions): UnaryCall<AuthorizationRequest, UserResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<AuthorizationRequest, UserResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: RegisterUser(router.RegistrationRequest) returns (router.UserResponse);
     */
    registerUser(input: RegistrationRequest, options?: RpcOptions): UnaryCall<RegistrationRequest, UserResponse> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<RegistrationRequest, UserResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ValidateAuthorization(router.WithoutParameters) returns (router.ValidationResponse);
     */
    validateAuthorization(input: WithoutParameters, options?: RpcOptions): UnaryCall<WithoutParameters, ValidationResponse> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<WithoutParameters, ValidationResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetUserStudorgs(user.UserID) returns (studorg.UserStudorgs);
     */
    getUserStudorgs(input: UserID, options?: RpcOptions): UnaryCall<UserID, UserStudorgs> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<UserID, UserStudorgs>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetAllStudorgs(router.WithoutParameters) returns (router.StudorgsResponse);
     */
    getAllStudorgs(input: WithoutParameters, options?: RpcOptions): UnaryCall<WithoutParameters, StudorgsResponse> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<WithoutParameters, StudorgsResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetStudorg(studorg.StudorgID) returns (router.StudorgResponse);
     */
    getStudorg(input: StudorgID, options?: RpcOptions): UnaryCall<StudorgID, StudorgResponse> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<StudorgID, StudorgResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: InsertStudorg(studorg.StudorgInfo) returns (router.StudorgResponse);
     */
    insertStudorg(input: StudorgInfo, options?: RpcOptions): UnaryCall<StudorgInfo, StudorgResponse> {
        const method = this.methods[10], opt = this._transport.mergeOptions(options);
        return stackIntercept<StudorgInfo, StudorgResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UpdateStudorg(studorg.Studorg) returns (router.StudorgResponse);
     */
    updateStudorg(input: Studorg, options?: RpcOptions): UnaryCall<Studorg, StudorgResponse> {
        const method = this.methods[11], opt = this._transport.mergeOptions(options);
        return stackIntercept<Studorg, StudorgResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetStudorgUsersNumber(studorg.StudorgID) returns (router.UsersNumberResponse);
     */
    getStudorgUsersNumber(input: StudorgID, options?: RpcOptions): UnaryCall<StudorgID, UsersNumberResponse> {
        const method = this.methods[12], opt = this._transport.mergeOptions(options);
        return stackIntercept<StudorgID, UsersNumberResponse>("unary", this._transport, method, opt, input);
    }
}
