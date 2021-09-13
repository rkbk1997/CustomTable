import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponentComponent } from './main-component/main-component.component';
import { UserDetailListComponent } from './user-detail-list/user-detail-list.component';

const routes: Routes = [
  {path:'', component: UserDetailListComponent},
  {path: 'testApi/:className' , component: MainComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
