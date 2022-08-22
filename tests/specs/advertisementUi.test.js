const { I, AdvertisementComponent } = inject();
const assert = require('assert').strict;

Feature('Advertisement UI test');

Scenario('User is able to add advertisement', async () => {
  I.amOnPage('/');
  I.seeTextEquals('Advertisements', 'h2');

  I.say('I add an advertisement with all fields');
  I.click(AdvertisementComponent.plusIcon);
  I.seeInCurrentUrl(AdvertisementComponent.addFormUrl);
  const newAdvert = await AdvertisementComponent.addAdvertisement();
  I.seeInCurrentUrl('/');

  I.say('I see the data displayed in list which was used for adding advertisement')
  const addedAdvert = locate('.md-row .md-cell').withText(newAdvert);
  const findStreet = locate(AdvertisementComponent.streetColumn).inside(addedAdvert);
  const FindRooms = locate(AdvertisementComponent.roomsColumn).inside(addedAdvert);
  const FindPrice = locate(AdvertisementComponent.priceColumn).inside(addedAdvert); 
  const findStatus = locate(AdvertisementComponent.statusColumn).inside(addedAdvert);

  const streetValue = await I.grabTextFrom(findStreet);
  assert.strictEqual(streetValue, AdvertisementComponent.streetName);

  const roomsValue = await I.grabTextFrom(FindRooms);
  assert.strictEqual(roomsValue, AdvertisementComponent.randomRooms);

  const priceValue = await I.grabTextFrom(FindPrice);
  assert.strictEqual(priceValue, "400,00\u00A0€"); //non-breakable space

  const statusValue = await I.grabTextFrom(findStatus);
  assert.strictEqual(statusValue, "Active");  
});

Scenario('User is able to edit advertisement', async () => {

  I.say('I add an advertisement with mandatory fields');
  const newAdvert = await AdvertisementComponent.postAdvertisement();
  I.seeResponseCodeIs(200);

  I.say('I edit the newly added advertisement');
  I.amOnPage('/');
  const editedAdvert = await AdvertisementComponent.editAdvertisement(newAdvert.name);

  const advert = locate('.md-row .md-cell').withText(editedAdvert);
  const findStatus = locate(AdvertisementComponent.statusColumn).inside(advert);
  const statusValue = await I.grabTextFrom(findStatus);
  assert.strictEqual(statusValue, "Inactive"); 
});

Scenario('Save button is disabled and validation error message is displayed for empty mandatory fields', async () => {
  I.amOnPage('/');
  I.click(AdvertisementComponent.plusIcon);
  I.seeElement(AdvertisementComponent.disabledSaveButton);
  I.click(AdvertisementComponent.nameField);
  I.click(AdvertisementComponent.priceField);
  I.seeElement(AdvertisementComponent.nameErrorMessage);
  I.click(AdvertisementComponent.roomsField);
  I.seeElement(AdvertisementComponent.priceErrorMessage);
});

Scenario('Validation error is displayed for invalid characters and exceeding max length for input fields', async () => {
  I.amOnPage('/');
  I.click(AdvertisementComponent.plusIcon);
  I.click(AdvertisementComponent.nameField);
  I.fillField(AdvertisementComponent.nameField, "eAk5SX238Be3oBJRuPFW3qKd7UjtlgtCkCzKbsPWc1SxmTZn1TF");
  I.seeElement(AdvertisementComponent.characterErrorMessage);
  I.seeElement(AdvertisementComponent.characterCount);
  I.fillField(AdvertisementComponent.priceField, "@qwr");
  I.click(AdvertisementComponent.roomsField);
  I.seeElement(AdvertisementComponent.invalidPriceErrorMessage);
});

Scenario('User is redirected to home page after clicking cancel button on add advertisement form', async () => {
  I.amOnPage('/');

  I.say('I click on cancel button without filling any field');
  I.click(AdvertisementComponent.plusIcon);
  I.click(AdvertisementComponent.cancelButton);
  I.seeInCurrentUrl('/');

  I.say('I click on cancel button after adding any field');
  I.click(AdvertisementComponent.plusIcon);
  I.fillField(AdvertisementComponent.priceField, "20");
  I.click(AdvertisementComponent.cancelButton);
  I.seeElement(AdvertisementComponent.warningDialogBox);
  I.click(AdvertisementComponent.cancelConfirmationButton);
  I.seeInCurrentUrl(AdvertisementComponent.addFormUrl);

  I.say('I click on ok button after adding any field');
  I.fillField(AdvertisementComponent.priceField, "20");
  I.click(AdvertisementComponent.cancelButton);
  I.seeElement(AdvertisementComponent.warningDialogBox);
  I.click(AdvertisementComponent.okConfirmationButton);
  I.seeInCurrentUrl('/');
});

Scenario('Validation error is displayed for negative value for rooms', async () => {
  I.amOnPage('/');
  I.click(AdvertisementComponent.plusIcon);
  I.click(AdvertisementComponent.roomsField);
  I.fillField(AdvertisementComponent.roomsField, "-1");
  I.click(AdvertisementComponent.nameField);
  I.seeElement(AdvertisementComponent.roomErrorMessage);
});

Scenario('Warning dialog box is displayed in add form if user refresh the page after filling in fields', async () => {
  I.amOnPage('/');
  I.click(AdvertisementComponent.plusIcon);
  I.click(AdvertisementComponent.roomsField);
  I.fillField(AdvertisementComponent.roomsField, "20");
  I.refreshPage();
  I.seeElement(AdvertisementComponent.warningDialogBox);
});

Scenario('User remains in add form after reloading the page', async () => {
  I.amOnPage('/');
  I.click(AdvertisementComponent.plusIcon);
  I.refreshPage();
  I.seeInCurrentUrl(AdvertisementComponent.addFormUrl);
});