module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.8). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateComment {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Comment {
  id: ID!
  text: String!
  post: Post!
  user: User!
}

type CommentConnection {
  pageInfo: PageInfo!
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  id: ID
  text: String!
  post: PostCreateOneWithoutCommentsInput!
  user: UserCreateOneWithoutCommentsInput!
}

input CommentCreateManyWithoutPostInput {
  create: [CommentCreateWithoutPostInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateManyWithoutUserInput {
  create: [CommentCreateWithoutUserInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateWithoutPostInput {
  id: ID
  text: String!
  user: UserCreateOneWithoutCommentsInput!
}

input CommentCreateWithoutUserInput {
  id: ID
  text: String!
  post: PostCreateOneWithoutCommentsInput!
}

type CommentEdge {
  node: Comment!
  cursor: String!
}

enum CommentOrderByInput {
  id_ASC
  id_DESC
  text_ASC
  text_DESC
}

type CommentPreviousValues {
  id: ID!
  text: String!
}

input CommentScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  AND: [CommentScalarWhereInput!]
  OR: [CommentScalarWhereInput!]
  NOT: [CommentScalarWhereInput!]
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment
  updatedFields: [String!]
  previousValues: CommentPreviousValues
}

input CommentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CommentWhereInput
  AND: [CommentSubscriptionWhereInput!]
  OR: [CommentSubscriptionWhereInput!]
  NOT: [CommentSubscriptionWhereInput!]
}

input CommentUpdateInput {
  text: String
  post: PostUpdateOneRequiredWithoutCommentsInput
  user: UserUpdateOneRequiredWithoutCommentsInput
}

input CommentUpdateManyDataInput {
  text: String
}

input CommentUpdateManyMutationInput {
  text: String
}

input CommentUpdateManyWithoutPostInput {
  create: [CommentCreateWithoutPostInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  set: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutPostInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutPostInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyWithoutUserInput {
  create: [CommentCreateWithoutUserInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  set: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyWithWhereNestedInput {
  where: CommentScalarWhereInput!
  data: CommentUpdateManyDataInput!
}

input CommentUpdateWithoutPostDataInput {
  text: String
  user: UserUpdateOneRequiredWithoutCommentsInput
}

input CommentUpdateWithoutUserDataInput {
  text: String
  post: PostUpdateOneRequiredWithoutCommentsInput
}

input CommentUpdateWithWhereUniqueWithoutPostInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutPostDataInput!
}

input CommentUpdateWithWhereUniqueWithoutUserInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutUserDataInput!
}

input CommentUpsertWithWhereUniqueWithoutPostInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutPostDataInput!
  create: CommentCreateWithoutPostInput!
}

input CommentUpsertWithWhereUniqueWithoutUserInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutUserDataInput!
  create: CommentCreateWithoutUserInput!
}

input CommentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  post: PostWhereInput
  user: UserWhereInput
  AND: [CommentWhereInput!]
  OR: [CommentWhereInput!]
  NOT: [CommentWhereInput!]
}

input CommentWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createComment(data: CommentCreateInput!): Comment!
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  updateManyComments(data: CommentUpdateManyMutationInput!, where: CommentWhereInput): BatchPayload!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  deleteComment(where: CommentWhereUniqueInput!): Comment
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  createPost(data: PostCreateInput!): Post!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateManyPosts(data: PostUpdateManyMutationInput!, where: PostWhereInput): BatchPayload!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  deletePost(where: PostWhereUniqueInput!): Post
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Post {
  id: ID!
  description: String!
  privacy: Boolean!
  location: String!
  postedBy: User!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  id: ID
  description: String!
  privacy: Boolean!
  location: String!
  postedBy: UserCreateOneWithoutPostsInput!
  comments: CommentCreateManyWithoutPostInput
}

input PostCreateManyWithoutPostedByInput {
  create: [PostCreateWithoutPostedByInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateOneWithoutCommentsInput {
  create: PostCreateWithoutCommentsInput
  connect: PostWhereUniqueInput
}

input PostCreateWithoutCommentsInput {
  id: ID
  description: String!
  privacy: Boolean!
  location: String!
  postedBy: UserCreateOneWithoutPostsInput!
}

input PostCreateWithoutPostedByInput {
  id: ID
  description: String!
  privacy: Boolean!
  location: String!
  comments: CommentCreateManyWithoutPostInput
}

type PostEdge {
  node: Post!
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  description_ASC
  description_DESC
  privacy_ASC
  privacy_DESC
  location_ASC
  location_DESC
}

type PostPreviousValues {
  id: ID!
  description: String!
  privacy: Boolean!
  location: String!
}

input PostScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  privacy: Boolean
  privacy_not: Boolean
  location: String
  location_not: String
  location_in: [String!]
  location_not_in: [String!]
  location_lt: String
  location_lte: String
  location_gt: String
  location_gte: String
  location_contains: String
  location_not_contains: String
  location_starts_with: String
  location_not_starts_with: String
  location_ends_with: String
  location_not_ends_with: String
  AND: [PostScalarWhereInput!]
  OR: [PostScalarWhereInput!]
  NOT: [PostScalarWhereInput!]
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostWhereInput
  AND: [PostSubscriptionWhereInput!]
  OR: [PostSubscriptionWhereInput!]
  NOT: [PostSubscriptionWhereInput!]
}

input PostUpdateInput {
  description: String
  privacy: Boolean
  location: String
  postedBy: UserUpdateOneRequiredWithoutPostsInput
  comments: CommentUpdateManyWithoutPostInput
}

input PostUpdateManyDataInput {
  description: String
  privacy: Boolean
  location: String
}

input PostUpdateManyMutationInput {
  description: String
  privacy: Boolean
  location: String
}

input PostUpdateManyWithoutPostedByInput {
  create: [PostCreateWithoutPostedByInput!]
  delete: [PostWhereUniqueInput!]
  connect: [PostWhereUniqueInput!]
  set: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutPostedByInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutPostedByInput!]
  deleteMany: [PostScalarWhereInput!]
  updateMany: [PostUpdateManyWithWhereNestedInput!]
}

input PostUpdateManyWithWhereNestedInput {
  where: PostScalarWhereInput!
  data: PostUpdateManyDataInput!
}

input PostUpdateOneRequiredWithoutCommentsInput {
  create: PostCreateWithoutCommentsInput
  update: PostUpdateWithoutCommentsDataInput
  upsert: PostUpsertWithoutCommentsInput
  connect: PostWhereUniqueInput
}

input PostUpdateWithoutCommentsDataInput {
  description: String
  privacy: Boolean
  location: String
  postedBy: UserUpdateOneRequiredWithoutPostsInput
}

input PostUpdateWithoutPostedByDataInput {
  description: String
  privacy: Boolean
  location: String
  comments: CommentUpdateManyWithoutPostInput
}

input PostUpdateWithWhereUniqueWithoutPostedByInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutPostedByDataInput!
}

input PostUpsertWithoutCommentsInput {
  update: PostUpdateWithoutCommentsDataInput!
  create: PostCreateWithoutCommentsInput!
}

input PostUpsertWithWhereUniqueWithoutPostedByInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutPostedByDataInput!
  create: PostCreateWithoutPostedByInput!
}

input PostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  privacy: Boolean
  privacy_not: Boolean
  location: String
  location_not: String
  location_in: [String!]
  location_not_in: [String!]
  location_lt: String
  location_lte: String
  location_gt: String
  location_gte: String
  location_contains: String
  location_not_contains: String
  location_starts_with: String
  location_not_starts_with: String
  location_ends_with: String
  location_not_ends_with: String
  postedBy: UserWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  AND: [PostWhereInput!]
  OR: [PostWhereInput!]
  NOT: [PostWhereInput!]
}

input PostWhereUniqueInput {
  id: ID
}

type Query {
  comment(where: CommentWhereUniqueInput!): Comment
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  name: String!
  email: String!
  password: String!
  posts: PostCreateManyWithoutPostedByInput
  comments: CommentCreateManyWithoutUserInput
}

input UserCreateOneWithoutCommentsInput {
  create: UserCreateWithoutCommentsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutCommentsInput {
  id: ID
  name: String!
  email: String!
  password: String!
  posts: PostCreateManyWithoutPostedByInput
}

input UserCreateWithoutPostsInput {
  id: ID
  name: String!
  email: String!
  password: String!
  comments: CommentCreateManyWithoutUserInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  posts: PostUpdateManyWithoutPostedByInput
  comments: CommentUpdateManyWithoutUserInput
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
}

input UserUpdateOneRequiredWithoutCommentsInput {
  create: UserCreateWithoutCommentsInput
  update: UserUpdateWithoutCommentsDataInput
  upsert: UserUpsertWithoutCommentsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  update: UserUpdateWithoutPostsDataInput
  upsert: UserUpsertWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutCommentsDataInput {
  name: String
  email: String
  password: String
  posts: PostUpdateManyWithoutPostedByInput
}

input UserUpdateWithoutPostsDataInput {
  name: String
  email: String
  password: String
  comments: CommentUpdateManyWithoutUserInput
}

input UserUpsertWithoutCommentsInput {
  update: UserUpdateWithoutCommentsDataInput!
  create: UserCreateWithoutCommentsInput!
}

input UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput!
  create: UserCreateWithoutPostsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    