import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Theme } from '../enums/theme.enum';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeSelectorService {
  private _theme$ = new Subject<Theme>();
  theme$ = this._theme$.asObservable().pipe(map(theme => theme === Theme.DarkTheme));
  constructor() { }
  changeTheme(theme: Theme) {
    this._theme$.next(theme);
  }
}
