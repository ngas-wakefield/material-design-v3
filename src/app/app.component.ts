import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, mergeMap, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';

type ThemeType = 'light' | 'dark'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, DropdownMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
  ) {}
  theme!: ThemeType;
  subscription: Subscription | undefined;
  title = 'components';

  ngOnInit() {
    this.theme = 'light';
    this.subscriptionRoutes();
    this.setBodyClassByTheme();
  }

  onSelectTheme(theme: ThemeType) {
    this.theme = theme;
    this.setBodyClassByTheme();
  }

  setBodyClassByTheme() {
    if (this.theme === 'light') {
      document.body.classList.remove(...Array.from(document.body.classList));
      document.body.classList.add('base');
      document.body.classList.add('light');
    }

    if (this.theme === 'dark') {
      document.body.classList.remove(...Array.from(document.body.classList));
      document.body.classList.add('base');
      document.body.classList.add('dark');
    }
  }
  subscriptionRoutes(){
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
      map((data: any) => {
          document.body.classList.remove('base', 'dark', 'light');
          document.body.classList.add('base');
          document.body.classList.toggle('dark', data?.theme === 'dark');
          document.body.classList.toggle('light', !data?.theme || data?.theme === 'light');
        return Object.prototype.hasOwnProperty.call(data, 'pageTitle') ? data.pageTitle : this.title;
      }),
    )
    .subscribe((routeTitle: any) => this.titleService.setTitle(`${this.title} | ${routeTitle}`));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
