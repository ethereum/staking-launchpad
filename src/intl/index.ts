import en from './en.json';
import de from './de.json';
import fr from './fr.json';

export const messages: { [key: string]: any } = { en, de, fr };

export enum AppLanguage {
  English = 'en',
  French = 'fr',
  Deutch = 'de',
}

export const supportedLanguages: String[] = Object.values(AppLanguage);
