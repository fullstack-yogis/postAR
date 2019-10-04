
function newPostSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.post({ mutation_in: ['CREATED'] }).node()
}

const newPost = {
  subscribe: newPostSubscribe,
  resolve: payload => {
    return payload
  },
}

function newCommentSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.comment({ mutation_in: ['CREATED'] }).node()
}

const newComment = {
  subscribe: newCommentSubscribe,
  resolve: payload => {
    return payload
  },
}

module.exports = {
  newPost,
  newComment
}
