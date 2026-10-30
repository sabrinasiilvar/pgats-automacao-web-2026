require('cypress-xpath');

describe('Automation Exercise - XPath', () => {
  it('Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://www.automationexercise.com/');
    cy.xpath("//a[contains(@href, '/login')]").click();

    const email = `pgats-xpath-${Date.now()}@mail.com`;

    cy.xpath("//input[@data-qa='signup-name']").type('PGATS XPath');
    cy.xpath("//input[@data-qa='signup-email']").type(email);
    cy.xpath("//button[@data-qa='signup-button']").click();

    cy.xpath("//form[@action='/signup']").should('be.visible');

    cy.xpath("//input[@id='id_gender1']").check({ force: true });
    cy.xpath("//input[@data-qa='password']").type('Senha123!');
    cy.xpath("//select[@id='days']").select('10');
    cy.xpath("//select[@id='months']").select('January');
    cy.xpath("//select[@id='years']").select('1990');
    cy.xpath("//input[@id='newsletter']").check({ force: true });
    cy.xpath("//input[@id='optin']").check({ force: true });
    cy.xpath("//input[@data-qa='first_name']").type('PGATS');
    cy.xpath("//input[@data-qa='last_name']").type('XPath');
    cy.xpath("//input[@data-qa='company']").type('PGATS');
    cy.xpath("//input[@data-qa='address']").type('Example Address');
    cy.xpath("//select[@data-qa='country']").select('United States');
    cy.xpath("//input[@data-qa='state']").type('California');
    cy.xpath("//input[@data-qa='city']").type('San Francisco');
    cy.xpath("//input[@data-qa='zipcode']").type('12345');
    cy.xpath("//input[@data-qa='mobile_number']").type('999999999');
    cy.xpath("//button[@data-qa='create-account']").click();

    cy.xpath("//*[contains(text(), 'Account Created!')]").should('be.visible');
    cy.xpath("//*[@data-qa='continue-button']").click();
  });

  it('Efetuar Login de Usuário com email e senha corretos', () => {
    cy.visit('https://www.automationexercise.com/');
    cy.xpath("//a[contains(@href, '/login')]").click();

    const email = `pgats-xpath-login-${Date.now()}@mail.com`;

    cy.xpath("//input[@data-qa='signup-name']").type('PGATS User');
    cy.xpath("//input[@data-qa='signup-email']").type(email);
    cy.xpath("//button[@data-qa='signup-button']").click();

    cy.xpath("//form[@action='/signup']").should('be.visible');

    cy.xpath("//input[@id='id_gender1']").check({ force: true });
    cy.xpath("//input[@data-qa='password']").type('Senha123!');
    cy.xpath("//select[@id='days']").select('15');
    cy.xpath("//select[@id='months']").select('March');
    cy.xpath("//select[@id='years']").select('1995');
    cy.xpath("//input[@id='newsletter']").check({ force: true });
    cy.xpath("//input[@id='optin']").check({ force: true });
    cy.xpath("//input[@data-qa='first_name']").type('PGATS');
    cy.xpath("//input[@data-qa='last_name']").type('User');
    cy.xpath("//input[@data-qa='company']").type('PGATS');
    cy.xpath("//input[@data-qa='address']").type('Example Address');
    cy.xpath("//select[@data-qa='country']").select('United States');
    cy.xpath("//input[@data-qa='state']").type('California');
    cy.xpath("//input[@data-qa='city']").type('San Francisco');
    cy.xpath("//input[@data-qa='zipcode']").type('12345');
    cy.xpath("//input[@data-qa='mobile_number']").type('999999999');
    cy.xpath("//button[@data-qa='create-account']").click();

    cy.xpath("//*[contains(text(), 'Account Created!')]").should('be.visible');
    cy.xpath("//*[@data-qa='continue-button']").click();

    cy.xpath("//a[contains(@href, '/logout')]").click();
    cy.xpath("//div[contains(@class, 'login-form')]").should('be.visible');

    cy.xpath("//input[@data-qa='login-email']").type(email);
    cy.xpath("//input[@data-qa='login-password']").type('Senha123!');
    cy.xpath("//button[@data-qa='login-button']").click();

    cy.xpath("//*[contains(text(), 'Logged in as')]").should('be.visible');
  });

  it('Efetuar Login de Usuário email e senha INCORRETOS', () => {
    cy.visit('https://www.automationexercise.com/login');
    cy.xpath("//input[@data-qa='login-email']").type('email_invalido@teste.com');
    cy.xpath("//input[@data-qa='login-password']").type('senhaerrada');
    cy.xpath("//button[@data-qa='login-button']").click();

    cy.xpath("//*[contains(text(), 'Your email or password is incorrect!')]").should('be.visible');
  });

  it('Efetuar Logout', () => {
    cy.visit('https://www.automationexercise.com/');
    cy.xpath("//a[contains(@href, '/login')]").click();

    const email = `pgats-xpath-logout-${Date.now()}@mail.com`;

    cy.xpath("//input[@data-qa='signup-name']").type('PGATS Logout');
    cy.xpath("//input[@data-qa='signup-email']").type(email);
    cy.xpath("//button[@data-qa='signup-button']").click();

    cy.xpath("//form[@action='/signup']").should('be.visible');

    cy.xpath("//input[@id='id_gender1']").check({ force: true });
    cy.xpath("//input[@data-qa='password']").type('Senha123!');
    cy.xpath("//select[@id='days']").select('20');
    cy.xpath("//select[@id='months']").select('April');
    cy.xpath("//select[@id='years']").select('1992');
    cy.xpath("//input[@id='newsletter']").check({ force: true });
    cy.xpath("//input[@id='optin']").check({ force: true });
    cy.xpath("//input[@data-qa='first_name']").type('PGATS');
    cy.xpath("//input[@data-qa='last_name']").type('Logout');
    cy.xpath("//input[@data-qa='company']").type('PGATS');
    cy.xpath("//input[@data-qa='address']").type('Example Address');
    cy.xpath("//select[@data-qa='country']").select('United States');
    cy.xpath("//input[@data-qa='state']").type('California');
    cy.xpath("//input[@data-qa='city']").type('San Francisco');
    cy.xpath("//input[@data-qa='zipcode']").type('12345');
    cy.xpath("//input[@data-qa='mobile_number']").type('999999999');
    cy.xpath("//button[@data-qa='create-account']").click();

    cy.xpath("//*[contains(text(), 'Account Created!')]").should('be.visible');
    cy.xpath("//*[@data-qa='continue-button']").click();

    cy.xpath("//a[contains(@href, '/logout')]").click();
    cy.xpath("//div[contains(@class, 'login-form')]").should('be.visible');
    cy.url().should('include', '/login');
  });

  it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
    cy.visit('https://www.automationexercise.com/');
    cy.xpath("//a[contains(@href, '/login')]").click();

    const email = `pgats-xpath-repeat-${Date.now()}@mail.com`;

    cy.xpath("//input[@data-qa='signup-name']").type('PGATS Repetido');
    cy.xpath("//input[@data-qa='signup-email']").type(email);
    cy.xpath("//button[@data-qa='signup-button']").click();

    cy.xpath("//form[@action='/signup']").should('be.visible');

    cy.xpath("//input[@id='id_gender1']").check({ force: true });
    cy.xpath("//input[@data-qa='password']").type('Senha123!');
    cy.xpath("//select[@id='days']").select('12');
    cy.xpath("//select[@id='months']").select('July');
    cy.xpath("//select[@id='years']").select('1988');
    cy.xpath("//input[@data-qa='first_name']").type('PGATS');
    cy.xpath("//input[@data-qa='last_name']").type('Repetido');
    cy.xpath("//input[@data-qa='company']").type('PGATS');
    cy.xpath("//input[@data-qa='address']").type('Example Address');
    cy.xpath("//select[@data-qa='country']").select('United States');
    cy.xpath("//input[@data-qa='state']").type('California');
    cy.xpath("//input[@data-qa='city']").type('San Francisco');
    cy.xpath("//input[@data-qa='zipcode']").type('12345');
    cy.xpath("//input[@data-qa='mobile_number']").type('999999999');
    cy.xpath("//button[@data-qa='create-account']").click();

    cy.xpath("//*[contains(text(), 'Account Created!')]").should('be.visible');
    cy.xpath("//*[@data-qa='continue-button']").click();

    cy.xpath("//a[contains(@href, '/logout')]").click();
    cy.xpath("//a[contains(@href, '/login')]").click();

    cy.xpath("//input[@data-qa='signup-name']").type('PGATS Repetido');
    cy.xpath("//input[@data-qa='signup-email']").type(email);
    cy.xpath("//button[@data-qa='signup-button']").click();

    cy.xpath("//*[contains(text(), 'Email Address already exist!')]").should('be.visible');
  });
});
