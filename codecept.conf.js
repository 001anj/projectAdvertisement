const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './tests/**/*.test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://admin-advertisement.herokuapp.com/advertisements',
      show: true,
      browser: 'chromium'
    },
    REST: {
      endpoint: 'https://admin-advertisement.herokuapp.com/api/advertisements',
      defaultHeaders: {},
    },
    JSONResponse: {}, 
  },
  include: {
    I: './steps_file.js',
    AdvertisementComponent: './tests/support/AdvertisementComponent.js'
  },
  plugins: {
    pauseOnFail: {
      enabled: false,
    },
  },  
  bootstrap: null,
  mocha: {},
  name: 'projectAdvertisement'
}