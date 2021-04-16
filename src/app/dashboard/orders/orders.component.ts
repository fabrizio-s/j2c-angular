import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderDto, PageOrderDto } from 'src/app/api/models';
import { OrdersService } from 'src/app/api/services';
import { OrdersState } from './orders.state';
import * as OrdersActions from './orders.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OrderStatus } from 'src/app/shared/model/order-status';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @Select(OrdersState.orders)
  orders$!: Observable<OrderDto[]>;

  @Select(OrdersState.page)
  page$!: Observable<number>;

  @Select(OrdersState.totalPages)
  totalPages$!: Observable<number>;

  @Select(OrdersState.status)
  status$!: Observable<OrderStatus | undefined>;

  constructor(
    private readonly ordersService: OrdersService,
    private readonly store: Store,
    private readonly spinner: NgxSpinnerService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    if (!this.store.selectSnapshot(OrdersState.initialized)) {
      this.spinner.show();
      this.getOrders(0, undefined)
      .subscribe({
        next: response => this.store.dispatch(new OrdersActions.Initialize(response.content || []))
      });
    }
  }

  filterStatus(status: OrderStatus | undefined): void {
    this.getOrders(0, status)
    .subscribe({
      next: response => this.store.dispatch(new OrdersActions.SetOrders(response.content || []))
    });
  }

  details(id: number | undefined): void {
    if (!id) {
      return;
    }
    this.router.navigate(['dashboard', 'orders', id]);
  }

  nextPage(): void {
    this.changePage(1);
  }

  previousPage(): void {
    this.changePage(-1);
  }

  private changePage(increment: 1 | -1): void {
    const newPage = (this.store.selectSnapshot(OrdersState.page) + increment) % this.store.selectSnapshot(OrdersState.totalPages);
    this.getOrders(newPage, undefined)
    .subscribe({
      next: response => this.store.dispatch(new OrdersActions.SetOrders(response.content || []))
    });
  }

  private getOrders(page: number, status: OrderStatus | undefined): Observable<PageOrderDto> {
    this.spinner.show();
    return this.ordersService.getAll({
      page,
      size: 10,
      sort: ['createdAt,desc'],
      status
    })
    .pipe(
      finalize(() => this.spinner.hide()),
      tap(
        response => this.store.dispatch(
          new OrdersActions.SetPagination({
            page: response.number || 0,
            totalPages: response.totalPages || -1
          })
        )
      )
    );
  }

}
