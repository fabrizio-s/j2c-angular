import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { OrderDto, OrderFulfillmentDto, OrderLineDto } from 'src/app/api/models';
import { OrdersService } from 'src/app/api/services';
import * as OrderDetailsActions from './order-details.actions';
import { OrderDetailsState } from './order-details.state';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  @Select(OrderDetailsState.order)
  order$!: Observable<OrderDto>;

  @Select(OrderDetailsState.lines)
  lines$!: Observable<OrderLineDto[]>;

  @Select(OrderDetailsState.fulfillments)
  fulfillments$!: Observable<OrderFulfillmentDto[]>;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly ordersService: OrdersService,
    private readonly spinner: NgxSpinnerService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        const id = this.parseId(params.get('orderId'));
        this.spinner.show();
        forkJoin({
          order: this.ordersService.get({
            orderId: id
          }),
          lines: this.ordersService.getLines({
            orderId: id
          }),
          fulfillments: this.ordersService.getFulfillments({
            orderId: id
          })
        })
        .pipe(
          finalize(() => this.spinner.hide())
        )
        .subscribe({
          next: result => this.store.dispatch(
            new OrderDetailsActions.SetDetails({
              order: result.order,
              lines: result.lines.content || [],
              fulfillments: result.fulfillments.content || []
            })
          ),
          error: error => {
            console.error(error);
            this.router.navigate(['dashboard', 'orders']);
          }
        });
      }
    });
  }

  fulfillmentDetails(id: number | undefined): void {
    if (!id) {
      return;
    }
    const orderId = this.route.snapshot.paramMap.get('orderId');
    this.router.navigate(['dashboard', 'orders', orderId, 'fulfillments', id]);
  }

  showModal(): void {
    // $('#myModal').on('shown.bs.modal', function () {
    //   $('#myInput').trigger('focus')
    // })
  }

  private parseId(id: any): number {
    try {
      return parseInt(id);
    } catch (error) {
      console.error('Failed to parse order id: ', id);
      this.router.navigate(['dashboard', 'orders']);
      throw error;
    }
  }

}
