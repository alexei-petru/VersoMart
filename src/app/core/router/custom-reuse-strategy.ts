import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  // Create a method to construct a unique key ignoring the language part
  private createRouteKey(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig?.path) {
      return route.routeConfig.path.split('/').slice(1).join('/');
    }
    return '';
  }

  shouldDetach(): boolean {
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const routeKey = this.createRouteKey(route);
    this.handlers[routeKey] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const routeKey = this.createRouteKey(route);
    return !!this.handlers[routeKey];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const routeKey = this.createRouteKey(route);
    return this.handlers[routeKey] || null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return this.createRouteKey(future) === this.createRouteKey(curr);
  }
}
