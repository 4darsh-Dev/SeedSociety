export const detectTrees = async (image) => {
  const formData = new FormData()
  const img = await fetch(image)
  const imgBlob = await img.blob()
  formData.append('data', {
    uri: image,
    name: 'image.jpg', // Gradio expects a filename
    type: 'image/jpeg' // Change if image type is different
  })
  console.log(imgBlob, 'image')
  // Initial req to start img processing
  const res = await fetch(
    'https://4darsh-dev-tree-plant-detect.hf.space/gradio_api/call/detect_trees',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [
          {
            path: 'https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png'
          }
        ]
      })
    }
  )
  const result = await res.json()

  console.log(result, 'result')
  if (result) {
    const eventId = result.event_id
    console.log('Event ID: sending req', eventId)
    // Req in loop to get prediction
    let retries = 60
    let resultText = 'event: heartbeat\ndata: null'

    while (retries > 0 && resultText.includes('event: heartbeat')) {
      console.log(`Waiting for result... (${60 - retries}/15)`)
      const resultResponse = await fetch(
        `https://4darsh-dev-tree-plant-detect.hf.space/gradio_api/call/detect_trees/${eventId}`
      )
      await new Promise((resolve) => setTimeout(resolve, 10000))
      console.log(resultResponse, 'resultResponse')
      retries--
    }
    // const resultData = await resultResponse.json()
    // console.log('Result:', resultData)
    console.log('out of loop')
    return resultData
  }

  return result.data
}
