import { GraphQLAuthGuard } from './graphql-auth.guard';

describe('GraphQLAuthGuard', () => {
  it('should be defined', () => {
    expect(new GraphQLAuthGuard()).toBeDefined();
  });
});
