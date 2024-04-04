import getAllPosts from "./posts/all.get";

export default defineSitemapEventHandler(async (e) => {
  const allPosts = await getAllPosts(e);

  const locs: any = allPosts.posts.map((p: any) => {
    return {
      loc: `https://vigue.me/projects/${p.slug}`,
      lastmod: p.updated_at,
    };
  });

  for (let i = 1; i <= allPosts.pagination.pages; i++) {
    locs.push({
      loc: `https://vigue.me/projects/${i}`,
    });
  }

  console.log(locs);

  return locs;
});
