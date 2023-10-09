import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
interface HasElementRef {
  _elementRef: ElementRef;
}

type ExceptType = ElementRef | HTMLElement | HasElementRef | undefined;
@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Output() public clickOutside = new EventEmitter<void>();
  @Input() public except: ExceptType;

  constructor(private readonly elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const isTargetElement = this.elementRef.nativeElement.contains(targetElement);
    const isExceptElement = this.checkTargetIfExcept(this.except, targetElement);
    if (!isTargetElement && !isExceptElement) {
      this.clickOutside.emit();
    }
  }

  private checkTargetIfExcept(except: ExceptType, targetElement: HTMLElement) {
    if (!except) return false;
    if (except instanceof ElementRef) {
      return except?.nativeElement.contains(targetElement);
    }
    if (except instanceof HTMLElement) {
      return except?.contains(targetElement);
    }
    if (except && '_elementRef' in except) {
      return except._elementRef.nativeElement.contains(targetElement);
    }
    return false;
  }
}
