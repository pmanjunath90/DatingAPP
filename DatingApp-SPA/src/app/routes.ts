import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './MemberList/MemberList.component';
import { MessagesComponent } from './Messages/Messages.component';
import { ListsComponent } from './Lists/Lists.component';
import { AuthGuard } from './_guards/auth.guard';
export const appRoutes: Routes = [
    // { path: 'home', component: HomeComponent}, // below line path is empty because to redirect all wrong path to home page
    { path: '', component: HomeComponent},
    { path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
    { path: 'lists', component: ListsComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '', pathMatch: 'full'},
 ];
