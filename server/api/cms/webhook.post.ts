import { createHmac } from 'crypto';

interface PostOrPage {
    slug: string;
    tags?: { slug: string }[];
}
interface WebhookBody {
    post?: {
        current?: PostOrPage;
        previous?: PostOrPage;
    };
    page?: {
        current?: PostOrPage;
        previous?: PostOrPage;
    };
}

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig();

    const body = await readBody<WebhookBody>(event);

    const signature = getHeader(event, 'X-Ghost-Signature');

    if (!signature || typeof signature !== 'string') {
        throw createError({
            status: 400,
            message: 'Missing X-Ghost-Signature header',
            fatal: true,
        });
    }

    const [ghostHmac, timestampPart] = signature.split(', t=');

    if (!ghostHmac || !timestampPart) {
        throw createError({
            status: 400,
            message: 'Invalid X-Ghost-Signature header',
            fatal: true,
        });
    }

    const timestamp = parseInt(timestampPart, 10);
    const currentTimestamp = Date.now();
    const timestampDiff = Math.abs(currentTimestamp - timestamp);

    // Weak check for replay attack
    if (isNaN(timestampDiff)) {
        throw createError({
            status: 400,
            message: 'Timestamp too old or invalid',
            fatal: true,
        });
    }

    const hmac = createHmac('sha256', runtimeConfig.bypassToken)
        .update(JSON.stringify(body))
        .digest('hex');

    if (ghostHmac !== `sha256=${hmac}`) {
        throw createError({
            status: 401,
            message: 'Invalid X-Ghost-Signature header',
            fatal: true,
        });
    }

    const paths = [];

    if (body.page == undefined && body.post == undefined) {
        return new Response("Invalid webhook body!", { status: 400 });
    }

    if (body.page) {
        const page = body.page;
        if (!page.current || Object.keys(page.current).length === 0) {
            if (page.previous?.slug) {
                //page was deleted
                paths.push(`/${page.previous.slug}`);

                for (const tag of page.previous.tags ?? []) {
                    paths.push(`/tag/${tag.slug}`);
                }
            }
        } else {
            paths.push(`/${page.current.slug}`);

            if (page.previous && (page.previous.slug ?? page.current.slug !== page.current.slug)) {
                paths.push(`/${page.previous.slug}`);
            }

            const tag_slugs = [
                ...page.previous?.tags ?? [],
                ...page.current.tags ?? []
            ].map(tag => tag.slug);

            const unique_tag_slugs = [...new Set(tag_slugs)];

            for (const tag of unique_tag_slugs) {
                paths.push(`/tag/${tag}`);
            }
        }

        paths.push(`/`);
    } else if (body.post !== undefined) {
        const post = body.post;
        if (!post.current || Object.keys(post.current).length === 0) {
            if (post.previous?.slug) {
                //post was deleted
                paths.push(`/posts/${post.previous.slug}`);
                paths.push(`/${post.previous.slug}`);

                for (const tag of post.previous.tags ?? []) {
                    paths.push(`/tag/${tag.slug}`);
                }
            }
        } else {
            paths.push(`/posts/${post.current.slug}`);
            paths.push(`/${post.current.slug}`);

            if (post.previous && (post.previous.slug ?? post.current.slug !== post.current.slug)) {
                paths.push(`/posts/${post.previous.slug}`);
                paths.push(`/${post.previous.slug}`);
            }

            const tag_slugs = [
                ...post.previous?.tags ?? [],
                ...post.current.tags ?? []
            ].map(tag => tag.slug);

            const unique_tag_slugs = [...new Set(tag_slugs)];

            for (const tag of unique_tag_slugs) {
                paths.push(`/tag/${tag}`);
            }
        }

        paths.push(`/`);
    } else {
        return new Response("Invalid webhook body!", { status: 400 });
    }

    if (paths.length > 0) {
        const promises = paths.map(async (path) => {
            return fetch(`https://vigue.me${path}`, {
                method: 'GET',
                headers: {
                    'X-Prerender-Revalidate': runtimeConfig.bypassToken
                }
            })
        });

        Promise.allSettled(promises);

        return {
            revalidating: paths
        }
    }
});