import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

import { MessageModalComponent, ConfirmationModalComponent } from  '@components';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: BsModalService) {}

  public showMessage(options: MessageModalOptions) {
    const size = options.size || 'md';

    this.modalService.show(MessageModalComponent, {
      class: `modal-general modal-${size} modal-dialog-centered`,
      ignoreBackdropClick: true,
      keyboard: false,
      initialState: {
        title: options.title,
        message: options.message,
        redirectPath: options.redirectPath,
      },
    });
  }

  public showConfirmation(options: ConfirmationModalOptions) {
    const size = options.size || 'md';

    this.modalService.show(ConfirmationModalComponent, {
      class: `modal-general modal-${size} modal-dialog-centered`,
      ignoreBackdropClick: true,
      keyboard: false,
      initialState: {
        confirmationTitle: options.confirmationTitle,
        confirmationMessage: options.confirmationMessage,
        successTitle: options.successTitle,
        successMessage: options.successMessage,
        onConfirm: options.onConfirm,
        onSuccess: options.onSuccess,
      },
    });
  }
}

type MessageModalOptions = {
  size?: 'md' | 'lg' | 'xl';
  title?: string;
  message: string;
  redirectPath?: string;
};

type ConfirmationModalOptions = {
  size?: 'md' | 'lg' | 'xl';
  confirmationTitle?: string;
  confirmationMessage: string;
  successTitle?: string;
  successMessage: string;
  onConfirm: () => Observable<any>;
  onSuccess?: Function;
};
