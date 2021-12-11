import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './tournament/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { UpdateComponent } from './tournament/update/update.component';
import { CreateComponent } from './tournament/create/create.component';
import { DeleteComponent } from './tournament/delete/delete.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForumMainComponent } from './forum/forum-main/forum-main.component';
import { ForumCreateComponent } from './forum/forum-create/forum-create.component';
import { ForumDetailComponent } from './forum/forum-detail/forum-detail.component';
import { ModifyUserComponent } from './pages/modify-user/modify-user.component';
    
ModifyUserComponent

const routes: Routes = [
  {path:'home', component:HomeComponent, data:{title:'Home'}},
  {path:'update/:id',component:UpdateComponent, data:{title:'Update'}},
  {path:'detail/:id',component: DetailComponent, data:{title:'Detail'}},
  {path:'create',component:CreateComponent, data:{title:'Create'}},
  {path:'delete/:id',component:DeleteComponent, data:{title:'Delete'}},
  {path:'login',component:LoginComponent, data:{title:'Login'}},
  {path:'register',component:RegisterComponent, data:{title:'Register'}},
  {path:'forum',component:ForumMainComponent, data:{title:'Forum'}},
  {path:'forum-create/:id',component:ForumCreateComponent, data:{title:'Create msg'}},
  {path:'modify-user',component:ModifyUserComponent, data:{title:'Modify User'}},
  {path:'forum-detail/:id',component:ForumDetailComponent, data:{title:'Forum Detail'}},
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
