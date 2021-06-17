# Tutorial: How create a pluggable Angular app with Webpack Module Federation

In this tutorial, I show you how I created this sample application focusing on pluggable mechanism.  

I've already made a simple version of this dashboard using Angular dynamic components that you can see it [here](https://github.com/NarikMe/narik-dashboard-sample).
But I decided to use Webpack Module federation  and convert it to pluggable dashboards.  
> What do i mean, pluggable?  
> Dashboard widgets can be loaded from **separated compiled and deployed artifacts**, and adding new widget or changing widgets can be done without any changes to shell application.(Designer & Viewer)

## Part 1: Add dashboard widget

Any dashboard widget is a Angular application.

use Angular cli to add an application  

`ng g application --minimal new-widget`

After that change some application settings on **Angular.json**.

- change port to 4210
- change builder to [@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack)
  we need add some webpack config to application. For this we use Angular custom builder. 
- add customWebpackConfig
  ```json
   "customWebpackConfig": {
        "path": "plugins/new-widget/extra-webpack.config.js",
        "mergeStrategies": {
        "module": "prepend",
        "module.rules": "prepend",
        "plugins": "prepend"
        }
    }
  ```
- add extra-webpack.config.js with this content to 'new-widget\src'

    ```js
    const WebpackConfigHelper = require('./../../build-tools/webpack-config.helper');

    module.exports = (config) => {
    WebpackConfigHelper.applyLayoutConfig(config, '/../../');
    WebpackConfigHelper.applyFederationConfig(config, {
        uniqueName: 'kpi',
        filename: 'remoteEntry.js',
        exposes: {
        './Viewer': './plugins/newWidget/src/app/viewer/viewer.component.ts', // path to viewer component
        './Designer': './plugins/newWidget/src/app/designer/designer.component.ts', // path to designer component
        },
    });
    return config;
    };

    ```

    In this file, we configure webpack module federation. I put all configuration into [webpack-config.helper.js](./../build-tools/webpack-config.helper.js) to use from all plugins.

Find more information about Angular cli builder [here](https://angular.io/guide/cli-builder) and about 
@angular-builders/custom-webpack [here](https://www.npmjs.com/package/@angular-builders/custom-webpack)

## Part 2: Create Designer Component

Add a component to new-widget app. It should extends [WidgetDesign](./../projects/dashboard-lib/src/lib/base/widget-design.ts).  

```ts
import { Component, Injector } from '@angular/core';
import { WidgetDesign } from 'dashboard-lib';

@Component({
  templateUrl: './designer.component.html',
})
export class NewWidgetDesignComponent extends WidgetDesign {

  constructor(injector: Injector) {
    super(injector);
  }
}
```

Add NewWidgetDesignComponent to AppModule declarations.

## Part 3: Create Viewer Component

Add a component to new-widget app. It should extends [WidgetView](./../projects/dashboard-lib/src/lib/base/widget-view.ts).  

```ts
import { Component, Injector } from '@angular/core';
import { WidgetView } from 'dashboard-lib';

@Component({
  templateUrl: './viewer.component.html',
})
export class NewWidgetViewComponent extends WidgetView {
  constructor(injector: Injector) {
    super(injector);
  }
}
```

Add NewWidgetViewComponent to AppModule declarations.


## Part 4: Add metadata for widget

In part 2, add widget metadata to system. These metadata describe dashboard widgets.[(dashboard.json)](../src/assets/dashboard.json)


for example:

```json
 {
    "key": "newWidget",
    "value": "New Widget",
    "defaultModel": {
        "links": []
    },
    "remote": {
        "mode": "development",
        "entry": {
            "development": "http://localhost:4210/remoteEntry.js",
            "production": "assets/plugins/newWidget/remoteEntry.js"
        },
        "viewer": {
            "module": "./Viewer",
            "component": "NewWidgetViewComponent"
        },
        "designer": {
            "module": "./Designer",
            "component": "NewWidgetDesignComponent"
        }
    }
},
```

- key: Unique key for each widget
- value: Label of widget
- defaultModel: The default model that designer should create when creating cell of this widget type
- remote: From where and how this widget should be loaded
  - mode: For easy switching between 'development' and 'production' mode I use this field. If it is 'production', system uses entry.production for loading widget other wise system uses remote.development.
  - entry: Path to widget files
  - viewer: Widget viewer information contains **module** and **component**. **module** determines which module should be loaded and **component** determines the name of Angular component class should be created.
  - designer: Widget designer information contains **module** and **component**. **module** determines which module should be loaded and **component** determines the name of Angular component class should be created.

    > In some situation 'viewer' or 'designer' might need additional field, **componentModule**. **componentModule** determines the name of Angular modules should be instantiated before creation of Angular component. **componentModule** is necessary when Angular components uses some services that provides by **componentModule**.

## Part 5: Serve widget
 Widget is ready!  

 Run `ng serve new-widget` and test it.


## More Information

Find more information about **Webpack Module Federation** [here](https://webpack.js.org/concepts/module-federation/)   
This [tutorial](https://github.com/angular-architects/module-federation-plugin/blob/main/libs/mf/README.md) was very helpful to me.  
In this project I used some features of [Narik](http://narik.me)



