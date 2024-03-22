import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-bubbles',
  template: `
    <div class="bubble-container">
      <div
        *ngFor="let bubble of [1, 2, 3]"
        class="bubbles"
        [style.animation-delay]="bubble / 10 + 's'"
        [ngStyle]="{
          'width.px': size,
          'height.px': size,
          'border-radius.px': size
        }"
      ></div>
    </div>
  `,
  styles: [
    `
      .bubble-container {
        display: flex;
        .bubbles {
          background: #fedd93;
          margin: 0 4px;
          animation: grow 1.2s ease infinite;
        }
      }

      @keyframes grow {
        0%,
        100% {
          transform: scale(0);
        }

        50% {
          transform: scale(1);
        }
      }
    `,
  ],
})
export class LoadingBubblesComponent {
  @Input('size') size: number = 10;
}
