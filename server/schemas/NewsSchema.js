const { buildSchema } = require('graphql');
exports.graphQLschema = buildSchema(`
  type Query {
    news: [News]
  }

  type Mutation {
    createNews(title: String!, short_description: String!, permanlink: String!, date: String!, news_source_id: String!,
      user_id: String!, category_id: String! ): News
  }

  type News {
    id: ID!
    title: String!
    short_description: String!
    permanlink: String!
    date: String!
    news_source_id: String!
    user_id: String!
    category_id: String!
  }`);