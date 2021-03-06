import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { OrderItem } from './order-item.model';
import { OrderItemPopupService } from './order-item-popup.service';
import { OrderItemService } from './order-item.service';

@Component({
    selector: 'jhi-order-item-delete-dialog',
    templateUrl: './order-item-delete-dialog.component.html'
})
export class OrderItemDeleteDialogComponent {

    orderItem: OrderItem;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private orderItemService: OrderItemService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['orderItem']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'orderItemListModification',
                content: 'Deleted an orderItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-item-delete-popup',
    template: ''
})
export class OrderItemDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private orderItemPopupService: OrderItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.orderItemPopupService
                .open(OrderItemDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
