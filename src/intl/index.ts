import en from './compiled/en.json';
import ro from './compiled/ro.json';
import ar from './compiled/ar.json';
import el from './compiled/el.json';
import fr from './compiled/fr.json';
import id from './compiled/id.json';
import ko from './compiled/ko.json';
import zh from './compiled/zh.json';
import ptbr from './compiled/pt-br.json';

export const messages: { [key: string]: any } = {
  ar,
  zh,
  en,
  fr,
  el,
  id,
  ko,
  ro,
  'pt-br': ptbr,
};

export enum AppLanguage {
  Arabic = 'ar',
  ChineseSimplified = 'zh',
  English = 'en',
  French = 'fr',
  Greek = 'el',
  Indonesian = 'id',
  Korean = 'ko',
  PortugueseBrazilian = 'pt-br',
  Romanian = 'ro',
}

export const supportedLanguages: String[] = Object.values(AppLanguage);
