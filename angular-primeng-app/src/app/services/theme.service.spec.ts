import {TestBed} from '@angular/core/testing';

import {ThemeService} from './theme.service';
import {DOCUMENT} from '@angular/common';

describe('ThemeService', () => {
  let service: ThemeService;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        {provide: Document, useValue: document}
      ]
    });
    service = TestBed.inject(ThemeService);
    document = TestBed.inject(DOCUMENT)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the theme correctly', () => {
    const theme = 'light';
    const themeLink = { href: '' } as HTMLLinkElement;
    spyOn(document, 'getElementById').and.returnValue(themeLink);

    service.setTheme(theme);

    expect(service.activeTheme).toEqual(theme);
    expect(themeLink.href).toEqual(theme + '.css');
  });
});
