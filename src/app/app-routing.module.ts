import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UpdateComponent } from './pages/update/update.component';

const routes: Routes = [
  {path:'home', component:HomeComponent, data:{title:'Home'}},
  {path:'update/:id',component:UpdateComponent, data:{title:'Update'}},
  {path:'',redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
