const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    postcssImport(),
    postcssPresetEnv(),
    postcssNested(),
    cssnano({
      preset: 'default',
    }),
  ],
};
