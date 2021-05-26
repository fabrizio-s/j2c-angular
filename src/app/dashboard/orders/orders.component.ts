import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { OrderDto } from 'src/app/api/models';
import { OrdersService } from 'src/app/api/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, startWith, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OrderStatus } from 'src/app/shared/model/order-status';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Optional } from 'typescript-optional';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  matSort!: MatSort;

  orders: OrderDto[] = [];
  totalOrders: number = 0;
  status: OrderStatus | undefined;
  sort: string | undefined;
  initialTableSize = 10;
  displayedColumns: string[] = ['id', 'amount', 'status', 'createdAt', 'details'];
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly ordersService: OrdersService,
    private readonly spinner: NgxSpinnerService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.matSort.sortChange.subscribe(() => this.paginator.pageIndex = 0),
      combineLatest([
        this.matSort.sortChange
          .pipe(
            startWith(undefined)
          ),
        this.paginator.page
          .pipe(
            startWith(undefined)
          )
      ])
        .pipe(
          tap(([sort]) => this.sort = toSortValue(sort).orUndefined())
        )
        .subscribe({
          next: () => this.getOrders({
            page: this.paginator.pageIndex,
            size: this.paginator.pageSize
          })
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  filterStatus(status: OrderStatus | undefined): void {
    this.status = status;
    this.getOrders({
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize
    });
  }

  details(id: number | undefined): void {
    if (!id) {
      return;
    }
    this.router.navigate(['dashboard', 'orders', id]);
  }

  private getOrders(
    params: {
      page: number,
      size: number
    }
  ): void {
    this.spinner.show();
    this.ordersService.getAll({
      page: params.page,
      size: params.size,
      sort: !!this.sort ? [this.sort] : [],
      status: this.status
    })
      .pipe(
        finalize(() => this.spinner.hide()),
      )
      .subscribe({
        next: response => {
          this.orders = response.content || [];
          this.totalOrders = response.totalElements || 0;
        },
        error: error => this.dialog.open(
          ErrorDialogComponent,
          {
            width: '350px',
            data: { error: error?.message }
          }
        )
      });
  }

}

const toSortValue = (sort: Sort | undefined): Optional<string> => {
  if (!sort?.direction) {
    return Optional.empty();
  }
  return Optional.of(sort.active + ',' + sort.direction);
}
