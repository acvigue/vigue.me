import { TSGhostAdminAPI } from '@ts-ghost/admin-api'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const api = new TSGhostAdminAPI(
    config.ghostUrl,
    config.ghostAdminKey,
    'v5.47.0',
  )

  const { page, featured } = getQuery(event)

  const pageNum = page ? Number.parseInt(page.toString()) : 1

  if (featured) {
    const response = await api.posts
      .browse({ filter: `featured:true+status:published` })
      .formats({ lexical: true, mobiledoc: true })
      .fetch()
    if (!response.success)
      throw new Error(response.errors.join(', '))

    const posts = response.data.map((post) => {
      const {
        authors: _authors,
        primary_author: _primary_author,
        comment_id: _comment_id,
        count: _count,
        frontmatter: _frontmatter,
        email_segment: _email_segment,
        email: _email,
        newsletter: _newsletter,
        email_only: _email_only,
        id: _id,
        lexical: _lexical,
        tiers: _tiers,
        ...sanitized
      } = post
      return sanitized
    })

    const postsResponse = {
      posts,
      pagination: {
        page: pageNum,
        pages: response.meta.pagination.pages,
        totalPosts: response.meta.pagination.total,
      },
    }

    return postsResponse
  }

  const response = await api.posts
    .browse({ limit: 10, page: pageNum, filter: 'status:published' })
    .formats({ lexical: true, mobiledoc: true })
    .fetch()
  if (!response.success)
    throw new Error(response.errors.join(', '))

  const posts = response.data.map((post) => {
    const {
      authors: _authors,
      primary_author: _primary_author,
      comment_id: _comment_id,
      count: _count,
      frontmatter: _frontmatter,
      email_segment: _email_segment,
      email: _email,
      newsletter: _newsletter,
      email_only: _email_only,
      id: _id,
      lexical: _lexical,
      tiers: _tiers,
      ...sanitized
    } = post
    return sanitized
  })

  const postsResponse = {
    posts,
    pagination: {
      page: pageNum,
      pages: response.meta.pagination.pages,
      totalPosts: response.meta.pagination.total,
    },
  }

  return postsResponse
})
