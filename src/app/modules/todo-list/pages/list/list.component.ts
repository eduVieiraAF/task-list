import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { TodoListItem } from '../../interface/todoListItem.interface';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent],
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

  public listItemsStage(value: 'pending' | 'completed') {
    return this.getListItems().filter((res: TodoListItem) => {
      if (value === 'pending') return !res.checked
      else if (value === 'completed') return res.checked

      return res;
    })
  }

  public updateItemCheckbox(newItem: { checked: boolean, id: string }) {
    this.#setListItems.update((oldValue: TodoListItem[]) => {
      oldValue.filter( res => {
        if (res.id === newItem.id) {
          res.checked = newItem.checked;

          return res
        }

        return res
      })

      return oldValue
    })

    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems()));
  }

public updateItemText(newItem: { value: string, id: string }) {
  this.#setListItems.update((oldValue: TodoListItem[]) => {
    oldValue.filter( res => {
      if (res.id === newItem.id) {
        res.value = newItem.value;

        return res
      }

      return res
    })

    return oldValue
  })

  return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems()));
}

  public deleteItemText(id: string) {
    this.#setListItems.update((oldValue: TodoListItem[]) => {
      return oldValue.filter( (res) => res.id !== id )
    })

    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems()));
  }

  public deleteAllItems() {
    localStorage.removeItem('@my-list');
    return this.#setListItems.set(this.#parseItems());
  }
}
