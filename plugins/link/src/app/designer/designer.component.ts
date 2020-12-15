import { Component, Injector } from '@angular/core';
import { WidgetDesign } from 'dashboard-lib';


@Component({
  templateUrl: './designer.component.html',
})
export class LinkDesignComponent extends WidgetDesign {
  currentLink: any = {
    linkTitle: '',
    link: '',
  };

  constructor(injector: Injector) {
    super(injector);
  }

  add() {
    if (this.currentLink.link && this.currentLink.linkTitle) {
      this.model.links.push({
        link: this.currentLink.link,
        linkTitle: this.currentLink.linkTitle,
      });
      this.currentLink = {
        linkTitle: '',
        link: '',
      };
    }
  }

  removeLink(link) {
    const pos = this.model.links.indexOf(link);
    if (pos >= 0) {
      this.model.links.splice(pos, 1);
    }
  }
}
