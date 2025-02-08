import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()
export const addTreeQuery = async (data) => {
  try {
    //raw query to access postgis functionalities though prisma
    const { locationInWTK, planterId, species, notes } = data
    console.log(
      'In db function',
      'locationInWTK',
      locationInWTK,
      'planterId',
      planterId,
      'species',
      species,
      'notes',
      notes
    )
    const query = `INSERT INTO "Tree" (
      "locationData",
      "plantedBy",
      "species",
      "plantedAt",
      "updatedAt",
      "notes"
    )
    VALUES (
      gis.ST_SetSRID(gis.ST_GeomFromText('${locationInWTK}'), 4326),
      ${planterId},
      '${species}',
      NOW(),
      NOW(),
      '${notes}'
    )
    RETURNING 
    id,
  gis.ST_AsText("locationData") as "locationData",
  "plantedBy",
  "species",
  "plantedAt",
  "updatedAt",
  "notes";`
    console.log('query', query)
    const result = await prisma.$queryRawUnsafe(query)
    return result
  } catch (e) {
    console.log(e)
    throw e
  }
}
export const fetchAllTreesQuery = async () => {
  try {
    const trees = await prisma.$queryRaw`
    SELECT
      id,
      gis.ST_AsText("locationData") AS "locationData", -- Converts the geography to WKT format
      "plantedBy",
      "species",
      "plantedAt",
      "updatedAt",
      "notes"
    FROM "Tree";
  `
    return trees
  } catch (e) {
    console.log(e)
    throw e
  }
}
