import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { CurrentUserPayload } from '../types/current-user.type';
import { GraphQLContext } from '../types/graphQLContext.type';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<GraphQLContext>();

    const req = gqlContext.req;
    const token = req.headers.authorization;

    if (!token) return false;

    try {
      const decoded = jwt.verify(token, 'SECRET_KEY') as CurrentUserPayload;

      req.user = decoded;
      return true;
    } catch {
      return false;
    }
  }
}
