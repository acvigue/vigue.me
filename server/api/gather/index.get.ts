export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event);

    const response = await fetch(`${runtimeConfig.matomoUrl}/matomo.js`);

    if (!response.ok) {
        throw createError({
            status: 500,
            message: 'Failed to forward request to Matomo',
            fatal: true,
        });
    }

    //return the matomo.js file
    return new Response(await response.text(), {
        headers: {
            'Content-Type': 'application/javascript',
        },
    });
});