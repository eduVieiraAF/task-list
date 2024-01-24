import { TodoListItem } from './../../interface/todoListItem.interface';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);
  @ViewChild('inputValue') public inputValue!: ElementRef;
  @Output() public outputListAddItems = new EventEmitter<TodoListItem>();

  public focusAndAddItem(value: string) {
    if (value) {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `id ${timestamp}`;

      this.#cdr.detectChanges();
      this.inputValue.nativeElement.value = '';
      this.outputListAddItems.emit({
        id,
        checked : false,
        value
      });

      // console.log(value);
      return this.inputValue.nativeElement.focus();
    }
  }
}
