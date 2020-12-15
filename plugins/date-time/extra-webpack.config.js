const WebpackConfigHelper = require('./../../build-tools/webpack-config.helper');

module.exports = (config) => {
  WebpackConfigHelper.applyLayoutConfig(config, '/../../');
  WebpackConfigHelper.applyFederationConfig(config, {
    uniqueName: 'dateTime',
    filename: 'remoteEntry.js',
    exposes: {
      './Viewer': './plugins/date-time/src/app/viewer/viewer.component.ts',
      './Designer':
        './plugins/date-time/src/app/designer/designer.component.ts',
    },
  });
  return config;
};
