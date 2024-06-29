export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event);

    const body = await readRawBody(event);

    //forward request to matomo
    const response = await fetch(`${runtimeConfig.matomoUrl}/matomo.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
    });

    if (!response.ok) {
        throw createError({
            status: 500,
            message: `Failed to forward request to Matomo: ${response.statusText}`,
            fatal: true,
        });
    }

    return {
        status: 200,
        body: response.body,
    }
});