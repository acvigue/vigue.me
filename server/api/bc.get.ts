export default defineEventHandler(async (event) => {
    const { m: method } = getQuery(event);

    const queryParams = {
        utm_campaign: 'BusinessCard',
        utm_medium: 'BusinessCard',
        utm_term: `BusinessCard${method === 'tap' ? '-NFC' : '-QR'}`,
    }

    const url = new URL('https://vigue.me');
    url.search = new URLSearchParams(queryParams).toString();

    return sendRedirect(event, url.toString(), 302);
});