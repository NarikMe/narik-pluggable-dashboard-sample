import { DashboardDesignerComponent } from "./modules/dashboard/dashboard-design/dashboard-designer/dashboard-designer.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { MainViewComponent } from "./main-view/main-view.component";
import { ModuleLoadCompletelyGuard, FormViewRoute } from "@narik/app-core";
import { DashboardViewerComponent } from "./modules/dashboard/dashboard-view/dashboard-viewer/dashboard-viewer.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [ModuleLoadCompletelyGuard],
    data: { moduleKey: "main" },
    component: MainComponent,
    children: [
      {
        path: "",
        component: MainViewComponent,
        outlet: "dashboard",
        data: {
          showOnlyRouter: true
        }
      },
      {
        path: "dashboard",
        component: DashboardViewerComponent,
        data: {
          title: "dashboard.dashboard"
        }
      },
      {
        path: "dashboard-design",
        component: DashboardDesignerComponent,
        data: {
          title: "dashboard.dashboardDesign"
        }
      },
      ...FormViewRoute("main")
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
