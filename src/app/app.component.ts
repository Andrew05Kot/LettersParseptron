import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AllLettersPopupComponent} from "./main-page/all-letters-popup.component";
import {LearningService} from "./services/learning.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  cells: number[] = [];
  resultLetter: string = 'А';

  constructor(private learningService: LearningService,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<AllLettersPopupComponent>
  ) {
    this.initEmptyCells();
  }

  openLettersPopup(): void {
    this.dialogRef = this.dialog.open(AllLettersPopupComponent, {
      width: '100%',
      height: '100%'
    });
  }

  changeCellValue(index: number): void {
    this.cells[index] = this.cells[index] === 0 ? 1 : 0;
  }

  submit(): void {
    console.log(this.cells);
  }

  cancel(): void {
    this.initEmptyCells();
  }

  private initEmptyCells(): void {
    for (let i = 0; i < 35; i++) {
      this.cells[i] = 0;
    }
  }


  // openPopup(): void {
  //   this.dialogRef = this.dialog.open(InputFieldsComponent, {
  //     height: '550px',
  //     width: '900px',
  //   });
  //   this.dialogRef.afterClosed().subscribe((result) => {
  //     console.log(result);
  //   });
  // }
}
