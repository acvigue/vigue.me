import { TSGhostAdminAPI } from '@ts-ghost/admin-api'

export async function getAllPosts() {
  const config = useRuntimeConfig()

  const api = new TSGhostAdminAPI(
    config.ghostUrl,
    config.ghostAdminKey,
    'v5.47.0',
  )

  const response = await api.posts
    .browse({ limit: 10, page: 1 })
    .fields({
      id: true,
      slug: true,
      updated_at: true,
      published_at: true,
      meta_description: true,
      meta_title: true,
      title: true,
      og_description: true,
      og_image: true,
      feature_image: true,
      excerpt: true,
    })
    .fetch()
  if (!response.success) {
    const errorString = response.errors
      .flatMap(error => error.message)
      .join(', ')
    throw new Error(errorString)
  }

  for (let i = 2; i <= response.meta.pagination.pages; i++) {
    const tempResponse = await api.posts
      .browse({ limit: 10, page: i, filter: 'status:published' })
      .fields({
        id: true,
        slug: true,
        updated_at: true,
        published_at: true,
        meta_description: true,
        meta_title: true,
        title: true,
        og_description: true,
        og_image: true,
        feature_image: true,
        excerpt: true,
      })
      .fetch()
    if (!tempResponse.success)
      throw new Error(tempResponse.errors.join(', '))

    tempResponse.data.forEach((p) => {
      response.data.push(p)
    })
  }

  return { posts: response.data, pagination: response.meta.pagination }
}

export default defineSitemapEventHandler(async (_e) => {
  const allPosts = await getAllPosts()

  const locs: any = allPosts.posts.map((p: any) => {
    return {
      loc: `/projects/${p.slug}`,
      lastmod: p.updated_at,
    }
  })

  for (let i = 1; i <= allPosts.pagination.pages; i++) {
    locs.push({
      loc: `/projects/${i}`,
    })
  }

  return locs
})
