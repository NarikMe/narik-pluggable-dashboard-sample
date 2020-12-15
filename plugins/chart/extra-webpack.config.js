const WebpackConfigHelper = require('./../../build-tools/webpack-config.helper');

module.exports = (config) => {
  WebpackConfigHelper.applyLayoutConfig(config, '/../../');
  WebpackConfigHelper.applyFederationConfig(config, {
    uniqueName: 'chart',
    filename: 'remoteEntry.js',
    exposes: {
      './Viewer': './plugins/chart/src/app/viewer/viewer.component.ts',
      './Designer': './plugins/chart/src/app/designer/designer.component.ts',
    },
  });
  return config;
};
