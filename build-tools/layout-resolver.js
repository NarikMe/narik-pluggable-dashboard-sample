class LayoutResolver {
  Resolve(key) {
    switch (key) {
      case "NarikListUi":
        return {
          layout: "",
          layoutUrl: "./src/app/layouts/list-layout.html"
        };
      case "NarikEditUi":
        return {
          layout: "",
          layoutUrl: "./src/app/layouts/edit-layout.html"
        };
      case "WidgetViewUi":
        return {
          layout: "",
          layoutUrl: "./src/app/layouts/dashboard-view.layout.html"
        };
      case "WidgetDesignUi":
        return {
          layout: "",
          layoutUrl: "./src/app/layouts/dashboard-design.layout.html"
        };

      default:
        break;
    }
  }
}
module.exports = LayoutResolver;
