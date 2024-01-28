import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { TodoListItem } from '../../interface/todoListItem.interface';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true)

  #setListItems = signal<TodoListItem[]>(this.#parseItems())
  public getListItems = this.#setListItems.asReadonly()

  #parseItems() {
    return JSON.parse(
      localStorage.getItem('@my-list') || '[]'
    )
  }

  public getInputAndAddItem(value: TodoListItem) {
    localStorage.setItem(
      '@my-list',
      JSON.stringify([...this.#setListItems(), value])
    )

    return this.#setListItems.set(this.#parseItems())
  }

  public deleteAllItems() {
    localStorage.removeItem('@my-list');
    return this.#setListItems.set(this.#parseItems());
  }
}
