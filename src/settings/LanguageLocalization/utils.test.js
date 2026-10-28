import { filterLocaleOptions } from './utils';

describe('filterLocaleOptions', () => {
  const localeOptions = [
    { value: 'en-US', label: 'English / English' },
    { value: 'es', label: 'Spanish / español' },
    { value: 'fr', label: 'French / français' },
  ];

  it('matches search terms anywhere in a locale label, case-insensitively', () => {
    expect(filterLocaleOptions('LISH', localeOptions)).toEqual([
      localeOptions[0],
    ]);
  });
});
