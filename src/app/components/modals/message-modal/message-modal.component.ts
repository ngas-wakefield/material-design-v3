import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { EqButtonComponent } from '../eq-button/eq-button.component';

@Component({
  selector: 'message-modal',
  styleUrls: ['./message-modal.component.css'],
  templateUrl: './message-modal.component.html',
  standalone: true,
  imports: [CommonModule, EqButtonComponent],
})
export class MessageModalComponent implements OnInit {
  // eqModalService.showMessage(options)
  title?: string;

  message!: string;

  redirectPath?: string;

  // Internal use
  buttonText!: string;

  ngOnInit(): void {
    this.buttonText = 'OK';
  }

  constructor(
    private modalRef: BsModalRef,
    private router: Router,
  ) {}

  onClickCloseOrHide() {
    if (this.redirectPath) {
      this.router.navigate([this.redirectPath]);
    }
    this.modalRef.hide();
  }
}
