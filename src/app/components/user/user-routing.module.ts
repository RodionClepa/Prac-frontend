import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardFormComponent } from './card-form/card-form.component';
import { UserTransactionsComponent } from './user-transactions/user-transactions.component';
import { UserComponent } from './user/user.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CardInfoComponent } from './card-info/card-info.component';
import { AddTransactionsComponent } from './add-transactions/add-transactions.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'add-card', component: CardFormComponent },
      { path: 'transactions', component: UserTransactionsComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'card-info', component: CardInfoComponent },
      { path: 'add-transaction', component: AddTransactionsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
