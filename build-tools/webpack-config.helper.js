const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const AngularCompilerPlugin = require('@ngtools/webpack/src');
const LayoutResolver = require('./layout-resolver');

const path = require('path');

class WebpackConfigHelper {
  static applyLayoutConfig(config, basePath) {
    
    const index = config.plugins.findIndex((p) => {
      return p instanceof AngularCompilerPlugin.ivy.AngularWebpackPlugin;
    });
    const options = config.plugins[index].pluginOptions;
    options.directTemplateLoading = false;
    config.plugins.splice(index);

    config.plugins.push(
      new AngularCompilerPlugin.ivy.AngularWebpackPlugin(options)
    );

    config.module.rules.unshift({
      test: /\.html?$/,
      use: [
        'raw-loader',
        {
          loader: '@narik/webpack-tools',
          options: {
            resolver: new LayoutResolver(),
            basePath: path.dirname(options.tsconfig) + (basePath || ''),
          },
        },
      ],
    });
  }

  static applyFederationConfig(config, options) {
    config.output.uniqueName = options.uniqueName;
    config.output.publicPath = 'auto';
    config.optimization.runtimeChunk = false;

    const dashboardLibPath = path
      .join(__dirname, './../dist/dashboard-lib')
      .replace(/\\/g, '/');

    options.shared = options.shared || {
      '@angular/core': {
        singleton: true,
        strictVersion: false,
        requiredVersion: '11.0.2',
      },
      '@angular/animations': {
        singleton: true,
        strictVersion: false,
        requiredVersion: '11.0.2',
      },
      '@angular/forms': {
        singleton: true,
        strictVersion: false,
        requiredVersion: '11.0.2',
      },
      '@angular/common': {
        singleton: true,
        strictVersion: false,
        requiredVersion: '11.0.2',
      },
      '@angular/cdk': {
        singleton: true,
        strictVersion: false,
        requiredVersion: '11.0.1',
      },
      '@angular/material': {
        singleton: true,
        strictVersion: false,
        requiredVersion: '11.0.1',
      },
      '@narik/infrastructure': {
        singleton: true,
        strictVersion: false,
        requiredVersion: '5.1.0',
      },
      '@narik/core': {
        singleton: true,
        strictVersion: false,
        requiredVersion: '5.1.0',
      },
      '@narik/ui-core': {
        singleton: true,
        strictVersion: false,
        requiredVersion: '5.1.0',
      },
      '@narik/ui-material': {
        singleton: true,
        strictVersion: false,
        requiredVersion: '5.1.0',
      },
      '@ngx-translate/core': {
        singleton: true,
        strictVersion: false,
        requiredVersion: '13.0.0',
      },
      rxjs: {
        singleton: true,
        strictVersion: false,
        requiredVersion: '6.6.3',
      },
      'dashboard-lib': {
        import: dashboardLibPath,
        singleton: true,
        strictVersion: false,
        requiredVersion: '0.0.1',
      },
    };

    if (options.isHost) {
      for (const key in options.shared) {
        options.shared[key].eager = true;
      }
    }
    config.plugins.push(
      new ModuleFederationPlugin(
        options.isHost
          ? {
              remotes: {},
              shared: options.shared,
            }
          : {
              name: options.uniqueName,
              filename: options.filename,
              exposes: options.exposes,
              shared: options.shared,
            }
      )
    );
  }
}
module.exports = WebpackConfigHelper;
