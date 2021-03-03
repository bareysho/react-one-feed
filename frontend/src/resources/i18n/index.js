import i18n from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { initReactI18next } from 'react-i18next';

import resources from './ru.json';

i18n
  .use(intervalPlural)
  .use(initReactI18next)
  .init({
    lng: 'ru',
    resources,
  })
  .catch(console.error);

export default i18n;
