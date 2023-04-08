import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'; 
import { ApiService } from '../../services/api.service';
import { LoaderService } from '../../services/loader.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'jenga-all-billers',
  templateUrl: './billers.component.html',
  styleUrls: ['./billers.component.css']
})
export class BillersComponent implements AfterViewInit {

  billersList: any
  dataSource!: MatTableDataSource<any>
  @Input() showSearchBar: boolean = true
  @Input() tableShadow: boolean = true
  @Input() categories: string = 'utilities'
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
    this.getBillers(25)
  }

  getBillers(per_page:number): void {
    this.api.getAllBillers(1, per_page, this.categories)
    .subscribe({
      next: (res:any) => { 
        this.billersList = res.data.billers
        this.dataSource = new MatTableDataSource(res.data.billers)
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
    this.getBillers(per_page)
  }

  onCategorySelected(event: any) {
    console.log('event is: ', event)
    this.api.getAllBillers(1, 25, event.value).subscribe({
      next: (res:any) => { 
        this.billersList = res.data.billers
        this.dataSource = new MatTableDataSource(res.data.billers)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
       },
       error: (e:any) => {
        throw new Error(e.error.message)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

}
