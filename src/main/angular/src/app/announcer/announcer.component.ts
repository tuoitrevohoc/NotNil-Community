import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { GlobalService } from '../services/global.service'

@Component({
  moduleId: module.id,
  selector: 'app-announcer',
  templateUrl: 'announcer.component.html'
})
export class AnnouncerComponent implements OnInit {

  dialogTitle: string

  message: string

  @ViewChild("myModal") modal: ElementRef

  /// the constructor
  constructor(private globalService: GlobalService) { }

  /// show the dialog
  ngOnInit() { 
    this.globalService.channel("gift-dialog")
        .subcribe((data) => {
          this.dialogTitle = data.title
          this.message = data.message

          $(this.modal.nativeElement)["modal"]("show")
        })
  }

}
