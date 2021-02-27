const { override, fixBabelImports } = require('customize-cra');

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryDirectory: 'es',
      libraryName: 'antd',
      style: true,
    }),
  )
};
