import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  zero(text: number) {
    return text < 10 ? "0" + text : text
  }
  /// mark up a document
  transform(text: string): string {
    var date = new Date(text)

    return this.months[date.getMonth()] + " " + this.zero(date.getDate())
            + " at " + this.zero(date.getHours()) + ":" 
            + this.zero(date.getMinutes())
  }
}