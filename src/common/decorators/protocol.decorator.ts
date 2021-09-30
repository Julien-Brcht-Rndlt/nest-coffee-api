import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Protocol = createParamDecorator(
  (defaultProtocol: string, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return defaultProtocol ? defaultProtocol : request.protocol;
  },
);
