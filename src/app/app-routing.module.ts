import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { UpdateComponent } from './pages/update/update.component';
import { CreateComponent } from './pages/create/create.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ForumMainComponent } from './pages/forum-main/forum-main.component';
import { ForumCreateComponent } from './pages/forum-create/forum-create.component';
import { ForumDetailComponent } from './pages/forum-detail/forum-detail.component';
    


const routes: Routes = [
  {path:'home', component:HomeComponent, data:{title:'Home'}},
  {path:'update/:id',component:UpdateComponent, data:{title:'Update'}},
  {path:'detail/:id',component: DetailComponent, data:{title:'Detail'}},
  {path:'create',component:CreateComponent, data:{title:'Create'}},
  {path:'delete/:id',component:DeleteComponent, data:{title:'Delete'}},
  {path:'login',component:LoginComponent, data:{title:'Login'}},
  {path:'register',component:RegisterComponent, data:{title:'Register'}},
  {path:'landing',component:LandingComponent, data:{title:'Landing'}},
  {path:'forum',component:ForumMainComponent, data:{title:'Forum'}},
  {path:'forum-create/:id',component:ForumCreateComponent, data:{title:'Create msg'}},
  {path:'forum-detail/:id',component:ForumDetailComponent, data:{title:'Forum Detail'}},
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
