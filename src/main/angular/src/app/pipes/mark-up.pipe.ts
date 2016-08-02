import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markUp'
})
export class MarkUpPipe implements PipeTransform {

  /// mark up a document
  transform(text: string): string {
    if (text != null) {
      text = text.trim().replace(/\n/g, "<br />")
      text = text.replace(/\s*###([^<]*)<br \/>/g, "<h3>$1</h3>")
      text = text.replace(/\s*##([^<]*)<br \/>/g, "<h2>$1</h2>")
      text = text.replace(/\s*#([^<]*)<br \/>/g, "<h1>$1</h1>")
      text = text.replace(/!\[([^\]]+)]\(([^\)]+)\)/g, "<img class=\"ui image\" src=\"$2\" alt=\"$1\" />")
      text = text.replace(/\[([^\]]+)]\(([^\)]+)\)/g, "<a href=\"$2\">$1</a>")
      text = text.replace(/`([^`]+)`/g, 
                      "<code>$1</code>")
      text = text.replace(/_([^_]+)_/g, 
                      "<i>$1</i>")
      text = text.replace(/\s*-\s+parameter\s+([^:]*):/g, 
                      "<b>parameter <u>$1</u>:</b>")
      text = text.replace(/\s*-\s+example:/g, 
                      "<b>example:</b>")
      text = text.replace(/\s*-\s+returns\s*([^:]*):/g, 
                      "<b>returns:</b>")
    }

    return text
  }

}
