import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { OrderFulfillmentDto, OrderFulfillmentLineDto, OrderLineDto } from 'src/app/api/models';
// import { FulfillmentDetailsState } from './fulfillment-details.state';
// import * as FulfillmentDetailsActions from './fulfillment-details.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/api/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-fulfillment-details',
  templateUrl: './fulfillment-details.component.html',
  styleUrls: ['./fulfillment-details.component.scss']
})
export class FulfillmentDetailsComponent implements OnInit {

  // @Select(FulfillmentDetailsState.fulfillment)
  // fulfillment$!: Observable<OrderFulfillmentDto>;

  // @Select(FulfillmentDetailsState.lines)
  // lines$!: Observable<{ orderLine: OrderLineDto, fulfillmentLine: OrderFulfillmentLineDto }[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly ordersService: OrdersService,
    private readonly spinner: NgxSpinnerService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe({
    //   next: params => {
    //     const orderId = this.parseId(params.get('orderId'));
    //     const fulfillmentId = this.parseId(params.get('fulfillmentId'));
    //     this.spinner.show();
    //     forkJoin({
    //       fulfillment: this.ordersService.getFulfillment({
    //         orderId,
    //         fulfillmentId
    //       }),
    //       orderLines: this.ordersService.getLines({
    //         orderId
    //       }),
    //       fulfillmentLines: this.ordersService.getFulfillmentLines({
    //         orderId,
    //         fulfillmentId
    //       })
    //     })
    //     .pipe(
    //       finalize(() => this.spinner.hide())
    //     )
    //     .subscribe({
    //       next: result => {
    //         const lines: { orderLine: OrderLineDto, fulfillmentLine: OrderFulfillmentLineDto }[] = [];
    //         const orderLines = result.orderLines.content || [];
    //         const fulfillmentLines = result.fulfillmentLines.content || [];
    //         fulfillmentLines.forEach(
    //           fulfillmentLine => {
    //             const orderLine = orderLines.find(ol => ol.id === fulfillmentLine.orderLineId);
    //             if (!!orderLine) {
    //               lines.push({ fulfillmentLine, orderLine });
    //             } else {
    //               console.error('No order line was found for fulfillment line with id ' + fulfillmentLine.id);
    //             }
    //           }
    //         );
    //         this.store.dispatch(
    //           new FulfillmentDetailsActions.SetDetails({
    //             fulfillment: result.fulfillment,
    //             lines
    //           })
    //         );
    //       },
    //       error: error => {
    //         console.error(error);
    //         this.router.navigate(['dashboard', 'orders', orderId]);
    //       }
    //     });
    //   }
    // });
  }

  back(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    this.router.navigate(['dashboard', 'orders', orderId]);
  }

  private parseId(id: any): number {
    try {
      return parseInt(id);
    } catch (error) {
      console.error('Failed to parse fulfillment id: ', id);
      this.router.navigate(['dashboard', 'orders']);
      throw error;
    }
  }

}
