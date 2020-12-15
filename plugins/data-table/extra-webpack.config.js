const WebpackConfigHelper = require('./../../build-tools/webpack-config.helper');

module.exports = (config) => {
  WebpackConfigHelper.applyLayoutConfig(config, '/../../');
  WebpackConfigHelper.applyFederationConfig(config, {
    uniqueName: 'dataTable',
    filename: 'remoteEntry.js',
    exposes: {
      './Viewer': './plugins/data-table/src/app/viewer/viewer.component.ts',
      './Designer': './plugins/data-table/src/app/designer/designer.component.ts',
    },
  });
  return config;
};
