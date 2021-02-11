import en from './en.json';
import de from './de.json';
import fr from './fr.json';

export const messages: { [key: string]: any } = { en, de, fr };

export enum AppLanguage {
  English = 'en',
  ChineseSimplified = 'zh',
  ChineseTraditional = 'zh-tw',
  Czech = 'cs',
  Italian = 'it',
  Korean = 'ko',
  Spanish = 'es',
  French = 'fr',
}

export const supportedLanguages: String[] = Object.values(AppLanguage);
