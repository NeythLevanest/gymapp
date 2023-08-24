import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { SigninPageComponent } from "./pages/login-pages/signin-page/signin-page.component";
import { SignupPageComponent } from "./pages/login-pages/signup-page/signup-page.component";
import { LoginGuardsGuard } from "./guards/login.guard";
import { DashboardPageComponent } from "./pages/dashboard-page/dashboard-page.component";
import { ReservePageComponent } from "./pages/reserve-page/reserve-page.component";

const app_routes: Routes =[
    {path:'sign-in', component:SigninPageComponent},
    {path:'sign-up', component:SignupPageComponent},
    {path:'app', component:MainPageComponent, canActivate:[LoginGuardsGuard],
        children:
            [
                {path:'dashboard', component:DashboardPageComponent},
                {path:'reserve-suit', component:ReservePageComponent},
            ]
    },
    {path:'', pathMatch:'full', redirectTo:'sign-in'},
    {path:'**', pathMatch:'full', redirectTo:'sign-in'}
];

export const app_routing = RouterModule.forRoot(app_routes,{useHash: true});