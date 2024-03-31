import { TSGhostAdminAPI } from "@ts-ghost/admin-api";

const uuidV4Regex =
  /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
const isValidV4UUID = (uuid: string) => uuidV4Regex.test(uuid);

export default defineEventHandler(async (event) => {
  const uuid = getRouterParam(event, "uuid");

  if (!uuid) {
    throw new Error("No uuid provided!");
  }

  if (!isValidV4UUID(uuid)) {
    throw new Error("Invalid UUID!");
  }

  const config = useRuntimeConfig();

  const api = new TSGhostAdminAPI(
    config.ghostUrl,
    config.ghostAdminKey,
    "v5.47.0"
  );

  const response = await api.posts
    .browse({ filter: "status:draft" })
    .fields({ uuid: true, id: true })
    .fetch();

  if (!response.success) {
    throw new Error(response.errors.join(", "));
  }

  const draftPost = response.data.find((post) => post.uuid === uuid);
  if (!draftPost) {
    throw new Error("UUID not a draft post!");
  }

  return sendRedirect(event, `/posts/${draftPost.id}?preview=true`);
});
