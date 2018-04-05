//https://angular.io/guide/router
import { RouterModule, Routes, Router } from '@angular/router';
import { NgModule } from '@angular/core';

import { StartBatchComponent } from './start-batch/start-batch.component';
import { AppComponent } from './app.component';




const appRoutes: Routes = [
    {
        path:"",
        component: AppComponent,
    },
     {
         path:"startbatch",
         component: StartBatchComponent,
     }
    // {
    //     path:"videos",
    //     component:VideoListComponent,
    // },
    // {
    //     path:"videos/:slug",
    //     component:VideoDetailComponent,
    // }
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