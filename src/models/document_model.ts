import * as mongoose from 'mongoose'

export interface Document extends mongoose.Document {
  _id: string
  title: string
  content: string
  file?: Buffer
  _v: number
}

const schema = new mongoose.Schema({
  title: String,
  content: String,
  file: Buffer
}, {
  timestamps: true
})

export const model = mongoose.model<Document>('Document', schema)

export default mongoose.model<Document>('Document', schema)
