export default defineEventHandler(async (event) => {
    const app = useAppConfig(event);

    const body = await readBody(event);

    //forward request to matomo
    const response = await fetch(app.matomoURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw createError({
            status: 500,
            message: 'Failed to forward request to Matomo',
            fatal: true,
        });
    }

    return {
        status: 200,
        body: response.body,
    }
});