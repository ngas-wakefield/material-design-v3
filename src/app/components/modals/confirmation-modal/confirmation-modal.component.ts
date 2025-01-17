import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiError } from '@shared/types';
import { NgIf } from '@angular/common';

import { EqButtonComponent } from '../eq-button/eq-button.component';

@Component({
  selector: 'confirmation-modal',
  styleUrls: ['./confirmation-modal.component.css'],
  templateUrl: './confirmation-modal.component.html',
  standalone: true,
  imports: [NgIf, EqButtonComponent],
})
export class ConfirmationModalComponent implements OnInit {
  // eqModalService.showConfirmation(options)
  confirmationTitle?: string;

  confirmationMessage!: string;

  successTitle?: string;

  successMessage!: string;

  onConfirm!: Function;

  onSuccess?: Function;

  // internal use
  modalTitle?: string;

  modalMessage?: string;

  modalType!: 'confirm' | 'success' | 'error';

  constructor(
    public modalRef: BsModalRef,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.modalType = 'confirm';
    this.modalTitle = this.confirmationTitle;
    this.modalMessage = this.confirmationMessage;
  }

  onClickConfirm() {
    this.spinner.show();
    this.onConfirm().subscribe(
      () => {
        this.modalType = 'success';
        this.modalTitle = this.successTitle;
        this.modalMessage = this.successMessage;

        this.spinner.hide();
      },
      (err: ApiError) => {
        this.modalType = 'error';
        this.modalTitle = 'Error';
        this.modalMessage = err.message;
        this.spinner.hide();
      },
    );
  }

  onClickSuccess() {
    if (this.onSuccess) {
      this.onSuccess();
    }

    this.modalRef.hide();
  }
}
