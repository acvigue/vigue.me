import { TSGhostAdminAPI } from '@ts-ghost/admin-api'
import { limitTagsResponse } from '~/utilities/GhostAPI'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const rawPage = getRouterParam(event, 'page')

    if (!rawPage) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No page provided!',
        })
    }

    const api = new TSGhostAdminAPI(
        config.ghostUrl,
        config.ghostAdminKey,
        'v5.47.0',
    )

    const response = await api.posts
        .browse({ filter: "status:published", limit: 10, page: Number.parseInt(rawPage.toString()) })
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
            primary_tag: _primary_tag,
            ...sanitized
        } = post

        const p = {
            ...sanitized,
            tags: limitTagsResponse(sanitized.tags),
        }

        return p
    })

    return {
        posts,
        pagination: {
            page: response.meta.pagination.page,
            pages: response.meta.pagination.pages,
            total: response.meta.pagination.total,
        }
    }
})
