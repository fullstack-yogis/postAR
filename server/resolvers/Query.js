
async function feed(parent, args, context, info) {
  const posts = await context.prisma.posts()
  return posts
}

module.exports = {
  feed,
}

