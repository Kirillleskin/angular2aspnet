import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home.component';
import { BookComponent } from './Components/book.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'book', component: BookComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);