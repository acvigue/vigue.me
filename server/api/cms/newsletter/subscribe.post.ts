import { TSGhostAdminAPI } from '@ts-ghost/admin-api'

interface SubscribeBody {
    email: string
    name?: string
}

export default defineEventHandler<{ body: SubscribeBody }>(async (event) => {
    const config = useRuntimeConfig()
    const { email, name = 'User' } = await readBody(event);

    if (!email) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No email provided!',
        })
    }

    const api = new TSGhostAdminAPI(
        config.ghostUrl,
        config.ghostAdminKey,
        'v5.47.0',
    )

    const resp = await api.members.add({
        email,
        name,
        newsletters: [{ id: '64d24b41f970940001ee4e37', name: 'Aiden' }]
    });

    if (!resp.success) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error adding member',
        })
    }
})
