import { isStringType } from 'utils/checkType';

export const getErrorsObject = (response, errorMapper) => {
  const { message: errors } = response;

  if (!errors) {
    return undefined;
  }

  if (isStringType(errors)) {
    return errorMapper[errors];
  }

  const errorsObject = errors.reduce((accumErrors, error) => {
    return { ...accumErrors, ...errorMapper[error] }
  }, {});

  if (Object.values(errorsObject).length) {
    return errorsObject;
  }
}
