import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
const {
  S3_ACCESS_KEY_ID,
  S3_SECRET_KEY,
  SUPABASE_STORAGE_URL,
  SUPABASE_IMAGE_URL
} = process.env
const client = new S3Client({
  forcePathStyle: true,
  region: 'ap-south-1',
  endpoint: SUPABASE_STORAGE_URL,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_KEY
  }
})
export const uploadToBucket = async (file) => {
  const { originalname, mimetype, buffer } = file
  const uploadParams = {
    Bucket: 'seed-society-images',
    Key: originalname,
    Body: buffer,
    ContentType: mimetype,
    ACL: 'public-read'
  }
  const data = await client.send(new PutObjectCommand(uploadParams))
  const fileUrl = `${SUPABASE_IMAGE_URL}/${uploadParams.Bucket}//${originalname}`
  return fileUrl
}
