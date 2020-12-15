const WebpackConfigHelper = require('./build-tools/webpack-config.helper');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, 'tsconfig.json'), [
  'dashboard-lib',
]);

module.exports = (config) => {
  WebpackConfigHelper.applyLayoutConfig(config);
  WebpackConfigHelper.applyFederationConfig(config, {
    isHost: true,
  });
  return config;
};
