import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, properties: string[]): any[] {
    if (!items || !searchText || !properties || properties.length === 0) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return properties.some(property => {
        const value = this.getNestedProperty(item, property);
        return value && value.toString().toLowerCase().includes(searchText);
      });
    });
  }

  private getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }
}
