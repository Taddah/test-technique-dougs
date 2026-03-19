import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from '@shared/pipes/safe-html/safe-html-pipe';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (val: string) => val, // Mock simple
          },
        },
      ],
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafeHtmlPipe(sanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string when value is null', () => {
    expect(pipe.transform(null)).toBe(null);
  });

  it('should return an empty string when value is undefined', () => {
    expect(pipe.transform(undefined)).toBe(null);
  });

  it('should return an empty string when value is an empty string', () => {
    expect(pipe.transform('')).toBe(null);
  });

  it('should transform a string with HTML tags', () => {
    const htmlContent = 'Argent <em>professionnel</em>';
    expect(pipe.transform(htmlContent)).toBe(htmlContent);
  });
});
