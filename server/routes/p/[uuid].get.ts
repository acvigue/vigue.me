const uuidV4Regex
  = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i
const isValidV4UUID = (uuid: string) => uuidV4Regex.test(uuid)

/*
  * This file is a placeholder for the following route:
  *
  * /p/:uuid
  *
  * Used when previewing a post or page from the dashboard.
  * The UUID is validated and then used to redirect to the canonical URL for the post.
  */

export default defineEventHandler(async (event) => {
  const uuid = getRouterParam(event, 'uuid')

  if (!uuid)
    throw createError({
      statusCode: 400,
      statusMessage: 'No UUID provided!',
    })

  if (!isValidV4UUID(uuid))
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid UUID provided!',
    })

  return sendRedirect(event, `/posts/${uuid}`)
})
