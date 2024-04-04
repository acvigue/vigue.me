import { TSGhostAdminAPI } from "@ts-ghost/admin-api";

export const getAllPosts = async () => {
  const config = useRuntimeConfig();

  const api = new TSGhostAdminAPI(
    config.ghostUrl,
    config.ghostAdminKey,
    "v5.47.0"
  );

  const posts: {
    id: string;
    slug: string;
    updated_at?: string | null;
    published_at?: string | null;
    meta_description?: string | null;
    meta_title?: string | null;
    title?: string | null;
    og_description?: string | null;
    og_image?: string | null;
    feature_image?: string | null;
    excerpt?: string | null;
  }[] = [];

  const pagesResponse = await api.posts
    .browse({ limit: 10, page: 1 })
    .fields({
      id: true,
      slug: true,
      updated_at: true,
      published_at: true,
      meta_description: true,
      meta_title: true,
      title: true,
      og_description: true,
      og_image: true,
      feature_image: true,
      excerpt: true,
    })
    .fetch();
  if (!pagesResponse.success) {
    const errorString = pagesResponse.errors
      .map((error) => error.message)
      .join(", ");
    throw createError({
      statusCode: 500,
      statusMessage: errorString,
    });
  }

  for (let i = 1; i <= pagesResponse.meta.pagination.pages; i++) {
    const response = await api.posts
      .browse({ limit: 10, page: i, filter: "status:published" })
      .fields({
        id: true,
        slug: true,
        updated_at: true,
        published_at: true,
        meta_description: true,
        meta_title: true,
        title: true,
        og_description: true,
        og_image: true,
        feature_image: true,
        excerpt: true,
      })
      .fetch();
    if (!response.success) {
      throw new Error(response.errors.join(", "));
    }
    response.data.forEach((p) => {
      posts.push(p);
    });
  }

  return {
    posts,
    pagination: pagesResponse.meta.pagination,
  };
};
