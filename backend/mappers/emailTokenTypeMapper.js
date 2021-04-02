const { VERIFICATION, PASSWORD_RECOVERY, CHANGE_EMAIL } = require('constants/emailTokenType');

const emailTokenTypesMapper = {
  [VERIFICATION]: 1,
  [PASSWORD_RECOVERY]: 2,
  [CHANGE_EMAIL]: 3,
}

module.exports = {
  emailTokenTypesMapper,
}
