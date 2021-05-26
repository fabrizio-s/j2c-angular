import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { OrderDto, OrderFulfillmentDto, OrderLineDto } from 'src/app/api/models';
import { OrdersService } from 'src/app/api/services';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: OrderDto | undefined;
  lines: OrderLineDto[] = [];
  fulfillments: OrderFulfillmentDto[] = [];
  linesDisplayedColumns: string[] = ['productName', 'unitPriceAmount', 'quantity', 'reservedQuantity', 'fulfilledQuantity'];
  fulfillmentsDisplayedColumns: string[] = ['id', 'completed', 'fulfillmentDetails'];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly ordersService: OrdersService,
    private readonly spinner: NgxSpinnerService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  confirm(): void {
    this.spinner.show();
    this.ordersService.confirm({
      orderId: this.getOrderId()
    })
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe({
        next: () => this.getOrderDetails(),
        error: error => this.showError(error?.error?.message)
      });
  }

  createFulfillment(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    this.router.navigate(['dashboard', 'orders', orderId, 'create-fulfillment']);
  }

  fulfill(): void {
    this.spinner.show();
    this.ordersService.fulfill({
      orderId: this.getOrderId()
    })
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe({
        next: () => this.getOrderDetails(),
        error: error => this.showError(error?.error?.message)
      });
  }

  updateTrackingNumber(): void {
  }

  cancel(): void {
    this.spinner.show();
    this.ordersService.cancel({
      orderId: this.getOrderId()
    })
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe({
        next: () => this.getOrderDetails(),
        error: error => this.showError(error?.error?.message)
      });
  }

  reinstate(): void {
    this.spinner.show();
    this.ordersService.reinstate({
      orderId: this.getOrderId()
    })
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe({
        next: () => this.getOrderDetails(),
        error: error => this.showError(error?.error?.message)
      });
  }

  undoFulfill(): void {
    this.spinner.show();
    this.ordersService.undoFulfill({
      orderId: this.getOrderId()
    })
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe({
        next: () => this.getOrderDetails(),
        error: error => this.showError(error?.error?.message)
      });
  }

  fulfillmentDetails(id: number | undefined): void {
    if (!id) {
      return;
    }
    const orderId = this.route.snapshot.paramMap.get('orderId');
    this.router.navigate(['dashboard', 'orders', orderId, 'fulfillments', id]);
  }

  private getOrderId(): number {
    const id = this.route.snapshot.paramMap.get('orderId') || 'NONE';
    try {
      return parseInt(id);
    } catch (error) {
      console.error('Failed to parse order id: ', id);
      this.router.navigate(['dashboard', 'orders']);
      throw error;
    }
  }

  private getOrderDetails(): void {
    const id = this.getOrderId();
    this.spinner.show();
    forkJoin({
      order: this.ordersService.get({
        orderId: id
      }),
      lines: this.ordersService.getLines({
        orderId: id,
        size: 1000
      }),
      fulfillments: this.ordersService.getFulfillments({
        orderId: id,
        size: 1000
      })
    })
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe({
        next: result => {
          this.order = result.order;
          this.lines = result.lines.content || [];
          this.fulfillments = result.fulfillments.content || [];
        },
        error: error => {
          this.showError(error?.error?.message);
          this.router.navigate(['dashboard', 'orders']);
        }
      });
  }

  private showError(message: string): void {
    this.dialog.open(
      ErrorDialogComponent,
      {
        width: '350px',
        data: { error: message }
      }
    );
  }

}
