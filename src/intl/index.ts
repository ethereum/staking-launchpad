import en from './en.json';

export const messages: { [key: string]: any } = { en };

export enum AppLanguage {
  English = 'en',
}

export const supportedLanguages: String[] = Object.values(AppLanguage);
