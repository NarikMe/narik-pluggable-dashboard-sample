const WebpackConfigHelper = require('./../../build-tools/webpack-config.helper');

module.exports = (config) => {
  WebpackConfigHelper.applyLayoutConfig(config, '/../../');
  WebpackConfigHelper.applyFederationConfig(config, {
    uniqueName: 'todo',
    filename: 'remoteEntry.js',
    exposes: {
      './Viewer': './plugins/todo/src/app/viewer/viewer.component.ts',
      './Designer': './plugins/todo/src/app/designer/designer.component.ts',
    },
  });
  return config;
};
