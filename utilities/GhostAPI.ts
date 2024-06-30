export type Tag = {
    slug: string,
    name: string,
    visibility: string,
}

export const limitTagsResponse = (tags?: Tag[]) => {
    if (!tags) return [];
    return tags.map((tag) => {
        return {
            slug: tag.slug,
            name: tag.name,
            visibility: tag.visibility,
        }
    });
}