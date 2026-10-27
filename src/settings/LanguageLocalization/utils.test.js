import { filterByLabelContains } from './utils';

const options = [
  { value: 'en-GB', label: 'British English / British English' },
  { value: 'en-US', label: 'American English / American English (Tenant default)' },
  { value: 'pt-BR', label: 'Brazilian Portuguese / português (Brasil)' },
  { value: 'de-DE', label: 'German (Germany) / Deutsch (Deutschland)' },
];

describe('filterByLabelContains', () => {
  it('matches options whose label contains the search term anywhere, not only at the start', () => {
    const result = filterByLabelContains('English', options);

    expect(result.map(o => o.value)).toEqual(['en-GB', 'en-US']);
  });

  it('matches a term found in the middle of a label', () => {
    expect(filterByLabelContains('azil', options).map(o => o.value)).toEqual(['pt-BR']);
  });

  it('is case-insensitive', () => {
    expect(filterByLabelContains('deutsch', options).map(o => o.value)).toEqual(['de-DE']);
    expect(filterByLabelContains('BRASIL', options).map(o => o.value)).toEqual(['pt-BR']);
  });

  it('treats regular expression characters in the search term literally', () => {
    expect(filterByLabelContains('(', options).map(o => o.value)).toEqual(['en-US', 'pt-BR', 'de-DE']);
    expect(filterByLabelContains('.*', options)).toEqual([]);
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterByLabelContains('klingon', options)).toEqual([]);
  });

  it('returns all options for an empty search term', () => {
    expect(filterByLabelContains('', options)).toEqual(options);
  });

  it('handles a missing options list', () => {
    expect(filterByLabelContains('en', undefined)).toEqual([]);
  });
});
