export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event);

    const body = await readRawBody(event);

    //get original user IP
    const userIpCF = await getRequestHeader(event, 'CF-Connecting-IP');
    const userIpXFF = await getRequestHeader(event, 'X-Forwarded-For');

    const userIp = userIpCF || userIpXFF;


    //forward request to matomo
    const response = await fetch(`${runtimeConfig.matomoUrl}/matomo.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Matomo-Original-IP': userIp ?? '',
            'User-Agent': getRequestHeader(event, 'User-Agent') ?? '',
            'Cookie': getRequestHeader(event, 'Cookie') ?? '',
            'Referer': getRequestHeader(event, 'Referer') ?? '',
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