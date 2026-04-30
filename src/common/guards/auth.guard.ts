import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { CurrentUserPayload } from '../types/current-user.type';
import { GraphQLContext } from '../types/graphQLContext.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<GraphQLContext>();

    const req = gqlContext.req;
    const authHeader = req.headers.authorization;

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    const secretKey = this.configService.get<string>('SECRET_KEY');

    if (!token || !secretKey) return false;

    try {
      const decoded = jwt.verify(token, secretKey) as CurrentUserPayload;

      req.user = decoded;
      return true;
    } catch {
      return false;
    }
  }
}
