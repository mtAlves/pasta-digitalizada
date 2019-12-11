import { model } from '../models/document_model'
import { Response } from 'express'
import ocr from '../utils/ocr'

import { Request } from '../types/request'

export const controller = {
  getAll: async (req: Request, res: Response) => {
    const documents = await model.find()

    res.status(200).send(documents)
  },
  create: async (req: Request, res: Response) => {
    const { title, content } = req.body
    if(!title) return res.status(400).send('O campo "Título" é obrigatório.')

    const isPdf = req.file ? req.file.mimetype === 'application/pdf' : false

    const document = await model.create({
      title,
      content: isPdf ? await ocr(req.file.buffer) : content,
      file: isPdf ? req.file.buffer : null
    })

    req.io.emit('create', document)
    res.status(200).send('Documento salvo!')
  },
  delete: async (req: Request, res: Response) => {
    const document = await model.findByIdAndDelete(req.params.id)

    document
      ? req.io.emit('delete', document) && res.status(200).send(`Documento ${req.params.id} foi removido.`)
      : res.status(404).send(`Documento ${req.params.id} não encontrado.`)
  }
}

export default controller
