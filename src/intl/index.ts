import ar from './compiled/ar.json';
import cs from './compiled/cs.json';
import de from './compiled/de.json';
import el from './compiled/el.json';
import en from './compiled/en.json';
import es from './compiled/es.json';
import fr from './compiled/fr.json';
import id from './compiled/id.json';
import it from './compiled/it.json';
import ja from './compiled/ja.json';
import ko from './compiled/ko.json';
import ptbr from './compiled/pt-br.json';
import ro from './compiled/ro.json';
import ru from './compiled/ru.json';
import tr from './compiled/tr.json';
import zh from './compiled/zh.json';

export const messages: { [key: string]: any } = {
  ar,
  cs,
  de,
  el,
  en,
  es,
  fr,
  id,
  it,
  ja,
  ko,
  'pt-br': ptbr,
  ro,
  ru,
  tr,
  zh,
};

export enum AppLanguage {
  Arabic = 'ar',
  Czech = 'cs',
  German = 'de',
  Greek = 'el',
  English = 'en',
  Spanish = 'es',
  French = 'fr',
  Indonesian = 'id',
  Italian = 'it',
  Japanese = 'ja',
  Korean = 'ko',
  PortugueseBrazilian = 'pt-br',
  Romanian = 'ro',
  Russian = 'ru',
  Turkish = 'tr',
  ChineseSimplified = 'zh',
}

export const supportedLanguages: String[] = Object.values(AppLanguage);
