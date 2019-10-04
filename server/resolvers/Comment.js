
function post(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).post()
}

function user(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).user()
}

module.exports = {
  post,
  user,
}
