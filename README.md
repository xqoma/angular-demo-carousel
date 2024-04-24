# Angular Demo Carousel

Example of the Carousel Angular component.

- Live demo: https://angular-demo-carousel.vercel.app/

## Features

- [Angular 17](https://v17.angular.io/)
- [SCSS](https://sass-lang.com/)
- No 3rd party libraries are used
- Slide can contain any template, not only pictures
- Manual slide change
- Auto slide change
- Mouse and Swiping are supported
- Doesn't trigger any change detections
- Reactive API (component's inputs)

## Bugs to fix

- The button on a slide isn't clickable with Touch event

## Things that could be improved

### Merge mouse and touch events to get common "Drag" event api

Possible solutions

- `directive`
- `service`

Benefits

- reusable solution
- simplified way to handle "Drag" events
- less feature (carousel) code

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
