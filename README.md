# NhtsaVehicleExplorer

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.





// Optimistic update pattern for instant UI feedback
export class VehicleUpdateService {
  updateVehicle(id: number, changes: Partial<Vehicle>): Observable<Vehicle> {
    // Optimistically update UI immediately
    const currentData = this.store.select(selectVehicleEntities);
    this.store.dispatch(VehicleActions.optimisticUpdate({ id, changes }));

    // Perform actual API call
    return this.api.updateVehicle(id, changes).pipe(
      tap(updatedVehicle => {
        // Confirm with server response
        this.store.dispatch(VehicleActions.updateSuccess({ vehicle: updatedVehicle }));
      }),
      catchError(error => {
        // Rollback optimistic update on failure
        this.store.dispatch(VehicleActions.updateFailure({ id }));
        return throwError(() => error);
      })
    );
  }
}

// Request deduplication pattern
export class RequestDeduplicationService {
  private pendingRequests = new Map<string, Observable<any>>();

  makeRequest<T>(url: string): Observable<T> {
    // Return existing request if in flight
    if (this.pendingRequests.has(url)) {
      return this.pendingRequests.get(url)!;
    }

    // Create new request and cache it
    const request$ = this.http.get<T>(url).pipe(
      finalize(() => this.pendingRequests.delete(url)),
      shareReplay(1)
    );

    this.pendingRequests.set(url, request$);
    return request$;
  }
}