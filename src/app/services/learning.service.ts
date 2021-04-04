import {Injectable} from '@angular/core';
import {Letters} from "../constnants/letters";
import {Alphabet} from "../constnants/alphabet";
import {GeneralWeights} from "../constnants/weights";

@Injectable({
  providedIn: 'root'
})
export class LearningService {
  public theta: number = 0;
  letters = new Array<number[][]>();
  d: number = 0;
  weight =  this.generateWeights(7, 5);

  constructor() {
    this.initTheta();


    this.initArrays();

    console.log('Синаптичні ваги: ', this.weight);

    this.learn();
  }

  public learn(): void {



    for (let n = 0; n < Alphabet.ALPHABET.length; n++) {
      let counter;
      while (true) {
        counter = n;
        for (let i = n; i < Alphabet.ALPHABET.length; i++) {

          this.d = Alphabet.ALPHABET[i] === Alphabet.ALPHABET[n] ? 1 : 0;

          console.log("Перевірка літери ", Alphabet.ALPHABET[i], ': ');
          const x = this.letters[i];
          const res: boolean = this.isRight(this.getSum(x));

          if ((i !== n  && res) || (i === n && !res)) {
            console.log('Не правильно');
            i--;
            this.changeWeights(x, res, this.d);

            console.log('');
          } else {
            GeneralWeights.WEIGHTS.push(this.weight);
            console.log('Ваги підібрано');
            console.log('');
            counter++;
          }
          if(counter === 33) {
            console.log('Навчання завершене');
            console.log(GeneralWeights.WEIGHTS);
            return;
          }
        }
      }
    }

  }

  comparisonSum(twoDimensionalArray: number[][], index: number): number {
    let sum = 0, i = 0, j = 0;
    twoDimensionalArray.forEach(array => {
      j = 0;
      array.forEach(item => {
        i = 0;
        sum += item * GeneralWeights.WEIGHTS[index][i][j];
        j++;
      })
      i++;
    })
    return sum;
  }

  generateWeights(rows: number, cols: number): number[][] {
    return Array.from({ length: rows }).map(() =>
      Array.from({ length: cols }).map(() => Math.random())
    );
  }

  public getSum(x: number[][]): number{
    let sum = 0;
    for (let i = 0; i < 7; i++){
      for (let j = 0; j < 5; j++){
        sum += x[i][j] * this.weight[i][j];
      }
    }
    console.log("Сума = ", sum);
    return sum;
  }

  public isRight(sum: number): boolean {
    return sum >= this.theta;
  }

  private changeWeights(x: number[][], y: boolean, d: number): void {
    console.log("Нові синаптичні ваги: ");
    let ni = 2.5;
    let e = d - (y ? 1 : 0);

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 5; j++) {
        this.weight[i][j] += ni * e * x[i][j];

      }
    }
    console.log(this.weight);
  }

  private initTheta(): void {
    this.theta = Math.random() * 2 -1;
    console.log('θ = ', this.theta);
    console.log('');
  }

  private initArrays(): void {
    for (let letters of Letters.LETTERS) {
      this.letters.push(letters)
    }
  }

}
