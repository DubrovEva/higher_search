import * as grpcWeb from 'grpc-web';

import * as api_router_pb from '../api/router_pb';
import * as models_studorg_pb from '../models/studorg_pb';
import * as models_user_pb from '../models/user_pb';


export class RouterClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getUser(
    request: models_user_pb.UserID,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_router_pb.UserResponse) => void
  ): grpcWeb.ClientReadableStream<api_router_pb.UserResponse>;

  insertUser(
    request: models_user_pb.UserInfo,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_router_pb.UserResponse) => void
  ): grpcWeb.ClientReadableStream<api_router_pb.UserResponse>;

  updateUser(
    request: models_user_pb.User,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_router_pb.UserResponse) => void
  ): grpcWeb.ClientReadableStream<api_router_pb.UserResponse>;

  getStudorg(
    request: models_studorg_pb.StudorgID,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_router_pb.StudorgResponse) => void
  ): grpcWeb.ClientReadableStream<api_router_pb.StudorgResponse>;

  insertStudorg(
    request: models_studorg_pb.StudorgInfo,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_router_pb.StudorgResponse) => void
  ): grpcWeb.ClientReadableStream<api_router_pb.StudorgResponse>;

  updateStudorg(
    request: models_studorg_pb.Studorg,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_router_pb.StudorgResponse) => void
  ): grpcWeb.ClientReadableStream<api_router_pb.StudorgResponse>;

}

export class RouterPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getUser(
    request: models_user_pb.UserID,
    metadata?: grpcWeb.Metadata
  ): Promise<api_router_pb.UserResponse>;

  insertUser(
    request: models_user_pb.UserInfo,
    metadata?: grpcWeb.Metadata
  ): Promise<api_router_pb.UserResponse>;

  updateUser(
    request: models_user_pb.User,
    metadata?: grpcWeb.Metadata
  ): Promise<api_router_pb.UserResponse>;

  getStudorg(
    request: models_studorg_pb.StudorgID,
    metadata?: grpcWeb.Metadata
  ): Promise<api_router_pb.StudorgResponse>;

  insertStudorg(
    request: models_studorg_pb.StudorgInfo,
    metadata?: grpcWeb.Metadata
  ): Promise<api_router_pb.StudorgResponse>;

  updateStudorg(
    request: models_studorg_pb.Studorg,
    metadata?: grpcWeb.Metadata
  ): Promise<api_router_pb.StudorgResponse>;

}

