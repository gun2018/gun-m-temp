module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'prettier', // 必须位于最后，覆盖代码风格相关 rules
  ],
  rules: {
    // 数据库字段中存在小写字母下划线命名方式
    camelcase: 'off',
    // 为便于代码阅读，允许函数晚于使用定义
    'no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-closing-bracket-location': 'off',
    // react 支持 .js
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    // 解决window下换行格式的报错
    'linebreak-style': 'off',
    'no-shadow': 'off',
    'import/prefer-default-export': 'off',
  },
  globals: {
    window: true,
    document: true,
    lib: true,
    location: true,
    history: true,
    localStorage: true,
    sessonStorage: true,
  },
  root: true,
};
