import { FrontEndAppPage } from './app.po';

describe('front-end-app App', function() {
  let page: FrontEndAppPage;

  beforeEach(() => {
    page = new FrontEndAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
