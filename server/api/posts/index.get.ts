import { TSGhostAdminAPI } from "@ts-ghost/admin-api";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const api = new TSGhostAdminAPI(
    config.ghostUrl,
    config.ghostAdminKey,
    "v5.47.0"
  );

  const { page, featured } = getQuery(event);

  const pageNum = page ? parseInt(page.toString()) : 1;

  if (featured) {
    const response = await api.posts
      .browse({ filter: `featured:true+status:published` })
      .formats({ lexical: true, mobiledoc: true })
      .fetch();
    if (!response.success) {
      throw new Error(response.errors.join(", "));
    }

    const postsResponse = {
      posts: response.data,
      pagination: {
        page: pageNum,
        pages: response.meta.pagination.pages,
        totalPosts: response.meta.pagination.total,
      },
    };

    return postsResponse;
  }

  const response = await api.posts
    .browse({ limit: 10, page: pageNum, filter: "status:published" })
    .formats({ lexical: true, mobiledoc: true })
    .fetch();
  if (!response.success) {
    throw new Error(response.errors.join(", "));
  }

  const postsResponse = {
    posts: response.data,
    pagination: {
      page: pageNum,
      pages: response.meta.pagination.pages,
      totalPosts: response.meta.pagination.total,
    },
  };

  console.log(
    `[ghost] getPosts: page ${pageNum} (${response.meta.pagination.total} total)`
  );

  return postsResponse;
});
