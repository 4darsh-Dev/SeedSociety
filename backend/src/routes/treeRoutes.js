import {
  addCaretaker,
  addTree,
  fetchAllTrees,
  fetchTreeById
} from '../controllers/treeController.js'
import express from 'express'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.post('/add-tree', upload.single('file'), addTree)
router.get('/get-trees', fetchAllTrees)
router.get('/get-tree/:id', fetchTreeById)
router.post('/add-caretaker', addCaretaker)

export default router
