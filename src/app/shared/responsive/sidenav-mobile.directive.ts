import { Directive, OnDestroy, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatSidenav } from "@angular/material";
import { takeUntil, map, filter, tap } from "rxjs/operators";
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Directive({
  selector: "[dMobileSidenav]"
})
export class SidenavMobileDirective implements OnInit, OnDestroy {
  private ondestroy = new Subject<void>();

  constructor(
    private iRouter: Router,
    private iBreakpointObserver: BreakpointObserver,
    private iMatSidenav: MatSidenav
  ) {}

  ngOnInit() {
    const breakpoint$ = this.iBreakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        takeUntil(this.ondestroy),
        map(({ matches }) => !matches),
        tap(() => console.log("breakpoint"))
      );

    breakpoint$.subscribe(permanent => {
      this.iMatSidenav.opened = permanent;
    });

    this.iRouter.events
      .pipe(
        takeUntil(this.ondestroy),
        filter(() => this.iMatSidenav.mode === "over"),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => this.iMatSidenav.close());
  }

  ngOnDestroy(): void {
    this.ondestroy.next();
    this.ondestroy.complete();
  }
}
