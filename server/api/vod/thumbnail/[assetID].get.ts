import Mux from "@mux/mux-node"

export default defineEventHandler(async (event) => {
  const assetID = getRouterParam(event, 'assetID')

  if (!assetID) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No asset provided!',
    })
  }

  const config = useRuntimeConfig()

  const mux = new Mux({
    tokenId: config.muxTokenId,
    tokenSecret: config.muxTokenSecret,
  })

  const asset = await mux.video.assets.retrieve(assetID)

  if (!asset) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Asset not found!',
    })
  }

  const playbackIDs = asset.playback_ids

  if (!playbackIDs || playbackIDs.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No playback IDs found!',
    })
  }

  const playbackID = playbackIDs[0]

  if (playbackID.policy === 'public') {
    //fetch and return content from url
    const url = `https://image.mux.com/${playbackID.id}/animated.webp?width=640`
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()

    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/webp',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  throw createError({
    statusCode: 403,
    statusMessage: 'Playback ID is not public!',
  })
})
