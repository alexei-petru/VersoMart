// import { DebugElement } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { ClickOutsideDirective } from './click-outside.directive';

// describe('ClickOutsideDirective', () => {
//   let component: TestClickOutsideComponent;
//   let fixture: ComponentFixture<TestClickOutsideComponent>;
//   let debugElement: DebugElement;
//   let directive: ClickOutsideDirective;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [TestClickOutsideComponent, ClickOutsideDirective],
//     });

//     fixture = TestBed.createComponent(TestClickOutsideComponent);
//     component = fixture.componentInstance;
//     debugElement = fixture.debugElement.query(By.directive(ClickOutsideDirective));
//     directive = debugElement.injector.get(ClickOutsideDirective);

//     fixture.detectChanges();
//   });

//   it('should create an instance', () => {
//     expect(directive).toBeTruthy();
//   });

//   it('should emit an event when clicked outside', () => {
//     spyOn(component, 'onClickedOutside');
//     directive.onClick(fixture.debugElement.nativeElement);
//     expect(component.onClickedOutside).toHaveBeenCalled();
//   });

//   // More tests to verify the 'except' logic, etc.
// });
