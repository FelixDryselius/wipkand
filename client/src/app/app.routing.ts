//https://angular.io/guide/router
import { RouterModule, Routes, Router } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component'
import { BatchHistoryComponent } from './batch-history/batch-history.component';
import { BatchHistoryDetailComponent } from './batch-history-detail/batch-history-detail.component';

import { BatchReworkComponent } from './batch-rework/batch-rework.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth/auth-guard.service';
import { RoleGuard } from './auth/role-guard.service';
import { BatchGuard } from './auth/batch-guard.service';


const appRoutes: Routes = [
    {
        path: "",
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: "login",
        component: AuthComponent,
    },
    {
        path: "logout",
        component: AuthLogoutComponent,
    },
    {
        path: "batch-history",
        component: BatchHistoryComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
            expectedRole: ['admin', 'operator', 'supervisor']
        }
    },
    {
        path: "batch-history/:id",
        component: BatchHistoryDetailComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
            expectedRole: ['admin', 'operator', 'supervisor']
        }
    },
    {
        path: 'statistics',
        loadChildren: "./statistics/statistics.module#StatisticsModule",
        canActivate: [AuthGuard, RoleGuard],
        data: {
            expectedRole: ['admin', 'operator', 'supervisor']
        }
    },
    {
        path: "batch-rework",
        component: BatchReworkComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
            expectedRole: ['admin', 'operator']
        }
    },
    {
        path: "**",
        component: NotFoundComponent,
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }