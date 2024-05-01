import {RouterClient} from "~/proto/api/router_client";
import {GrpcWebFetchTransport} from "@protobuf-ts/grpcweb-transport"
import {StudorgID, StudorgInfo} from "~/proto/models/studorg";
import {WithoutParameters} from "~/proto/api/router";

export default class Client {
    private static instance?: Client;
    private router: RouterClient;

    private constructor() {
        this.router = new RouterClient(
            new GrpcWebFetchTransport({
                baseUrl: 'http://127.0.0.1:8080'
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

    async getAllStudorgs() {
        const request = WithoutParameters.create()
        const response = await this.router.getAllStudorgs(request).response
        if (response.response.oneofKind == "studorgs") {
            return response.response.studorgs.studorgs
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
}

let instance = Client.getInstance(); // сделать что-нибудь с экземпляром...