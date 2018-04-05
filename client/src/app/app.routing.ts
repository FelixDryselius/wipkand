//https://angular.io/guide/router
import { RouterModule, Routes, Router } from '@angular/router';
import { NgModule } from '@angular/core';

import { BatchHistoryComponent } from './batch-history/batch-history.component';
import { CommentsComponent } from './comments/comments.component';
import { FloorstockComponent } from './floorstock/floorstock.component';
import { HomeComponent } from './home/home.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ShiftChangeComponent } from './shift-change/shift-change.component';
import { StartBatchComponent } from './start-batch/start-batch.component';



const appRoutes: Routes = [
    {
        path:"batch-history",
        component: BatchHistoryComponent,
    },
    {
        path:"comments",
        component: CommentsComponent,
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
        path:"scoreboard",
        component: ScoreboardComponent,
    },
    {
        path:"shift-change",
        component: ShiftChangeComponent,
    },
    {
        path:"start-batch",
        component: StartBatchComponent,
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