import {
  createIntlCache,
  createIntl,
} from 'react-intl';

import { supportedLocales } from '@folio/stripes/core';

/**
 * filterByLabelContains: `onFilter` for Selection that keeps the options whose label
 * contains the search term anywhere in it, ignoring case.
 * e.g. the term `english` matches `British English / British English`
 *
 * @param {string} searchTerm text typed into the Selection filter input
 * @param {array} dataOptions array of {value, label} options
 * @returns {array} the options whose label contains the search term
 */
export const filterByLabelContains = (searchTerm = '', dataOptions = []) => {
  const term = searchTerm.toLowerCase();

  return dataOptions.filter(option => String(option.label).toLowerCase().includes(term));
};

/**
 * localesList: list of available locales suitable for a Select
 * label contains language in context's locale and in iteree's locale
 * e.g. given the context's locale is `en` and the keys `ar` and `zh-CN` show:
 *     Arabic / العربية
 *     Chinese (China) / 中文（中国）
 * e.g. given the context's locale is `ar` and the keys `ar` and `zh-CN` show:
 *     العربية / العربية
 *     الصينية (الصين) / 中文（中国）
 *
 * @param {object} intl react-intl object in the current context's locale
 * @returns {array} array of {value, label} suitable for a Select
 */
export const localesList = (intl, tenantLocale) => {
  // This is optional but highly recommended
  // since it prevents memory leak
  const cache = createIntlCache();

  // error handler if an intl context cannot be created,
  // i.e. if the browser is missing support for the requested locale
  const logLocaleError = (e) => {
    console.warn(e); // eslint-disable-line
  };

  // iterate through the locales list to build an array of { value, label } objects
  const locales = supportedLocales.map(l => {
    // intl instance with locale of current iteree
    const lIntl = createIntl({
      locale: l,
      messages: {},
      onError: logLocaleError,
    },
    cache);

    const label = `${intl.formatDisplayName(l, { type: 'language' })} / ${lIntl.formatDisplayName(l, { type: 'language' })}`;

    if (l === tenantLocale) {
      return {
        value: l,
        label: `${label} (${intl.formatMessage({ id: 'ui-myprofile.settings.languageLocalization.tenantDefault' })})`,
      };
    }

    return {
      value: l,
      label,
    };
  });

  locales.sort((a, b) => a.label.localeCompare(b.label));

  return locales;
};
