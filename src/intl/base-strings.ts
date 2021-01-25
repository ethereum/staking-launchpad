const baseStrings = {
  /** Page content */
  'home.title': 'Home',
  'home.content': 'Thank you for visiting this multi-language routing example.',

  'summary.title': 'Summary',
  'summary.content': 'Read more about the article on {medium} or {devto}.',

  'error.title': 'Error',
  'error.content': 'This page decided to take a vacation. Try again later.',
};

export type LanguageStrings = typeof baseStrings;
export const en = baseStrings;
