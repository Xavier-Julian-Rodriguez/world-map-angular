import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { Map } from './map.component';

@NgModule({
  imports: [RouterModule.forRoot(routes), Map],
  exports: [RouterModule],
})
export class AppRoutingModule {}
