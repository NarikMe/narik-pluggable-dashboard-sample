import { AuthenticationService } from "@narik/infrastructure";
import { Component, Input } from "@angular/core";
import {
  NbSidebarService,
  NbMenuItem,
  NbLayoutDirectionService,
  NbLayoutDirection
} from "@nebular/theme";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "ngx-view-header",
  styleUrls: ["ngx-view-header.component.scss"],
  templateUrl: "ngx-view-header.component.html"
})
export class NgxHeaderComponent {
  @Input() position = "normal";
  @Input() headerTitle = "";
  user: any;

  _fa = false;

  set fa(value: boolean) {
    if (this.fa !== value) {
      this.nbLayoutDirectionService.setDirection(
        value ? NbLayoutDirection.RTL : NbLayoutDirection.LTR
      );
      this.translateService.use(value ? "fa" : "en");
    }
    this._fa = value;
  }
  get fa(): boolean {
    return this._fa;
  }

  userMenu: NbMenuItem[] = [
    { title: "changePass", data: "changePass" },
    { title: "logout", data: "logout" }
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private nbLayoutDirectionService: NbLayoutDirectionService,
    private translateService: TranslateService,
    authenticationService: AuthenticationService
  ) {
    for (const menu of this.userMenu) {
      menu.title = translateService.instant(menu.title);
    }
    this.user = authenticationService.currentUserValue;
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");

    return false;
  }
}
