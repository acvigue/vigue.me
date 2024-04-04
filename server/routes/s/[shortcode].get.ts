export default defineEventHandler((event) => {
  const shortcode = getRouterParam(event, 'shortcode')

  return `Hello, ${shortcode}!`
})
