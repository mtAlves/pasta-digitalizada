import { Request as ExpressRequest } from 'express'
import { Server } from 'socket.io'

export declare interface Request extends ExpressRequest {
  io: Server
}
