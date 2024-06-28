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
      slug: true,
      updated_at: true,
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
        slug: true,
        updated_at: true,
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

export async function getAllPages() {
  const config = useRuntimeConfig()

  const api = new TSGhostAdminAPI(
    config.ghostUrl,
    config.ghostAdminKey,
    'v5.47.0',
  )

  const response = await api.pages
    .browse({ limit: 10, page: 1 })
    .fields({
      slug: true,
      updated_at: true,
    })
    .fetch()
  if (!response.success) {
    const errorString = response.errors
      .flatMap(error => error.message)
      .join(', ')
    throw new Error(errorString)
  }

  for (let i = 2; i <= response.meta.pagination.pages; i++) {
    const tempResponse = await api.pages
      .browse({ limit: 10, page: i, filter: 'status:published' })
      .fields({
        slug: true,
        updated_at: true,
      })
      .fetch()
    if (!tempResponse.success)
      throw new Error(tempResponse.errors.join(', '))

    tempResponse.data.forEach((p) => {
      response.data.push(p)
    })
  }

  return { pages: response.data, pagination: response.meta.pagination }
}

export default defineSitemapEventHandler(async (_e) => {
  const allPosts = await getAllPosts()
  const allPages = await getAllPages()

  const postLocations = allPosts.posts.map((p) => {
    return {
      loc: `/posts/${p.slug}`,
      lastmod: p.updated_at ?? undefined,
    }
  })

  const postPages = Array(allPosts.pagination.pages).fill(0).map((_, i) => {
    return {
      loc: `/posts/${i + 1}`,
      lastmod: undefined,
    }
  })

  const pageLocations = allPages.pages.map((p) => {
    return {
      loc: `/${p.slug}`,
      lastmod: p.updated_at ?? undefined,
    }
  })

  return [
    ...postLocations,
    ...postPages,
    ...pageLocations,
  ]
})
