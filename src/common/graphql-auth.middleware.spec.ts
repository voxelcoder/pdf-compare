import { GraphQLAuthMiddleware } from './graphql-auth.middleware';

describe('GraphQLAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new GraphQLAuthMiddleware()).toBeDefined();
  });
});
