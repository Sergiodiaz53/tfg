import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HistoryDetail } from '../api';
import { HistoryService } from '../services/history/history.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HistoryGuard implements Resolve<HistoryDetail> {
    constructor(private router: Router, private historyService: HistoryService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return this.historyService.get(+route.paramMap.get('id'))
            .pipe(
                catchError(() => {
                    return this.router.navigate(['../']);
                }),
                map(() => null)
            )
    }
}
