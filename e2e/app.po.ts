export class ExpenseManagementPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('expense-management-app h1')).getText();
  }
}
