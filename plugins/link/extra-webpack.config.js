const WebpackConfigHelper = require('./../../build-tools/webpack-config.helper');

module.exports = (config) => {
  WebpackConfigHelper.applyLayoutConfig(config, '/../../');
  WebpackConfigHelper.applyFederationConfig(config, {
    uniqueName: 'link',
    filename: 'remoteEntry.js',
    exposes: {
      './Viewer': './plugins/link/src/app/viewer/viewer.component.ts',
      './Designer': './plugins/link/src/app/designer/designer.component.ts',
    },
  });
  return config;
};
