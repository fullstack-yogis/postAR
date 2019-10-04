
function posts(parent, args, context) {
  return context.prisma.user({ id: parent.id }).posts()
}

function comments(parent, args, context) {
  return context.prisma.user({ id: parent.id }).comments()
}

module.exports = {
  posts,
  comments
}
