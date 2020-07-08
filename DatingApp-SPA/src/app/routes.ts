import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './Messages/Messages.component';
import { ListsComponent } from './Lists/Lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberListComponent } from './members/MemberList/MemberList.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
export const appRoutes: Routes = [
   {path:'home', component:HomeComponent},
    // { path: 'home', component: HomeComponent}, // below line path is empty because to redirect all wrong path to home page
    { path: '',
    //  runGuardsAndResolvers: 'always',
     // canActivate: {AuthGuard} ,
        component: HomeComponent},
    { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver} 
                     , canActivate: [AuthGuard]},
    { path: 'members/:id', component: MemberDetailComponent , resolve: {user: MemberDetailResolver }
                        , canActivate: [AuthGuard]},
    { path: 'member/edit', component: MemberEditComponent, resolve:{user: MemberEditResolver},
     canDeactivate: [PreventUnsavedChanges]},
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
    { path: 'lists', component: ListsComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '', pathMatch: 'full'}
 ];
