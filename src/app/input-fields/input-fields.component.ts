import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.scss']
})
export class InputFieldsComponent implements OnInit {

  fields: number[] = [];

  constructor() {
    for (let i = 0; i < 80; i++) {
      this.fields[i] = 0;
    }
  }

  ngOnInit(): void {
    this.initEmptyFields();
  }

  changeFieldValue(index: number): void {
    this.fields[index] = this.fields[index] === 0 ? 1 : 0;
  }

  cancel(): void {
    this.initEmptyFields();
  }

  private initEmptyFields(): void {
    for (let i = 0; i < 80; i++) {
      this.fields[i] = 0;
    }
  }

}
