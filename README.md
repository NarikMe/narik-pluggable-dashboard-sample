# narik-pluggable-dashboard-sample

Sample pluggable dashboard created with Narik and Webpack Module Federation.  

[Online Demo](http://narik.me/demo/pluggable-dashboard/)     
[Tutorial](./tutorial/tutorial.md)   

In this project , I create a dashboard system (designer and viewer) with multiple pluggable widgets.  

## Widgets

- [x] Link
- [x] Todo List
- [x] Chart
- [ ] Map
- [x] DataTable
- [x] Gauge
- [x] DateTime
- [ ] ....

Do you have any suggestion? Create an issue for that.

## Running the demo

- Install packages: `yarn install` (do not use npm!)
- Build the shared library `yarn build:shared`
- Build plugins `yarn build:plugins`
- Start the shell: `ng s`
- Open the shell http://localhost:4200
  

## Serve a plugin

To server a plugin use `ng s`, for example `ng s kpi`. Then change **kpi** remote mode in  [**plugin definitions**](./src/assets/dashboard.json) to '**development**' .





