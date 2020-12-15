import { Component, OnInit } from "@angular/core";
import {
  PluginService,
  WidgetTypeGroup,
  WidgetType
} from "../../dashboard-share/service/plugin.service";

@Component({
  selector: "select-widget-type",
  templateUrl: "select-widget-type.component.html"
})
export class SelectWidgetTypeComponent implements OnInit {
  widgetTypeGroups: WidgetTypeGroup[] = [];
  widgetTypes: WidgetType[] = [];

  widgetType: string;

  _widgetTypeGroup: string;
  set widgetTypeGroup(value: string) {
    if (value !== this._widgetTypeGroup) {
      this._widgetTypeGroup = value;
      if (value) {
        this.widgetTypes = this.widgetTypeGroups.filter(
          x => x.key === value
        )[0].widgetTypes;
      } else {
        this.widgetTypes = [];
      }
    }
  }
  get widgetTypeGroup(): string {
    return this._widgetTypeGroup;
  }

  get widgetTypeObject(): WidgetType {
    return this.widgetTypes.filter(x => x.key === this.widgetType)[0];
  }
  selectOptions: any = {
    showToolbar: false
  };

  constructor(private dashboardService: PluginService) {}

  ngOnInit() {
    this.dashboardService
      .widgetGroups()
      .subscribe(result => (this.widgetTypeGroups = result));
  }
}
