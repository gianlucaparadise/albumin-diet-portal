import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

//#region Types
type IconType = 'eggs' | 'save';
interface IconDescriptor {
  selected: string;
  unselected: string;
  selectedTooltip: string;
  unselectedTooltip: string;
  isSvg: boolean;
}
type IconNamesMap = { [name in IconType]: IconDescriptor };
//#endregion

//#region Descriptor definition
const toggleIcons: IconNamesMap = {
  eggs: {
    selected: 'eggs_filled',
    unselected: 'eggs_outlined',
    selectedTooltip: 'Remove from Listening List',
    unselectedTooltip: 'Add to Listening List',
    isSvg: true
  },
  save: {
    selected: 'favorite',
    unselected: 'favorite_border',
    selectedTooltip: 'Remove from My Albums',
    unselectedTooltip: 'Add to My Albums',
    isSvg: false
  }
};
//#endregion

@Component({
  selector: 'app-toggle-icon-button',
  templateUrl: './toggle-icon-button.component.html',
  styleUrls: ['./toggle-icon-button.component.scss']
})
export class ToggleIconButtonComponent implements OnInit, OnChanges {

  @Input() type: IconType;
  @Input() selected: boolean;
  @Output() click = new EventEmitter<MouseEvent>();

  isSvg: boolean;
  iconName: string;
  buttonTooltip: string;

  constructor() { }

  ngOnInit() {
    this.updateIcon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateIcon();
  }

  private updateIcon() {
    const icon = toggleIcons[this.type];

    this.isSvg = icon.isSvg;
    this.iconName = this.selected ? icon.selected : icon.unselected;
    this.buttonTooltip = this.selected ? icon.selectedTooltip : icon.unselectedTooltip;
  }

  onClick(event: MouseEvent) {
    if (!this.click) {
      return;
    }

    this.click.emit(event);
  }

}
