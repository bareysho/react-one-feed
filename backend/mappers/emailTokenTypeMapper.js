const { VERIFICATION, PASSWORD_RECOVERY } = require('constants/emailTokenType');

const emailTokenTypesMapper = {
  [VERIFICATION]: 1,
  [PASSWORD_RECOVERY]: 2,
}

module.exports = {
  emailTokenTypesMapper,
}
