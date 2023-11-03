// import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

// // Class implementing RouteReuseStrategy for custom route reusing logic.
// export class CustomReuseStrategy implements RouteReuseStrategy {
//   // Object to store routes with their DetachedRouteHandles.
//   // DetachedRouteHandles represent components that can be reattached without being recreated.
//   // The object keys are strings representing route paths, and the values are the handles or null.
//   private storedRoutes: { [key: string]: DetachedRouteHandle | null } = {};

//   // Determines if the route should be stored after it is deactivated.
//   // Always returns true, meaning every route will be stored upon deactivation.
//   shouldDetach(): boolean {
//     return true; // Detach all routes for reuse.
//   }

//   // Stores the provided handle using the route's path as the key.
//   // This method is called if shouldDetach returns true.
//   store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
//     const routeKey = this.getRouteKey(route); // Generate the unique route key.
//     this.storedRoutes[routeKey] = handle; // Store the handle.
//   }

//   // Checks if there is a stored route that can be reattached for the current navigation.
//   // This is called when entering a route to decide if it should be reattached instead of creating a new instance.
//   shouldAttach(route: ActivatedRouteSnapshot): boolean {
//     const routeKey = this.getRouteKey(route); // Generate the unique route key.
//     return !!this.storedRoutes[routeKey]; // Check if a handle for the routeKey exists.
//   }

//   // Retrieves the stored handle for the current route if it exists.
//   // This method is called after shouldAttach returns true.
//   retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
//     const routeKey = this.getRouteKey(route); // Generate the unique route key.
//     return this.storedRoutes[routeKey] ?? null; // Return the stored handle or null if it does not exist.
//   }

//   // Decides if a route should be reused.
//   // It compares the keys of the future and current route to determine if they are the same, not considering the language part.
//   shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
//     return this.getRouteKey(curr) === this.getRouteKey(future); // Compare route keys.
//   }

//   // A helper method to generate a unique key for a route that doesn't include the language part.
//   // This key is used to store and retrieve the handles from the storedRoutes object.
//   private getRouteKey(route: ActivatedRouteSnapshot): string {
//     // Obtains all url segments from the full path tree and maps them to their path strings.
//     const segments = route.pathFromRoot.flatMap((r) => r.url).map((segment) => segment.path);
//     // Assumes that the first segment is the language part and removes it if more than one segment exists.
//     if (segments.length > 1) {
//       segments.shift(); // Removes the language segment.
//     }
//     // Joins the remaining segments to form the unique key for storing and retrieving routes.
//     return segments.join('/');
//   }
// }
