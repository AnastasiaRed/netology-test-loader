module.exports = {
  env: {
    browser: true,
  },
  plugins: ['babel'],
  extends: ['airbnb'],
  rules: {
    // windows linebreaks when not in production environment
    'linebreak-style': ['error', process.env.NODE_ENV === 'production' ? 'unix' : 'windows'],
  },
};
