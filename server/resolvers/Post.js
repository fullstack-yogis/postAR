
function postedBy(parent, args, context) {
  return context.prisma.post({ id: parent.id }).postedBy()
}

function comments(parent, args, context) {
  return context.prisma.post({ id: parent.id }).comments()
}

module.exports = {
  postedBy,
  comments
}
