import { ActivatedRoute } from '@angular/router';

export function getComponentRouteUrl(route: ActivatedRoute) {
    const url = route.snapshot.pathFromRoot
        .map(r => {
            return r.url.join('/');
        })
        .filter(r => !!r)
        .join('/');

    return `/${url}`;
}
