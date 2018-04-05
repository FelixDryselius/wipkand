//https://angular.io/guide/router
import { RouterModule, Routes, Router } from '@angular/router';
import { NgModule } from '@angular/core';




const appRoutes: Routes = [
    {
        path:"",
        //component: put components here 
    }
    // {
    //     path:"search",
    //     component: SearchDetailComponent,
    // },
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