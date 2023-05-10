import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { error } from 'console';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { Room } from 'src/app/_interfaces/room';
import { RoomsService } from 'src/app/_services/room.service';
import  {Router}  from '@angular/router';

@Component({
  selector: 'app-create-or-edit-room',
  templateUrl: './create-or-edit-room.component.html',
  styleUrls: ['./create-or-edit-room.component.css']
})
export class CreateOrEditRoomComponent implements OnInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  bsModalRef!: BsModalRef;
  room: Room = new Room();
  constructor(private modalService: BsModalService, 
    private roomService: RoomsService,
    private route: Router,
    private toastr: ToastrService,
    ) { 
    }

  ngOnInit() {
    
  }

  openModal(room?: Room) {
    
    this.room = new Room();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };
    
    this.bsModalRef = this.modalService.show(CreateOrEditRoomComponent, config);
    if(room) {
      this.room = room;
      this.bsModalRef.content.room = room;
    }
    else{
      this.bsModalRef.content.room = new Room();
    } 
  }

  hide(){
    this.modalService.hide();
  }

  save(){
    if(this.room.name == null)
    {
      this.toastr.warning("cần nhập tên")
    }
    else{
      this.roomService.createOrEdit(this.room).pipe(finalize(() => this.room = new Room())).subscribe({
        next: (re) => this.toastr.success("Lưu thành công"),
        error: (error) => this.toastr.error("Đã xảy ra lỗi")
      }
      );
      location.reload();
      this.modalSave.emit(null);
      this.route.navigate(["/room"]);
      this.hide();
    }
    
  }
}
