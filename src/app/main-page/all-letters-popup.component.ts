import {Component, OnInit} from '@angular/core';
import {Letters} from "../constnants/letters";

@Component({
  selector: 'app-main-page',
  templateUrl: './all-letters-popup.component.html',
  styleUrls: ['./all-letters-popup.component.scss']
})
export class AllLettersPopupComponent implements OnInit {

  letters = new Array<number[][]>();

  constructor() {
    for (let letters of Letters.LETTERS) {
      this.letters.push(letters);
    }

  }

  private initEmptyCells(): void {
  }

  ngOnInit(): void {
  }

}
