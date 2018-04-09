//https://angular.io/guide/router
import { RouterModule, Routes, Router } from '@angular/router';
import { NgModule } from '@angular/core';

import { BatchHistoryComponent } from './batch-history/batch-history.component';
import { CommentsComponent } from './comments/comments.component';
import { CurrentBatchInfoComponent } from './current-batch-info/current-batch-info.component'
import { FloorstockComponent } from './floorstock/floorstock.component';
import { HomeComponent } from './home/home.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ShiftChangeComponent } from './shift-change/shift-change.component';
import { StartBatchComponent } from './start-batch/start-batch.component';
import { FinishBatchComponent } from './finish-batch/finish-batch.component';
import { BatchReworkComponent } from './batch-rework/batch-rework.component';
import { AddCommentComponent } from './add-comment/add-comment.component';



const appRoutes: Routes = [
    {
       path:"",
       redirectTo: '/home', 
       pathMatch: 'full' 
    },
    {
        path:"batch-history",
        component: BatchHistoryComponent,
    },
    {
        path: "running-batch",
        component: CurrentBatchInfoComponent,
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
    {
        path:"finish-batch",
        component: FinishBatchComponent,
    },
    {
        path:"batch-rework",
        component: BatchReworkComponent,
    },
    {
        path:"comments/add-comment",
        component: AddCommentComponent,
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