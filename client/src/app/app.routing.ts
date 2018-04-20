//https://angular.io/guide/router
import { RouterModule, Routes, Router } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
import { BatchHistoryComponent } from './batch-history/batch-history.component';


import { FloorstockComponent } from './floorstock/floorstock.component';
import { HomeComponent } from './home/home.component';

import { ShiftChangeComponent } from './shift-change/shift-change.component';


import { BatchReworkComponent } from './batch-rework/batch-rework.component';

import { StatisticsModule } from './statistics/statistics.module';


const appRoutes: Routes = [   
    {
       path:"",
       redirectTo: '/home', 
       pathMatch: 'full' 
    },
    {
        path:"login",
        component: AuthComponent,
    },
    {
        path:"batch-history",
        component: BatchHistoryComponent,
    },



    {
        path:"floorstock",
        component: FloorstockComponent,
    },
    {
        path:"home",
        component: HomeComponent,
    },
 
    {
        path:"shift-change",
        component: ShiftChangeComponent,
    },
    
    {
        path: 'statistics',
        loadChildren: () => StatisticsModule
    },

    {
        path:"batch-rework",
        component: BatchReworkComponent,
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
export class AppRoutingModule {}