import { TSGhostAdminAPI } from '@ts-ghost/admin-api'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const isPreview = getQuery(event).preview === 'true'

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No slug provided!',
    })
  }

  const config = useRuntimeConfig()

  const api = new TSGhostAdminAPI(
    config.ghostUrl,
    config.ghostAdminKey,
    'v5.47.0',
  )

  if (isPreview) {
    const response = await api.pages
      .read({ id: slug })
      //@ts-expect-error - lexical support not yet implemented
      .formats({ lexical: true, mobiledoc: true })
      .fetch()
    if (!response.success) {
      const errorString = response.errors
        .map(error => error.message)
        .join(', ')
      throw createError({
        statusCode: 500,
        statusMessage: errorString,
      })
    }

    const {
      authors: _authors,
      primary_author: _primary_author,
      comment_id: _comment_id,
      count: _count,
      frontmatter: _frontmatter,
      ...sanitized
    } = response.data

    return sanitized
  }

  const response = await api.pages
    .read({ slug })
    //@ts-expect-error - lexical support not yet implemented
    .formats({ lexical: true, mobiledoc: true })
    .fetch()
  if (!response.success) {
    const errorString = response.errors
      .map(error => error.message)
      .join(', ')
    let status = 500
    if (errorString.includes('not found'))
      status = 404

    throw createError({
      statusCode: status,
      statusMessage: errorString,
    })
  }

  if (response.data.visibility !== 'public') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Page is not public!',
    })
  }

  const {
    authors: _authors,
    primary_author: _primary_author,
    comment_id: _comment_id,
    count: _count,
    frontmatter: _frontmatter,
    ...sanitized
  } = response.data

  return sanitized
})
