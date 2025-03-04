import { TSGhostAdminAPI } from '@ts-ghost/admin-api'
import { limitTagsResponse } from '~/utilities/GhostAPI'

const isValidV4UUID = (test: string) => {
    const uuidV4Regex = new RegExp(
        '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
        'i',
    )
    return uuidV4Regex.test(test)
}

export default defineEventHandler(async (event) => {
    const rawSlug = getRouterParam(event, 'slug')

    if (!rawSlug) {
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

    //if we have a UUID, look up the post ID, uuids formatted "preview_<id>"
    let id;

    const isPreview = rawSlug.startsWith('preview_');

    if (isPreview) {
        const uuid = rawSlug.replace('preview_', '');

        if (!isValidV4UUID(uuid)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid UUID provided!',
            })
        }

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
