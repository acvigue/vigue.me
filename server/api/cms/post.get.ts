import { TSGhostAdminAPI } from '@ts-ghost/admin-api'

export default defineEventHandler(async (event) => {
    const slug = getQuery(event).slug
    const uuid = getQuery(event).uuid

    if (!slug && !uuid) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No slug or UUID provided!',
        })
    }

    const config = useRuntimeConfig()

    const api = new TSGhostAdminAPI(
        config.ghostUrl,
        config.ghostAdminKey,
        'v5.47.0',
    )

    //if we have a UUID, look up the post ID
    if (uuid) {
        const resp = await api.posts.browse({ filter: `uuid:${uuid}` }).fetch()

        if (!resp.success) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Error fetching post by UUID',
            })
        }

        if (resp.data.length === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Post not found',
            })
        }

        const post = resp.data[0]

        if (post.status !== 'draft') {
            throw createError({
                statusCode: 403,
                statusMessage: 'Post is already published!',
            })
        }

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
            tiers: _tiers,
            ...sanitized
        } = post

        return sanitized
    }

    if (typeof slug !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid slug provided!',
        })
    }


    const response = await api.posts
        .read({ slug })
        .formats({ lexical: true })
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

    if (response.data.status !== 'published') {
        throw createError({
            statusCode: 404,
            statusMessage: 'Post not found!',
        })
    }

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
        tiers: _tiers,
        ...sanitized
    } = response.data

    return sanitized
})
