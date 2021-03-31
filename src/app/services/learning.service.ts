import {Injectable} from '@angular/core';
import {Letters} from "../constnants/letters";
import {Alphabet} from "../constnants/alphabet";
import {Weights} from "../weights";

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  theta: number = 0;
  letters = new Array<number[][]>();
  d: number = 0;

  constructor() {
    this.initTheta();

    this.initArrays();

    this.learn();
  }

  public learn(): void {
    this.generateWeights();

    for (let n = 0; n < Alphabet.ALPHABET.length; n++) {
      let total = 0;
      let counter;
      while (true) {
        counter = n;
        for (let i = n; i < Alphabet.ALPHABET.length; i++) {

          this.d = Alphabet.ALPHABET[i] === Alphabet.ALPHABET[n] ? 1 : 0;
          console.log('this.d',this.d)

          console.log("Перевірка літери ", Alphabet.ALPHABET[i], ': ');
          const x = this.letters[i];
          const res: boolean = this.isRight(this.getSum(x, n));

          if ((i !== n  && res) || (i === n && !res)) {
            this.changeWeights(x, res, this.d, n);
            console.log('Не правильно');
          } else {
            console.log('Буква правильна');
            counter++;
          }
          if(counter === 33) {
            console.log('Навчання завершене');
            return;
          }
          if (total === 500) {
            console.log(500);
            return;
          }
          total++;
        }
      }
    }

  }

  private generateWeights(): void {
    Weights.WEIGHTS.shift();
    console.log('Синаптичні ваги: ');
    const columns = [];
    for (let i = 0; i < 7; i++) {
      const rows: number[] = [];
      for (let j = 0; j < 5; j++) {
        rows.push(Math.random() * 2 -1);
      }
      columns.push(rows)
    }
    Weights.WEIGHTS.push(columns);
    console.log(Weights.WEIGHTS);
  }

  private getSum(x: number[][], index: number): number{
    let sum = 0;
    for (let i = 0; i < 7; i++){
      for (let j = 0; j < 5; j++){
        sum += x[i][j] * Weights.WEIGHTS[index][i][j];
      }
    }
    console.log("Сума = ", sum);
    return sum;
  }

  private isRight(sum: number): boolean {
    return sum >= this.theta;
  }

  private changeWeights(x: number[][], y: boolean, d: number, n: number): void {
    console.log("Нові синаптичні ваги: ");
    let ni = 2.5;
    // console.log('y = ', y);
    // console.log('this.d = ', this.d)
    let e = d - (y ? 1 : 0);
    // console.log('Weights.WEIGHTS[n]', Weights.WEIGHTS[n]);
    Weights.WEIGHTS[n][0][0] += ni * e;
    Weights.WEIGHTS[n][0][1] += ni * e * x[0][1];

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 5; j++) {
        // console.log('e', e);
        // console.log('x[i][j]', x[i][j]);
        // console.log('ni * e * x[i][j]', ni * e * x[i][j]);
        Weights.WEIGHTS[n][i][j] = ni * e * x[i][j];

      }
    }
    console.log(Weights.WEIGHTS[n]);
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
