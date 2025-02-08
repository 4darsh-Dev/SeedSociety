import { Client } from '@gradio/client'

export const getPrediction = async (image) => {
  try {
    console.log('sending req to gradio')
    const client = await Client.connect('4darsh-Dev/tree_plant_detect')
    console.log('client connected successfully')
    const result = await client.predict('/detect_trees', {
      image: image
    })
    console.log(result)
    console.log(result.data[1], 'daa')
    return result.data[1]
  } catch (e) {
    console.error(e)
    throw e
  }
}
