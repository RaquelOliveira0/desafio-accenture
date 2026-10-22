Feature: Cypress example application

  Scenario: Open the example application
    Given I open the Cypress example application
    Then the page title contains "Kitchen Sink"