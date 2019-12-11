import http from 'http'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import socket from './socket'
import routes from './routes'

const PORT = process.env.PORT || 3333

const app = express()
const server = new http.Server(app)

app.use(socket(server))
app.use(cors())
app.use(routes)

mongoose.connect('mongodb+srv://pasta-digitalizada:pasta-digitalizada@cluster0-hirsg.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

server.listen(PORT, () => console.log(`Pasta Digitalizada listening on port ${PORT}`))
