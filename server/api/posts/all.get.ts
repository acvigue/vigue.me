import { TSGhostAdminAPI } from "@ts-ghost/admin-api";

export default defineEventHandler(async (e) => {
  const config = useRuntimeConfig();

  const api = new TSGhostAdminAPI(
    config.ghostUrl,
    config.ghostAdminKey,
    "v5.47.0"
  );

  const posts: any = [];

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
      .flatMap((error) => error.message)
      .join(", ");
    throw new Error(errorString);
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
});
