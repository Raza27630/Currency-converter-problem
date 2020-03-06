import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeSelectorService } from 'src/app/injectables/theme-selector.service';
import { Theme } from 'src/app/enums/theme.enum';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtilityComponent {
  theme = Theme;
  constructor(private readonly translateService: TranslateService,
    private readonly themeService: ThemeSelectorService) { }

  onLanguageChange(lang: string) {
    this.translateService.use(lang);
  }
  onThemeChange(theme: Theme) {
    this.themeService.changeTheme(theme);
  }
}
