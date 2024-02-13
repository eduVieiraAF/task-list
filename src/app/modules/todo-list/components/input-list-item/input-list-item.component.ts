import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoListItem } from '../../interface/todoListItem.interface';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {
  @Input({ required: true }) public inputListItems!: TodoListItem[];

  @Output() public outputUpdateItemCheckbox = new EventEmitter<{ checked: boolean; id: string }>();
  public updateItemCheckbox(checked: boolean, id: string) {
    return this.outputUpdateItemCheckbox.emit({ checked, id });
  }

  @Output() public outputUpdateItemText = new EventEmitter<{ value: string; id: string }>();
  public updateItemText(value: string, id: string) {
    return this.outputUpdateItemText.emit({ value, id });
  }

  @Output() public outputDeleteItemText = new EventEmitter<string>();
  public deleteItemText(id: string) {
    return this.outputDeleteItemText.emit( id );
  }
}
