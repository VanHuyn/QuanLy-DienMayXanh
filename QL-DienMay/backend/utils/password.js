const bcrypt = require("bcrypt");

module.exports = {
  hashPassword: async (plain) => {
    return await bcrypt.hash(plain, 10);
  },

  comparePassword: async (plain, hash) => {
    return await bcrypt.compare(plain, hash);
  }
};
