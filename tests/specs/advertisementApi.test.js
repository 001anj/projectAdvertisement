const { I, AdvertisementComponent } = inject();
const { expect } = require('chai');


Feature('Advertisement Api test');

Scenario('POST for new advertisement', async () => {
  const title = 'Test. ' + I.getRandomString();
  const res = await I.sendPostRequest('/advertisements', {
    name: title,
    price: 200,
    status: true
  });
  I.seeResponseCodeIsSuccessful();
  expect(res.data._id).not.eql(null);
  expect(res.data.name).eql(title);
  expect(res.data.price).eql(200);
  expect(res.data.status).eql(true);
});

Scenario('PUT for newly added work area type', async () => {
  const res = await AdvertisementComponent.postAdvertisement()
  const advId = res._id
  await I.sendPutRequest('/advertisements/' + advId, {
    price: 200,
    status: false
  });
  I.seeResponseCodeIsSuccessful();
});

Scenario('GET for specific advertisement', async () => {
  const res = await AdvertisementComponent.postAdvertisement()
  const advId = res._id;
  const res2 = await I.sendGetRequest('/advertisements/' + advId);
  I.seeResponseCodeIsSuccessful();
  expect(res2.data._id).is.not.eql(null);
});

Scenario('Error is shown if POST request does not have a body', async () => {
  const res = await I.sendPostRequest('/advertisements', {});
  I.seeResponseCodeIsClientError();
});

Scenario('Error is shown for incorrect request url', async () => {
  const res = await I.sendGetRequest('/advertisemen');
  I.seeResponseCodeIsClientError();
});

Scenario('Get list of work area types', async () => {
  const res = await AdvertisementComponent.postAdvertisement()
  const advId = res._id;
  const res2 = await I.sendGetRequest('/advertisements');
  I.seeResponseCodeIsSuccessful();
  expect(res2.data).not.eql(null);
  const result = res2.data.map((tool) => tool._id);
  expect(result).contain(advId);
});
