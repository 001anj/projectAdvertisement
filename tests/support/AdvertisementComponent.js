const { I } = inject();
const assert = require('assert').strict;
const { faker } = require('@faker-js/faker');

class AdvertisementComponent {
  constructor() {

    // Test data
    this.randomRooms = "2";
    this.randomPrice = "400";
    this.streetName = "Am Postbahnhof 17";

    // Add form page
    this.plusIcon = '.al-add__button';
    this.addFormUrl = 'https://admin-advertisement.herokuapp.com/advertisement/new';
    this.nameField = locate('[name="name"]')
    this.streetField = locate('[name="street"]')
    this.roomsField = locate('[name="rooms"]');
    this.priceField = locate('[name="price"]');
    this.statusCheckBox = 'form > md-checkbox';
    this.saveButton = locate('button:nth-child(2)');
    this.cancelButton = locate('button:nth-child(1)');
    this.disabledSaveButton = locate('[ng-disabled="$ctrl.disableSave"]');

    // Column
    this.streetColumn = 'tr > td:nth-child(2)';
    this.roomsColumn = 'tr > td:nth-child(3)';
    this.priceColumn = 'tr > td:nth-child(4)';
    this.statusColumn = 'tr > td:nth-child(5)';

    // Warning confirmation box
    this.warningDialogBox = '.md-dialog-content';
    this.okConfirmationButton = '.md-confirm-button';
    this.cancelConfirmationButton = '.md-cancel-button';

    // Validation error message
    this.nameErrorMessage = locate('[ng-messages="$ctrl.advertisementForm.name.$error"]').withText("This is required");
    this.priceErrorMessage = locate('[ng-messages="$ctrl.advertisementForm.price.$error"]').withText("This is required");
    this.characterErrorMessage = locate('.ng-scope').withText("Max length reached");
    this.invalidPriceErrorMessage = locate('[ng-messages="$ctrl.advertisementForm.price.$error"]').withText("Invalid price(Valid currency in euros: 12,12)");
    this.roomErrorMessage = locate('[ng-messages="$ctrl.advertisementForm.room.$error"]');
    this.characterCount = locate('.md-errors-spacer').withText("51 / 50")
  }

  async addAdvertisement() {
    const advertisementName = 'Test ' + faker.name.firstName();
    console.log('New Adevert: ', advertisementName)
    console.log('New street: ', this.streetName);
    I.click(this.nameField);
    I.fillField(this.nameField, advertisementName);
    I.fillField(this.streetField, this.streetName);
    I.fillField(this.roomsField, this.randomRooms);
    I.fillField(this.priceField, this.randomPrice);
    I.click(this.statusCheckBox);
    I.click(this.saveButton);
    return advertisementName;
  }

  async editAdvertisement(name) {
    const addedAdvert = locate('.md-row .md-cell').withText(name);
    I.click(addedAdvert);
    const editedAdvertisementName = 'Edited ' + faker.name.firstName();
    console.log('Edited Adevert: ', editedAdvertisementName);
    I.fillField(this.nameField, editedAdvertisementName);
    I.click(this.statusCheckBox);
    I.click(this.saveButton);
    return editedAdvertisementName;
  }

  async postAdvertisement() {
    const res = await I.sendPostRequest('/advertisements', {
      name: 'Test. ' + I.getRandomString(),
      price: 200,
      status: true
    });
      return res.data;
    }
}

module.exports = new AdvertisementComponent();