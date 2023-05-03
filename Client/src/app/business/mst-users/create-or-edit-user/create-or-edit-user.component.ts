import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { error } from 'console';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { UserManagement } from 'src/app/_interfaces/usermanagement';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'create-or-edit-user',
  templateUrl: './create-or-edit-user.component.html',
  styleUrls: ['./create-or-edit-user.component.css']
})
export class CreateOrEditUserComponent implements OnInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  bsModalRef!: BsModalRef;
  user: UserManagement = new UserManagement();
  constructor(private modalService: BsModalService, 
    private userService: UsersService,
    private toastr: ToastrService,
    ) { 
    }

  ngOnInit() {
    
  }

  openModal(user?: UserManagement) {
    
    this.user = new UserManagement();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };
    
    this.bsModalRef = this.modalService.show(CreateOrEditUserComponent, config);
    if(user) {
      this.user = user;
      this.bsModalRef.content.user = user;
    }
    else{
      this.bsModalRef.content.user = new UserManagement();
    } 
  }

  hide(){
    this.modalService.hide();
  }

  save(){
    this.user!.password = "abcd1234";
    this.userService.createOrEdit(this.user).pipe(finalize(() => this.user = new UserManagement())).subscribe({
      next: (re) => this.toastr.success("Lưu thành công"),
      error: (error) => this.toastr.error("Đã xảy ra lỗi")
    }
    );
    this.modalSave.emit(null);
    this.hide();
  }
}
