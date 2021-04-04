import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AllLettersPopupComponent} from "./main-page/all-letters-popup.component";
import {LearningService} from "./services/learning.service";
import {Letters} from "./constnants/letters";
import {Alphabet} from "./constnants/alphabet";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  cells: number[] = [];
  matrixCells: any[] = [];
  resultLetter: string = '';

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
    this.matrixCells = [];
    this.convertArrayToMatrix(this.cells);

    this.checkLetter();
  }

  private checkLetter() {
    let currentLetterPosition = this.findCurrentLetterPosition();
    if (currentLetterPosition) {
      let res = this.learningService.comparisonSum(this.matrixCells, currentLetterPosition) < 0;
      this.resultLetter = res ? Alphabet.ALPHABET[currentLetterPosition] : '';
    }
    else {
      this.resultLetter = '';
    }
  }

  private convertArrayToMatrix(array: number[]) {
    let row = new Array<number>();
    for (let i = 0; i < 35; i++) {
      row.push(array[i]);
      if ((i + 1) % 5 === 0) {
        this.matrixCells.push(row);
        row = new Array<number>();
      }
    }
  }

  cancel(): void {
    this.initEmptyCells();
    this.resultLetter = '';
  }

  private initEmptyCells(): void {
    for (let i = 0; i < 35; i++) {
      this.cells[i] = 0;
    }
  }

  private findCurrentLetterPosition() {
    let currentLetterPosition = NaN;
    let iterator = 0;
    Letters.LETTERS.forEach((letter => {
      let i;
      for (i = 0; i < 7; i++) {
        if (letter[i].join() == this.matrixCells[i].join()) {
          if (i === 6) {
            currentLetterPosition = iterator;
          }
        } else {
          break;
        }
      }
      iterator++;
    }));
    return currentLetterPosition;
  }

}
