import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatGridListModule
  ]
})
export class MaterialModule { }
