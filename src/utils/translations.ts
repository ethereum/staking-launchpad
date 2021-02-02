const defaultStrings = require('../intl/en.json');

// Returns the en.json value
export const getDefaultMessage = (key: string) => {
  const defaultMessage = defaultStrings[key];
  if (defaultMessage === undefined) {
    console.error(
      `No key "${key}" in en.json. Cannot provide a default message.`
    );
  }
  return defaultMessage || '';
};

export const isLangRightToLeft = (lang: string): boolean => {
  // Todo: Revisit when language scope decided
  return lang === 'ar' || lang === 'fa';
};

export const translateMessageId = (id: string, intl: { [s: string]: any }) => {
  if (!id) {
    console.error(`No id provided for translation.`);
    return '';
  }
  if (!intl || !intl.formatMessage) {
    console.error(`Invalid/no intl provided for translation id ${id}`);
    return '';
  }
  const translation = intl.formatMessage({
    id,
    defaultMessage: getDefaultMessage(id),
  });
  if (translation === id) {
    console.error(
      `Intl ID string "${id}" has no match. Default message of "" returned.`
    );
    return '';
  }
  return translation;
};
