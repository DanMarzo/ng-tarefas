import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItems } from '../../interface/IListitems.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [NgFor],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss',
})
export class InputListItemComponent {
  @Input({ required: true }) public inputListItems: Array<IListItems> = [];
  @Output() public outputUpdateItemCheckBox = new EventEmitter<{
    id: string;
    checked: boolean;
  }>();

  public updateItemCheckBox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckBox.emit({ id, checked });
  }

  @Output() public outputUpdateItemText = new EventEmitter<{
    id: string;
    value: string;
  }>();

  public updateItemText(id: string, value: string) {
    return this.outputUpdateItemText.emit({ id, value });
  }
}
