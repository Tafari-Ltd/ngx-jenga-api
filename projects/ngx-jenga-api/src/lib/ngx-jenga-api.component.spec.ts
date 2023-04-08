import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxJengaApiComponent } from './ngx-jenga-api.component';

describe('NgxJengaApiComponent', () => {
  let component: NgxJengaApiComponent;
  let fixture: ComponentFixture<NgxJengaApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxJengaApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxJengaApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
