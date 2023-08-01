export async function fetchPosts(route) {
  const answer = await fetch(`${route}`)
  const data = await answer.json()
  return data
}