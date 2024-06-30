import { TSGhostAdminAPI } from '@ts-ghost/admin-api'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const api = new TSGhostAdminAPI(
    config.ghostUrl,
    config.ghostAdminKey,
    'v5.47.0',
  )

  const { page, featured, limit } = getQuery(event)

  const pageNum = page ? Number.parseInt(page.toString()) : 1
  const limitNum = limit ? Number.parseInt(limit.toString()) : 10

  let filter = 'status:published';

  if (featured) {
    filter = `featured:true+status:published`
  }

  const response = await api.posts
    //@ts-expect-error - I hate zod
    .browse({ filter, limit: limitNum, page: pageNum })
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
      meta_description: _meta_description,
      meta_title: _meta_title,
      codeinjection_foot: _codeinjection_foot,
      og_description: _og_description,
      og_image: _og_image,
      og_title: _og_title,
      twitter_description: _twitter_description,
      twitter_image: _twitter_image,
      twitter_title: _twitter_title,
      canonical_url: _canonical_url,
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
