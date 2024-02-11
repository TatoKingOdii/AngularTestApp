import {HttpInterceptorFn} from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('REQUEST', req)
  return next(req);
};
