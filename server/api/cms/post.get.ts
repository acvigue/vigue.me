import { TSGhostAdminAPI } from '@ts-ghost/admin-api'
import { limitTagsResponse } from '~/utilities/GhostAPI'

export default defineEventHandler(async (event) => {
    const rawSlug = getQuery(event).slug
    const uuid = getQuery(event).uuid

    if (!rawSlug && !uuid) {
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
    let id;

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

        id = post.id
    }

    //parse slug
    const slug = typeof rawSlug === 'string' ? rawSlug : '';

    const params = id ? { id } : { slug }

    const response = await api.posts
        .read(params)
        .formats({ lexical: true })
        .fetch()

    if (!response.success) {
        const errorString = response.errors
            .map(error => error.message)
            .join(', ')
        throw createError({
            statusCode: response.errors[0].type === 'NotFoundError' ? 404 : 500,
            statusMessage: errorString,
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
        primary_tag: _primary_tag,
        is_page: _is_page,
        email_subject: _email_subject,
        custom_template: _custom_template,
        id: _id,
        ...sanitized
    } = response.data

    const postResponse = {
        ...sanitized,
        tags: limitTagsResponse(sanitized.tags),
    }

    return postResponse
})
