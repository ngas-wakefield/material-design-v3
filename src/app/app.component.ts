import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, mergeMap, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
  ) {}
  subscription: Subscription | undefined;
  title = 'components';

  ngOnInit() {
    this.subscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route: any) => {
          while (route.firstChild) {
            // eslint-disable-next-line no-param-reassign
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route: any) => route.data),
        // eslint-disable-next-line no-prototype-builtins
        map((data: any) => (data.hasOwnProperty('pageTitle') ? data.pageTitle : this.title)),
      )
      .subscribe((routeTitle: any) => this.titleService.setTitle(`${this.title} | ${routeTitle}`));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
