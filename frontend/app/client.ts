import {RouterClient} from "~/proto/api/router_client";
import {GrpcWebFetchTransport} from "@protobuf-ts/grpcweb-transport"
import {StudorgID, StudorgInfo} from "~/proto/models/studorg";
import {AuthorizationRequest, RegistrationRequest, WithoutParameters} from "~/proto/api/router";
import {User, UserID, UserInfo} from "~/proto/models/user";

export default class Client {
    private static instance?: Client;
    private router: RouterClient;

    private constructor() {
        this.router = new RouterClient(
            new GrpcWebFetchTransport({
                baseUrl: '/',
                fetchInit: {
                    credentials: "same-origin",
                }
            })
        );
    }

    static getInstance() {
        if (!Client.instance) {
            Client.instance = new Client();
        }
        return Client.instance;
    }

    async getStudorgInfo(studorgID: StudorgID) {
        const response = await this.router.getStudorg(studorgID).response
        if (response.response.oneofKind == "studorg") {
            return response.response.studorg.studorgInfo
        }
        // if (response.response.oneofKind == "err") {
        //     throw response.response.err
        // }
        // throw "unknown response"
        // todo: обработка ошибок
    }

    async getUserInfo(userID: UserID) {
        const response = await this.router.getUser(userID).response
        if (response.response.oneofKind == "user") {
            return response.response.user.userInfo
        }
        // if (response.response.oneofKind == "err") {
        //     throw response.response.err
        // }
        // throw "unknown response"
        // todo: обработка ошибок
    }

    async updateUserInfo(user: User) {
        const response = await this.router.updateUser(user).response
        if (response.response.oneofKind == "user") {
            return response.response.user
        }
        // if (response.response.oneofKind == "err") {
        //     throw response.response.err
        // }
        // throw "unknown response"
        // todo: обработка ошибок
    }

    async getAllStudorgs() {
        const request = WithoutParameters.create()
        const response = await this.router.getAllStudorgs(request).response
        if (response.response.oneofKind == "studorgs") {
            return response.response.studorgs.studorgs
        }
        // todo: обработка ошибок
    }

    async isAuthorized() {
        const response = await this.router.validateAuthorization(WithoutParameters.create()).response
        if (response.response.oneofKind == "success") {
            return response.response.success
        }
        // todo: обработка ошибок
    }

    async createStudorg(studorgInfo: StudorgInfo) {
        await this.router.insertStudorg(studorgInfo).response
        // todo: обработка ошибок
    }

    async usersNumber(studorgID: StudorgID) {
        const response = await this.router.getStudorgUsersNumber(studorgID).response

        if (response.response.oneofKind == "number") {
            return response.response.number
        }
        // todo: обработка ошибок
    }

    async authorize(authorizationRequest: AuthorizationRequest) {
        const response = await this.router.authorizeUser(authorizationRequest).response

        if (response.response.oneofKind == "userID") {
            return response.response.userID
        }
        // todo: обработка ошибок
    }

    async register(registerRequest: RegistrationRequest) {
        const response = await this.router.registerUser(registerRequest).response

        if (response.response.oneofKind == "userID") {
            return response.response.userID
        }
        // todo: обработка ошибок
    }

    async logout() {
        const response = await this.router.logout(WithoutParameters.create()).response

        return response.response.oneofKind == "success";


        // todo: обработка ошибок
    }
}

let instance = Client.getInstance(); // сделать что-нибудь с экземпляром...