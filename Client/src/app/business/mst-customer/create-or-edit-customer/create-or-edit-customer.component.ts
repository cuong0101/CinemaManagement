import { CustomersService } from './../../../_services/customer.service';
import { Customer } from 'src/app/_interfaces/customer';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { error } from 'console';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import  {Router}  from '@angular/router';

@Component({
  selector: 'app-create-or-edit-customer',
  templateUrl: './create-or-edit-customer.component.html',
  styleUrls: ['./create-or-edit-customer.component.css']
})
export class CreateOrEditCustomerComponent implements OnInit {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  bsModalRef!: BsModalRef;
  customer: Customer = new Customer();
  constructor(private modalService: BsModalService, 
    private route: Router,
    private customerService: CustomersService,
    private toastr: ToastrService,
    ) { 
    }

  ngOnInit() {
    
  }

  openModal(customer?: Customer) {
    
    this.customer = new Customer();
    const config: ModalOptions = {
      class: 'modal-dialog modal-xl',
      backdrop: 'static',
      keyboard: false
    };
    
    this.bsModalRef = this.modalService.show(CreateOrEditCustomerComponent, config);
    if(customer) {
      this.customer = customer;
      this.bsModalRef.content.customer = customer;
    }
    else{
      this.bsModalRef.content.customer = new Customer();
    } 
  }

  hide(){
    this.modalService.hide();
  }

  save(){
    this.customerService.createOrEdit(this.customer).pipe(finalize(() => this.customer = new Customer())).subscribe({
      next: (re) => this.toastr.success("Lưu thành công"),
      error: (error) => this.toastr.error("Đã xảy ra lỗi")
    }
    );
    this.modalSave.emit(null);
    //location.reload();
    this.hide();
    this.route.navigate(["/customer"]);
  }
}
