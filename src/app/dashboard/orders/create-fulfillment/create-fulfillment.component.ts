import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Line, OrderLineDto } from 'src/app/api/models';
import { OrdersService } from 'src/app/api/services';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-create-fulfillment',
  templateUrl: './create-fulfillment.component.html',
  styleUrls: ['./create-fulfillment.component.scss']
})
export class CreateFulfillmentComponent implements OnInit {

  addLineForm = this.fb.group({
    orderLine: [undefined, [Validators.required]],
    quantity: [1, [Validators.required]]
  });

  orderLines: OrderLineDto[] = [];

  lines: { orderLine: OrderLineDto, quantity: number }[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly ordersService: OrdersService,
    private readonly spinner: NgxSpinnerService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getOrderLines();
  }

  addLine(): void {
    const orderLine = this.addLineForm.controls.orderLine.value as OrderLineDto;
    const quantity = this.addLineForm.controls.quantity.value as number;
    this.orderLines.splice(this.orderLines.indexOf(orderLine), 1);
    this.lines.push({ orderLine, quantity });
  }

  removeLine(line: { orderLine: OrderLineDto, quantity: number }): void {
    this.lines.splice(this.lines.indexOf(line), 1);
    this.orderLines.push(line.orderLine);
  }

  createFulfillment(): void {
    const lines: Line[] = [];
    this.lines.forEach(
      l => lines.push({
        id: l.orderLine.id!,
        quantity: l.quantity
      })
    );
    this.spinner.show();
    this.ordersService.createFulfillment({
      orderId: this.getOrderId(),
      body: lines
    })
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe({
        next: () => {
          this.getOrderLines();
          this.addLineForm.reset();
          this.lines = [];
        },
        error: error => this.showError(error?.error?.message)
      });
  }

  back(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    this.router.navigate(['dashboard', 'orders', orderId]);
  }

  private getOrderLines(): void {
    const id = this.getOrderId();
    this.spinner.show();
    this.ordersService.getLines({
      orderId: id,
      size: 1000
    })
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe({
        next: response => {
          this.orderLines = response.content || [];
        },
        error: error => this.showError(error?.error?.message)
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

}
