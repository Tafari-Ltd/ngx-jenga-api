import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'; 
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'jenga-all-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css']
})
export class MerchantsComponent implements AfterViewInit, OnDestroy {

  merchantList: any
  dataSource!: MatTableDataSource<any>
  destroyComponent = new Subject<void>()

  @Input() tableShadow: boolean = true
  @Input() showSearchBar: boolean = true
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort, {static: false}) sort!: MatSort
  
  constructor(
    private api: ApiService,
    public loadingService: LoaderService,
    private authenticateEndpoint: AuthService
  ){
    this.authenticateEndpoint.authenticateMerchant().subscribe({
      next: (res:any) => {
        localStorage.setItem('jenga-tkn', res.accessToken)
      },
      error: (e:any) => {
        throw new Error(e.error.message)
      }
    })
  }

  ngAfterViewInit(): void {
    this.getMerchants()
  }

  ngOnDestroy(): void {
    this.destroyComponent.next()
    this.destroyComponent.complete()
  }

  getMerchants(per_page:number = 25):void {
    this.api.getAllEazzyPayMerchants(1, per_page)
    .pipe(takeUntil(this.destroyComponent))
    .subscribe({
      next: (res:any) => {
        this.merchantList = res.data.merchants
        this.dataSource = new MatTableDataSource(res.data.merchants)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: (e:any) => {
        throw new Error(e.error.message)
      }
    })
  }

  updatePageSize(event:any) {
    const per_page = event.pageSize
    this.getMerchants(per_page)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
  
}
