import { Directive, effect, EventEmitter, input, Input, InputSignal, OnDestroy, Output } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[infiniteScroll]',
  standalone: true
})
export class InfiniteScrollDirective implements OnDestroy {
  isActiveInfiniteScroll: InputSignal<boolean> = input(false);
  @Input() infiniteScrollDistance: number = 20;

  @Output() scrolled = new EventEmitter<void>;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor() {
    this._listenSignals();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private listenScrollWindow(): void {
    let isActivePercentageBeforeEnd = false;
    fromEvent(window, 'scroll').pipe(
      takeUntil(this.unsubscribe))
      .subscribe(() => {
        let percentageBeforeEnd = this.calculatePositionScroll();
        if (!isActivePercentageBeforeEnd && percentageBeforeEnd <= this.infiniteScrollDistance) {
          isActivePercentageBeforeEnd = true;
          this.scrolled.emit();
        } else if (percentageBeforeEnd >= this.infiniteScrollDistance) {
          isActivePercentageBeforeEnd = false;
        }
      });
  }

  private calculatePositionScroll(): number {
    let scrollHeight = document.documentElement.scrollHeight;
    let innerHeight = window.innerHeight;
    let scrollY = window.scrollY || 0;
    return (scrollHeight - scrollY - innerHeight) / scrollHeight * 100;
  }

  private _listenSignals(): void {
    effect(() => {
      this.unsubscribe.next();
      if (this.isActiveInfiniteScroll()) {
        this.listenScrollWindow();
      }
    });
  }
}
