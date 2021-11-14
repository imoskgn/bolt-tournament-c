import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { UpdateComponent } from './pages/update/update.component';
import { CreateComponent } from './pages/create/create.component';
import { DeleteComponent } from './pages/delete/delete.component';

const routes: Routes = [
  {path:'home', component:HomeComponent, data:{title:'Home'}},
  {path:'update/:id',component:UpdateComponent, data:{title:'Update'}},
  {path:'detail/:id',component: DetailComponent, data:{title:'Detail'}},
  {path:'create',component:CreateComponent, data:{title:'Create'}},
  {path:'delete/:id',component:DeleteComponent, data:{title:'Delete'}},
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
