import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PageComponent } from './page/page.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    MainComponent,
    PageComponent
  ],
  imports: [
    RouterModule.forRoot(routes) // Configure routing here
  ],
  providers: [],
  bootstrap: [] // No need to bootstrap here if you're not using this NgModule for bootstrapping the app
})
export class AppModule { }
