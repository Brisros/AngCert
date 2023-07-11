import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-auto',
  templateUrl: './dropdown-auto.component.html',
  styleUrls: ['./dropdown-auto.component.css'],
})
export class DropdownAutoComponent {
  @Input() items: any[] = [];
  filteredItems: any[] = [];
  searchTerm: string = '';
  displayDropdown: boolean = false;

  search(event: any): void {
    this.displayDropdown = true;
    this.filteredItems = [];
    console.log('GHL: ', event);
    console.log('Search Term: ', this.searchTerm);
    this.items.forEach((item) => {
      if (item.name.includes(this.searchTerm)) {
        this.filteredItems.push(item);
      }
    });
    console.log('FI: ', this.filteredItems);
  }

  selectItem(event: any): void {
    this.displayDropdown = false;
    console.log('SELECTED ITEM: ', event);
    this.searchTerm = event;
  }
}
