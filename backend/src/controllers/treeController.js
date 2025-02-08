import { getPrediction } from '../utils/gradioConfig.js'
import {
  addTreeQuery,
  fetchAllTreesQuery,
  prisma
} from '../utils/prismaClient.js'
import { uploadToBucket } from '../utils/s3Client.js'
import { supabase } from '../utils/supaBaseClient.js'
export const addTree = async (req, res) => {
  try {
    console.log('req received')
    //get tree data
    const { planterId, longitude, latitude, species, notes } = req.body

    if (!req.file) {
      console.log('no file')
      return res.status(400).json({ error: 'Image is required' })
    }
    const photo = await req.file.buffer
    const location = { latitude: +latitude, longitude: +longitude }
    // validating image
    if (!photo) {
      return res.status(400).json({ error: 'Image is required' })
    }
    console.log(photo, 'photo')
    const prediction = await getPrediction(photo)
    // console.log('prediction', prediction)
    // const locationInWTK = toWKT(location.longitude, location.latitude)
    // const data = { locationInWTK, planterId, species, notes }
    const { data } = prediction
    if (data[0][0] === '' || data[0][1] === '') {
      console.log('tree not detetcted')
      return res.status(400).json({ error: 'No tree detected in the image' })
    }
    //add tree image, to the bucket
    const treeUrl = await uploadToBucket(req.file)
    //adding tree data to db
    const treeDataDb = await prisma.tree.create({
      data: {
        plantedBy: +planterId,
        species: species,
        locationData: location,
        notes: notes
      }
    })
    const { id: treeId } = treeDataDb
    // console.log('treeId', treeId)
    // add tree image uri to db
    await prisma.treeImage.create({
      data: {
        treeId: treeId,
        imageUrl: treeUrl
      }
    })
    return res.status(200).json({
      mssg: 'Tree Geotagged successfully'
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: e })
  }
}
function toWKT(longitude, latitude) {
  if (longitude === NaN || latitude === NaN) {
    return null
  }
  return `POINT(${longitude} ${latitude})`
}
function WKTtoObj(wkt) {
  if (!wkt || !wkt.startsWith('POINT(') || !wkt.endsWith(')')) {
    return null
  }

  const coords = wkt.slice(6, -1).split(' ')
  const longitude = parseFloat(coords[0])
  const latitude = parseFloat(coords[1])

  if (isNaN(longitude) || isNaN(latitude)) {
    return null
  }

  return { longitude, latitude }
}
export const addCaretaker = async (req, res) => {}
export const fetchAllTrees = async (req, res) => {
  console.log('fetching all trees')
  try {
    const trees = await prisma.tree.findMany({
      select: {
        locationData: true,
        id: true // Include ID to fetch full details later
      }
    })
    // if (trees) {
    //   trees.forEach((tree) => {
    //     tree.locationData = WKTtoObj(tree.locationData)
    //   })
    // }
    res.status(200).json(trees)
  } catch (err) {
    console.error(err)
  }
}
export const fetchTreeById = async (req, res) => {
  const { id } = req.params
  try {
    const tree = await prisma.tree.findUnique({
      where: {
        id: +id
      },
      select: {
        id: true,
        locationData: true,
        species: true,
        notes: true,
        plantedBy: true,
        images: true,
        plantedAt: true,
        updatedAt: true,
        planter: true,
        caretakers: true
      }
    })
    if (!tree) {
      return res.status(404).json({ error: 'Tree not found' })
    }
    console.log(tree)
    res.status(200).json(tree)
  } catch (err) {
    console.error(err)
  }
}
