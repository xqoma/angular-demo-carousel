const DIRECTIVE_PREFIX = '(ng|adc)[A-Z]';

const ATTRIBUTE_GROUPS = {
  ANGULAR_DIRECTIVE: `^(${DIRECTIVE_PREFIX}).*`,
  REGULAR_ATTRIBUTE: `^(?!(${DIRECTIVE_PREFIX}|attr\\.))[a-zA-Z].*`,
  ANGULAR_ATTRIBUTE_BINDING: '^\\[attr\\.',
};

const ORGANIZE_ATTRIBUTES = {
  plugin: 'prettier-plugin-organize-attributes',
  options: {
    attributeGroups: [
      '$ANGULAR_ELEMENT_REF',
      '$ANGULAR_STRUCTURAL_DIRECTIVE',
      ATTRIBUTE_GROUPS.ANGULAR_DIRECTIVE,
      ATTRIBUTE_GROUPS.REGULAR_ATTRIBUTE,
      ATTRIBUTE_GROUPS.ANGULAR_ATTRIBUTE_BINDING,
      '$ANGULAR_INPUT',
      '$ANGULAR_TWO_WAY_BINDING',
      '$ANGULAR_OUTPUT',
    ],
  },
};

const CSS_ORDER = {
  plugin: 'prettier-plugin-css-order',
  options: {
    cssDeclarationSorterOrder: 'alphabetical',
    cssDeclarationSorterKeepOverrides: false,
  },
};

const SORT_IMPORTS = {
  plugin: '@trivago/prettier-plugin-sort-imports',
  options: {
    importOrderParserPlugins: ['typescript', 'decorators-legacy'],
    importOrder: ['<THIRD_PARTY_MODULES>', '^@adc/', '^src/', '^(.|..)/'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
  },
};

module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  bracketSpacing: false,
  bracketSameLine: false,
  endOfLine: 'lf',
  arrowParens: 'always',
  trailingComma: 'all',
  overrides: [
    {
      files: '*.js',
      options: {
        plugins: [SORT_IMPORTS.plugin],
        ...SORT_IMPORTS.options,
      },
    },
    {
      files: '*.ts',
      options: {
        plugins: [SORT_IMPORTS.plugin, CSS_ORDER.plugin],
        ...SORT_IMPORTS.options,
        ...CSS_ORDER.options,
      },
    },
    {
      files: '*.(css|scss|less)',
      options: {
        printWidth: Infinity,
        plugins: [CSS_ORDER.plugin],
        ...CSS_ORDER.options,
      },
    },
    {
      files: '*.html',
      options: {
        parser: 'angular',
        plugins: [ORGANIZE_ATTRIBUTES.plugin],
        ...ORGANIZE_ATTRIBUTES.options,
      },
    },
  ],
};
