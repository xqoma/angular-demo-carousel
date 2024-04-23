import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from '@adc/app/app.component';
import {appConfig} from '@adc/app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
