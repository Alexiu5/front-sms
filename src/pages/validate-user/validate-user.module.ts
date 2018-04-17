import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidateUserPage } from './validate-user';

@NgModule({
  declarations: [
    ValidateUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ValidateUserPage),
  ],
})
export class ValidateUserPageModule {}
