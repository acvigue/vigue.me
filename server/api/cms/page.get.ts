import { TSGhostAdminAPI } from '@ts-ghost/admin-api'

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

    //if we have a UUID, look up the page ID
    let id;

    if (uuid) {
        const resp = await api.pages.browse({ filter: `uuid:${uuid}` }).fetch()

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

        //@ts-expect-error - lexical support not yet implemented
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
        ...sanitized
    } = response.data

    return sanitized
})
