import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { TodoListItem } from '../../interface/todoListItem.interface';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import { LocalStorageEnum } from '../../enum/localStorage.enum';
import Swal from 'sweetalert2';


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
      localStorage.getItem(LocalStorageEnum.MY_LIST) || '[]'
    )
  }

  #updateLocalStorage() {
    return localStorage.setItem(
      LocalStorageEnum.MY_LIST,
      JSON.stringify(this.#setListItems())
    )
  }

  public getInputAndAddItem(value: TodoListItem) {
    localStorage.setItem(
      LocalStorageEnum.MY_LIST,
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
      oldValue.filter(res => {
        if (res.id === newItem.id) {
          res.checked = newItem.checked;

          return res
        }

        return res
      })

      return oldValue
    })

    return this.#updateLocalStorage();
  }

  public updateItemText(newItem: { value: string, id: string }) {
    this.#setListItems.update((oldValue: TodoListItem[]) => {
      oldValue.filter(res => {
        if (res.id === newItem.id) {
          res.value = newItem.value;

          return res
        }

        return res
      })

      return oldValue
    })

    return this.#updateLocalStorage();
  }

  public deleteItem(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#486c9e",
      cancelButtonColor: "#a92a39",
      confirmButtonText: "Yes, delete task!",
      cancelButtonText: "I'd rather keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: TodoListItem[]) => {
          return oldValue.filter((res) => res.id !== id)
        })

        return this.#updateLocalStorage();
      }
    });


  }

  public deleteAllItems() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#486c9e",
      cancelButtonColor: "#a92a39",
      confirmButtonText: "Yes, delete all!",
      cancelButtonText: "I'd rather cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your tasks have been deleted.",
          icon: "success",
          confirmButtonColor: "#486c9e"
        });

        localStorage.removeItem(LocalStorageEnum.MY_LIST);
        return this.#setListItems.set(this.#parseItems());
      }
    });
  }
}
