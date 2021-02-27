import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './ru.json';

i18n
.use(initReactI18next)
.init({
  lng: 'ru',
  resources,
})
.catch(console.error);

export default i18n;
