import http from 'http'
import { Response, NextFunction } from 'express'
import socket from 'socket.io'

export const addSocket = (server: http.Server) => {
  const io = socket(server)
  return (req: any, res: Response, next: NextFunction) => {
    req.io = io
    next()
  }
}

export default addSocket
