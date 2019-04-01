import { ProfilePage } from './../profile/profile.page';
import { DicasPage } from './../dicas/dicas.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { DicasPageModule } from '../dicas/dicas.module';
import { ProfilePageModule } from '../profile/profile.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'dicas', loadChildren: '../dicas/dicas.module#DicasPageModule' },
      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
      { path: 'post', loadChildren: './post/post.module#PostPageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DicasPageModule,
    ProfilePageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
