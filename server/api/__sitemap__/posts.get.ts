import { TSGhostAdminAPI } from '@ts-ghost/admin-api'

export default defineEventHandler(async (_) => {
    const config = useRuntimeConfig()

    const api = new TSGhostAdminAPI(
        config.ghostUrl,
        config.ghostAdminKey,
        'v5.47.0',
    )

    //First get number of pages
    const response = await api.posts
        .browse({ limit: 10 })
        .fetch()

    if (!response.success)
        throw new Error(response.errors.join(', '))

    const pages = response.meta.pagination.pages;

    //Then get all pages
    const promises = Array.from({ length: pages }, (_, i) => i + 1).map(async (page) => {
        const response = await api.posts
            .browse({ limit: 10, page })
            .fetch()

        if (!response.success)
            throw new Error(response.errors.join(', '))

        return response;
    });

    const allPages = await Promise.all(promises);

    const postSlugPages = allPages.map((page) => page.data).flat().map((post) => {
        if (post.status !== 'published') return
        return {
            loc: `/posts/${post.slug}`,
            lastmod: post.updated_at,
        }
    }).filter(Boolean);

    return [...postSlugPages, {
        loc: `/posts`,
    }];
})
