const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId } = require('../utils')
const { APP_SECRET } = require('../../secrets.js')

async function signup(parent, args, context, info) {
  // 1
  const password = await bcrypt.hash(args.password, 10)
  // 2
  const user = await context.prisma.createUser({ ...args, password })

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 4
  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No such user found')
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 3
  return {
    token,
    user,
  }
}

function post(parent, args, context, info) {
  const userId = getUserId(context)
  return context.prisma.createPost({
    description: args.description,
    privacy: args.privacy,
    location: args.location,
    postedBy: { connect: { id: userId } },
  })
}

async function comment(parent, args, context, info) {
  const userId = getUserId(context)

  return context.prisma.createComment({
    text: args.text,
    user: { connect: { id: userId } },
    post: { connect: { id: args.postId } },
  })
}

module.exports = {
  signup,
  login,
  post,
  comment
}
