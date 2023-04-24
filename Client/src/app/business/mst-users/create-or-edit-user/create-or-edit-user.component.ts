import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'create-or-edit-user',
  templateUrl: './create-or-edit-user.component.html',
  styleUrls: ['./create-or-edit-user.component.css']
})
export class CreateOrEditUserComponent implements OnInit {
  @ViewChild('createOrEditModal', { static: true }) modal?: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  show(){
    //this.modal?.show()
  }

}
