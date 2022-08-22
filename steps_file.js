// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({

    getRandomString() {
      return Math.random().toString(36).substring(7);
    },

    getRandomNumber() {
      return Math.random() + 10;
    },

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

  });
}
