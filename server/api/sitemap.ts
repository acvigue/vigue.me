import { TSGhostAdminAPI } from "@ts-ghost/admin-api";

export default defineSitemapEventHandler(async (e) => {
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
    throw new Error(pagesResponse.errors.join(", "));
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

  const locs = posts.map((p: any) => {
    return {
      loc: `https://vigue.me/projects/${p.slug}`,
      lastmod: p.updated_at,
    };
  });

  for (let i = 1; i <= pagesResponse.meta.pagination.pages; i++) {
    locs.push({
      loc: `https://vigue.me/projects/${i}`,
    });
  }

  console.log(locs);

  return locs;
});
