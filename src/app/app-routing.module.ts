import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UpdateComponent } from './pages/update/update.component';
import { CreateComponent } from './pages/create/create.component';

const routes: Routes = [
  {path:'home', component:HomeComponent, data:{title:'Home'}},
  {path:'update/:id',component:UpdateComponent, data:{title:'Update'}},
  {path:'create',component:CreateComponent, data:{title:'Create'}},
  {path:'',redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
