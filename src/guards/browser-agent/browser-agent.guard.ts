import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserAgentGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.getArgByIndex(0);
    const userAgent = req.headers['user-agent'];
    console.log('___browser___', userAgent);

    const isAllowe = (userAgent === 'google/chrome');

    if(!isAllowe) throw new HttpException('BROWSER_AGENT_INVALID', HttpStatus.BAD_REQUEST);

    return isAllowe;
  }
}
