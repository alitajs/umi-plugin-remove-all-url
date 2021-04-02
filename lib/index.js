"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpackPlugin = _interopRequireDefault(require("./webpack-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = api => {
  api.describe({
    key: 'removeUrlWhitelist',
    config: {
      schema(joi) {
        return joi.array();
      }

    }
  });
  const isProduction = process.env.NODE_ENV === 'production'; // 构建环境才生效

  if (!isProduction) return;
  const userConfig = api.userConfig;
  const _userConfig$removeUrl = userConfig.removeUrlWhitelist,
        removeUrlWhitelist = _userConfig$removeUrl === void 0 ? [] : _userConfig$removeUrl;
  api.chainWebpack(webpackConfig => {
    webpackConfig.plugin('remove-url').use(_webpackPlugin.default, [{
      whitelist: removeUrlWhitelist
    }]);
    return webpackConfig;
  });
};

exports.default = _default;