import 'dotenv/config'
import cors from 'cors'
import express, { json } from 'express'
import treeRoutes from './src/routes/treeRoutes.js'

const app = express()
const port = process.env.PORT || 5000

app.use(json())
// app.use(cors({ origin: 'http://192.168.214.180:8081' }))

app.get('/', (req, res) => {
  console.log('request received', req.body)
  res.json({ message: 'success' })
})
app.use('/protected', treeRoutes)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
