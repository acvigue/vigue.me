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

    //if we have a UUID, look up the page ID
    let id;

    if (isValidV4UUID(rawSlug)) {
        const resp = await api.pages.browse({ filter: `uuid:${rawSlug}` }).fetch()

        if (!resp.success) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Error fetching page by UUID',
            })
        }

        if (resp.data.length === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Page not found',
            })
        }

        const page = resp.data[0]

        if (page.status !== 'draft') {
            throw createError({
                statusCode: 403,
                statusMessage: 'Page is already published!',
            })
        }

        id = page.id
    }

    //parse slug
    const slug = typeof rawSlug === 'string' ? rawSlug : '';

    const params = id ? { id } : { slug }

    const response = await api.pages
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
        tiers: _tiers,
        primary_tag: _primary_tag,
        is_page: _is_page,
        email_subject: _email_subject,
        custom_template: _custom_template,
        id: _id,
        ...sanitized
    } = response.data

    const pageResponse = {
        ...sanitized,
        tags: limitTagsResponse(sanitized.tags),
    }

    return pageResponse
})
