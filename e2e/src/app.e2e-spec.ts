import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message saying Restaurant Con fusion', () => {
    page.navigateTo('/');
    expect(page.getTitleText('app-root h1')).toEqual('Restaurant Con Fusion');
  });

  it('should navigate to about us page ', () => {
    page.navigateTo('/');
    const navLink = page.getAllElements('a').get(1);
    navLink.click();
    expect(page.getParagraphText('h3')).toBe('About Us')
  })

  it('should enter a new comment to the dish', () => {
    page.navigateTo('/dishdetail/0');
    const author = page.getElement("input[type=text]");
    author.sendKeys('Test author');
    const comment = page.getElement("textarea");
    comment.sendKeys('Test Comment');
    const submitbutton = page.getElement('button[type=submit]');
    submitbutton.click();

    browser.pause();
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
