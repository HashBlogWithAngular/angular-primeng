import { SanitizerHtmlPipe } from './sanitizer-html.pipe';

describe('SanitizerHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizerHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
