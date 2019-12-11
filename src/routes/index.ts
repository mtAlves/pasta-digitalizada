import multer from 'multer'
import { Router } from 'express'
import controller from '../controllers/document_controller'
import uploadConfig from '../config/upload'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/documents', <any> controller.getAll)

routes.post('/documents', upload.single('document'), <any> controller.create)

routes.delete('/documents/:id', <any> controller.delete)

export default routes