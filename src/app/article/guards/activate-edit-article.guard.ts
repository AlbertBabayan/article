import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

export function activateEditArticle(): CanActivateFn {
  return (route: ActivatedRouteSnapshot) => {
    return !!+route.params.id;
  }
}
