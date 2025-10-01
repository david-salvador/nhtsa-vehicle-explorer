import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry, mergeMap } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry({
        count: 3,
        delay: (error: HttpErrorResponse, retryCount: number) => {
          // Don't retry client errors (4xx)
          if (error.status >= 400 && error.status < 500) {
            return throwError(() => error);
          }

          // Exponential backoff: 1s, 2s, 4s
          const delayMs = Math.pow(2, retryCount) * 1000;
          console.log(`Retry attempt ${retryCount} after ${delayMs}ms`);
          
          return timer(delayMs);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        
        const errorMessage = error.error?.message || 
                           error.statusText || 
                           'An unknown error occurred';
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}