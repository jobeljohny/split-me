import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const cardAnimation = trigger('cardAnimation', [
  transition('* => void', []),
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),
    query(
      ':enter',
      stagger('200ms', [
        animate(
          '.3s ease-in',
          keyframes([
            style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
            style({
              opacity: 0.5,
              transform: 'translateY(-10px) scale(1.1)',
              offset: 0.3,
            }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ])
        ),
      ]),
      { optional: true }
    ),
    query(
      ':leave',
      stagger('100ms', [
        animate(
          '0.2s ease-out',
          keyframes([
            style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
            style({ opacity: 0.5, transform: 'scale(.5)', offset: 0.3 }),
            style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
          ])
        ),
      ]),
      { optional: true }
    ),
  ]),
]);
export const buttonAnimation = trigger('buttonAnimation', [
  transition(':increment', [
    style({ transform: 'translateY(-100%)' }),
    animate('.3s ease-out', style({ transform: 'translateY(0)' })),
  ]),
]);
