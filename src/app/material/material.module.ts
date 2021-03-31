import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ]
})
export class MaterialModule { }
