import { Component, ContentChild, ElementRef, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.scss']
})
export class SharedModalComponent {

  @ViewChild('myModal', {static: false}) modal: ElementRef;
  @ContentChild('content') content: TemplateRef<any>;

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}
