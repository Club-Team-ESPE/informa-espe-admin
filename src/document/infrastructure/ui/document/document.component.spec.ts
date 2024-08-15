import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocumentComponent } from './document.component';

describe('ListDocumentComponent', () => {
  let component: ListDocumentComponent;
  let fixture: ComponentFixture<ListDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
