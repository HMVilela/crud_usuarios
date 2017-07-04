import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { HomeComponent } from '../home/home.component';


const usersAppRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'users',
        component: UsersComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(usersAppRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UsersRoutingModule {}