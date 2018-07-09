import { TranslatorContext, Storage } from 'react-simlife';

import { setLocale } from 'app/shared/reducers/locale';

TranslatorContext.setDefaultLocale('en');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const languages: any = {
  'ar-ly': { name: 'العربية', rtl: true },
  hy: { name: 'Հայերեն' },
  ca: { name: 'Català' },
  'zh-cn': { name: '中文（简体）' },
  'zh-tw': { name: '繁體中文' },
  cs: { name: 'Český' },
  da: { name: 'Dansk' },
  nl: { name: 'Nederlands' },
  en: { name: 'English' },
  et: { name: 'Eesti' },
  fa: { name: 'فارسی', rtl: true },
  fr: { name: 'Français' },
  gl: { name: 'Galego' },
  de: { name: 'Deutsch' },
  el: { name: 'Ελληνικά' },
  hi: { name: 'हिंदी' },
  hu: { name: 'Magyar' },
  id: { name: 'Bahasa Indonesia' },
  it: { name: 'Italiano' },
  ja: { name: '日本語' },
  ko: { name: '한국어' },
  mr: { name: 'मराठी' },
  pl: { name: 'Polski' },
  'pt-br': { name: 'Português (Brasil)' },
  'pt-pt': { name: 'Português' },
  ro: { name: 'Română' },
  ru: { name: 'Русский' },
  sk: { name: 'Slovenský' },
  sr: { name: 'Srpski' },
  es: { name: 'Español' },
  sv: { name: 'Svenska' },
  tr: { name: 'Türkçe' },
  ta: { name: 'தமிழ்' },
  th: { name: 'ไทย' },
  ua: { name: 'Українська' },
  'uz-lat': { name: 'O`zbekcha' },
  vi: { name: 'Tiếng Việt' }
  // simlife-needle-i18n-language-key-pipe - Simlife will add/remove languages in this object
};

export const locales = Object.keys(languages).sort();

export const isRTL = (lang: string): boolean => languages[lang] && languages[lang].rtl;

export const registerLocale = store => {
  store.dispatch(setLocale(Storage.session.get('locale', 'en')));
};
