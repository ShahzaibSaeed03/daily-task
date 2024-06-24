import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WorkComponent } from './components/work/work.component';
import { PersnalComponent } from './components/persnal/persnal.component';
import { CompletedComponent } from './components/completed/completed.component';

export const routes: Routes = [
  { path: '', component: HomeComponent  },
  {path:"home",component:HomeComponent},
  { path: 'complete', component: CompletedComponent },
  { path: 'personal', component: PersnalComponent },
  { path: 'work', component: WorkComponent },
  { path: '**', redirectTo: '/home' }
];
