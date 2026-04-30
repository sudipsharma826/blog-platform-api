import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const token = req.headers.authorization;

    if (!token) return false;

    try {
      const decoded = jwt.verify(token, 'SECRET_KEY');
      req.user = decoded; // attach user
      return true;
    } catch (err) {
      return false;
    }
  }
}