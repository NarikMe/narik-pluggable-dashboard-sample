const WebpackConfigHelper = require('./../../build-tools/webpack-config.helper');

module.exports = (config) => {
  WebpackConfigHelper.applyLayoutConfig(config, '/../../');
  WebpackConfigHelper.applyFederationConfig(config, {
    uniqueName: 'kpi',
    filename: 'remoteEntry.js',
    exposes: {
      './Viewer': './plugins/kpi/src/app/viewer/viewer.component.ts',
      './Designer': './plugins/kpi/src/app/designer/designer.component.ts',
    },
  });
  return config;
};
