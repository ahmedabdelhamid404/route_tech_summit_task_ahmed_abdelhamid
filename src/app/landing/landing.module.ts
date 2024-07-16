import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteTaskRoutingModule } from './landing-routing.module';
import { BaseChartDirective } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromPipes from './pipes';

@NgModule({
  declarations: [...fromContainers.CONTAINERS, ...fromComponents.COMPONENTS],
  imports: [
    CommonModule,
    RouteTaskRoutingModule,
    ...fromPipes.PIPES,
    BaseChartDirective,
    ReactiveFormsModule,
  ],
  providers: [...fromServices.SERVICES],
})
export class LandingModule {}
