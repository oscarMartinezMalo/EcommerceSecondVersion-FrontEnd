import { trigger, transition, style, query, group, animateChild, animate, keyframes, stagger } from '@angular/animations';

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      // Set a default  style for enter and leave
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0
        }),
      ], { optional: true }),
      // Animate the new page in
      query('@routeAnimations', [
        animate('1000ms 500ms ease',
          style({
            opacity: 1
          })),
      ], { optional: true }),
    ]),
  ]);

export const slide = trigger('slide', [
  transition(':enter', [
    // Set a default  style for enter
    query(':enter', [
      style({ opacity: 0, transform: 'translateX(-30%)'}),
    ], { optional: true }),
    // Animate entrace
    query(':enter', stagger(100, [
      animate('1s ease')
    ]))
  ])
]);

export const fadeEnter = trigger('fadeEnter', [
  transition(':enter', [
    query(':enter', [
      style({ opacity: 0 }),
      stagger(100, [animate('1s')])
    ], { optional: true })
  ])
]);
