import {RouterClient} from "~/proto/api/router_client";
import {StudorgID} from "~/proto/models/studorg";
import {GrpcWebFetchTransport} from "@protobuf-ts/grpcweb-transport"

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

    async getStudorgInfo() {
        const request = StudorgID.create();
        request.iD = "1"
        const response = await this.router.getStudorg(request).response
        if (response.response.oneofKind == "studorg") {
            return response.response.studorg.studorgInfo
        }
        // if (response.response.oneofKind == "err") {
        //     throw response.response.err
        // }
        // throw "unknown response"
    }
}

let instance = Client.getInstance(); // сделать что-нибудь с экземпляром...