import {RouterClient} from "~/proto/api/router_client";
import {GrpcWebFetchTransport} from "@protobuf-ts/grpcweb-transport"
import {ModerationStatus, Studorg, StudorgID, StudorgInfo, StudorgRole} from "~/proto/models/studorg";
import {
    AuthorizationRequest,
    ParticipantsResponse,
    RegistrationRequest,
    SearchRequest,
    UsersRequest,
    WithoutParameters
} from "~/proto/api/router";
import {ProjectRole, User, UserID} from "~/proto/models/user";
import {Participant} from "~/proto/models/participant";

export default class Client {
    private static instance?: Client;
    private router: RouterClient;

    private constructor() {
        this.router = new RouterClient(
            new GrpcWebFetchTransport({
                baseUrl: '/api',
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

    async getDevelopers() {
        const request = UsersRequest.create()
        request.projectRole = ProjectRole.DEVELOPER

        const response = await this.router.getUsers(request).response
        if (response.response.oneofKind == "users") {
            return response.response.users.users
        }
        // if (response.response.oneofKind == "err") {
        //     throw response.response.err
        // }
        // throw "unknown response"
        // todo: обработка ошибок
    }

    async getModerators() {
        const request = UsersRequest.create()
        request.projectRole = ProjectRole.MODERATOR

        const response = await this.router.getUsers(request).response
        if (response.response.oneofKind == "users") {
            return response.response.users.users
        }
        // if (response.response.oneofKind == "err") {
        //     throw response.response.err
        // }
        // throw "unknown response"
        // todo: обработка ошибок
    }

    async getPersonalInfo() {
        return await this.router.getPersonalInfo(WithoutParameters.create()).response
    }

    async updateUserInfo(user: User) {
        const response = await this.router.updateUser(user).response
        if (response.response.oneofKind == "success") {
            return true
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

    async searchStudorgs(request: SearchRequest) {
        const response = await this.router.searchStudorgs(request).response
        if (response.response.oneofKind == "studorgs") {
            return response.response.studorgs.studorgs
        }
        // todo: обработка ошибок
    }

    async getUserStudorgs() {
        const request = WithoutParameters.create()
        const response = await this.router.getPersonalStudorgs(request).response
        if (response.response.oneofKind == "studorgs") {
            return response.response.studorgs.studorgs
        } else {
            return []
        }
        // todo: обработка ошибок
    }

    async authInfo() {
        return await this.router.isAuth(WithoutParameters.create()).response
        // todo: обработка ошибок
    }

    async createStudorg(studorgInfo: StudorgInfo) {
        const response = await this.router.createStudorg(studorgInfo).response
        if (response.response.oneofKind == "studorgID") {
            return response.response.studorgID
        }
        // todo: обработка ошибок
    }

    async updateStudorg(studorg: Studorg) {
        const response = await this.router.updateStudorg(studorg).response
        if (response.response.oneofKind == "success") {
            return true
        }
        // todo: обработка ошибок
    }

    async usersNumber(studorgID: StudorgID) {
        const response = await this.router.getParticipantsNumber(studorgID).response

        if (response.response.oneofKind == "number") {
            return response.response.number
        }
        // todo: обработка ошибок
    }

    async getParticipants(studorgID: StudorgID, onlyOrganizers: boolean) {
        let response : ParticipantsResponse
        if (onlyOrganizers) {
            response = await this.router.getOrganizers(studorgID).response
        } else {
            response = await this.router.getParticipants(studorgID).response
        }

        if (response.response.oneofKind == "participants") {
            return response.response.participants
        }
        // todo: обработка ошибок
    }

    async updateParticipant(participant: Participant) {
        const response = await this.router.updateParticipant(participant).response

        return response.response.oneofKind == "success";
        // todo: обработка ошибок
    }

    async studorgsNumber(userID: UserID) {
        const response = await this.router.getPersonalStudorgsNumber(userID).response

        if (response.response.oneofKind == "number") {
            return +response.response.number
        }
        return 0
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

    async addUserToStudorg(studorgID: StudorgID) {
        const response = await this.router.addToStudorg(studorgID).response

        return response.response.oneofKind == "success";

        // todo: обработка ошибок
    }

    async deleteUserFromStudorg(studorgID: StudorgID) {
        const response = await this.router.deleteFromStudorg(studorgID).response

        return response.response.oneofKind == "success";

        // todo: обработка ошибок
    }

    async checkUserInStudorg(studorgID: StudorgID) {
        const response = await this.router.getPersonalStudorgRole(studorgID).response
        return response.role != StudorgRole.UNKNOWN;

        // todo: обработка ошибок
    }

    async getStudorgRole(studorgID: StudorgID) {
        const response = await this.router.getPersonalStudorgRole(studorgID).response
        return response.role

        // todo: обработка ошибок
    }

    async hideStudorg(studorg: Studorg) {
        if (studorg.studorgInfo == undefined) {
            studorg.studorgInfo = StudorgInfo.create()
        }

        studorg.studorgInfo.moderationStatus = ModerationStatus.HIDDEN_BY_MODERATOR

        const response = await this.router.moderateStudorg(studorg).response

        return response.response.oneofKind == "success";
        // todo: обработка ошибок
    }

    async showStudorg(studorg: Studorg) {
        if (studorg.studorgInfo == undefined) {
            studorg.studorgInfo = StudorgInfo.create()
        }

        studorg.studorgInfo.moderationStatus = ModerationStatus.NOT_MODERATED

        const response = await this.router.moderateStudorg(studorg).response

        return response.response.oneofKind == "success";
        // todo: обработка ошибок
    }
}

let instance = Client.getInstance(); // сделать что-нибудь с экземпляром...