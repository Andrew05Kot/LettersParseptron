import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {InputFieldsComponent} from "./input-fields/input-fields.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public dialog: MatDialog) {
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(InputFieldsComponent, {
      height: '550px',
      width: '900px',
    });
  }
}
