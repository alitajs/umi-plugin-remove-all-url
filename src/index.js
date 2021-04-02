import RemoveURLPlugin from './webpack-plugin';

export default (api) => {
  api.describe({
    key: 'removeUrlWhitelist',
    config: {
      schema(joi) {
        return joi.array();
      },
    },
  });
  const isProduction = process.env.NODE_ENV === 'production';
  // 构建环境才生效
  if (!isProduction) return;
  const { userConfig } = api;
  const { removeUrlWhitelist = [], } = userConfig;
  api.chainWebpack(webpackConfig => {
    webpackConfig.plugin('remove-url').use(RemoveURLPlugin, [
      { whitelist: removeUrlWhitelist }
    ]);
    return webpackConfig;
  });
};
