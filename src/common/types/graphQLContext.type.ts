import { CurrentUserPayload } from './current-user.type';

export interface GraphQLContext {
  req: {
    headers: {
      authorization?: string;
    };
    user?: CurrentUserPayload;
  };
}
