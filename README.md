# projectAdvertisement

# Introduction

This project demonstrates UI test and api test for advertisement feature using codeceptjs, playwright and REST

## How to use

This is done using CodeceptJS <https://codecept.io/>

### Tech

This test uses a number of open source frameworks to work properly:

*<https://codecept.io/helpers/REST/> - CodeceptJS with REST (API TEST)
*<https://codecept.io/playwright/> - CodeceptJS with Playwright (UI TEST)
*<https://reqres.in/> - Faker for dynamic data creation
*<https://www.chaijs.com/api/bdd/> - chai for assertion
*<https://nodejs.org/api/assert.html/> - Assertion library


### Installation

This requires [Node.js](https://nodejs.org/) v12+ to run.

Clone the repo and install the dependencies using

```sh
npm i
```
### How to trigger API tests

To run test

```sh
npx codeceptjs run
```