import { TSGhostAdminAPI } from "@ts-ghost/admin-api";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw new Error("No slug provided!");
  }

  const config = useRuntimeConfig();

  const api = new TSGhostAdminAPI(
    config.ghostUrl,
    config.ghostAdminKey,
    "v5.47.0"
  );

  const response = await api.posts
    .read({ slug })
    .formats({ lexical: true, mobiledoc: true })
    .fetch();
  if (!response.success) {
    throw new Error(response.errors.join(", "));
  }

  if (response.data.visibility !== "public") {
    throw new Error("Post not public!");
  }

  const {
    authors,
    primary_author,
    comment_id,
    count,
    frontmatter,
    email_segment,
    email,
    newsletter,
    email_only,
    ...sanitized
  } = response.data;

  console.log(`[ghost] getPost: ${slug} (${response.data.title})`);

  return sanitized;
});
