import ar from './compiled/ar.json';
import el from './compiled/el.json';
import en from './compiled/en.json';
import fr from './compiled/fr.json';
import id from './compiled/id.json';
import it from './compiled/it.json';
import ja from './compiled/ja.json';
import ko from './compiled/ko.json';
import ptbr from './compiled/pt-br.json';
import ro from './compiled/ro.json';
import zh from './compiled/zh.json';

export const messages: { [key: string]: any } = {
  ar,
  el,
  en,
  fr,
  id,
  it,
  ja,
  ko,
  'pt-br': ptbr,
  ro,
  zh,
};

export enum AppLanguage {
  Arabic = 'ar',
  Greek = 'el',
  English = 'en',
  French = 'fr',
  Indonesian = 'id',
  Italian = 'it',
  Japanese = 'ja',
  Korean = 'ko',
  PortugueseBrazilian = 'pt-br',
  Romanian = 'ro',
  ChineseSimplified = 'zh',
}

export const supportedLanguages: String[] = Object.values(AppLanguage);
