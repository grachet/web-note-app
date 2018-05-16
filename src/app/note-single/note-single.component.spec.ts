import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSingleComponent } from './note-single.component';

describe('NoteSingleComponent', () => {
  let component: NoteSingleComponent;
  let fixture: ComponentFixture<NoteSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
