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
  // weights: number[][] = [];

  constructor() {
    this.initTheta();
    this.initArrays();

    this.generateWeights(7, 5).then((res) => {
      console.log("Ваги: ", res);
      const weights = res;
      //method learn to called method that will change weights
        this.learn(weights).then(() => {
          console.log(GeneralWeights.WEIGHTS);
        });
      }
    );
  }

  public learn(weights: number[][]): Promise<void> {
    return new Promise<void>((resolve) => {

      let tot = 0;
      for (let n = 0; n < Alphabet.ALPHABET.length; n++) {
        let counter;
        while (true) {
          counter = n;
          for (let i = n; i < Alphabet.ALPHABET.length; i++) {

            this.d = Alphabet.ALPHABET[i] === Alphabet.ALPHABET[n] ? 1 : 0;

            // console.log("Перевірка літери ", Alphabet.ALPHABET[i], ': ');
            const x = this.letters[i];
            const res: boolean = this.isRight(this.getSum(x, weights));

            if (i !== n && res || i === n && !res) {
              // console.log('Не правильно');
              i--;
              this.changeWeights(weights, x, res, this.d);
              // console.log('');
            } else {
              GeneralWeights.WEIGHTS.push(weights);
              // console.log('Ваги підібрано');
              // console.log('');
              counter++;
            }
            tot++;
            if (counter === 33) {
              resolve();
              return;
            }
            if (tot == 100) {
              resolve();
              return;
            }
          }
        }
      }

    });
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

  generateWeights(rows: number, cols: number): Promise<any[]> {
    return new Promise(resolve => {
      let weights: number[][] = [[]];
      for (let i = 0; i < 7; i++) {
        weights[i] = [];
        for (let j = 0; j < 5; j++) {
          // weights[i][j] = Math.random() * 2;
          weights[i][j] = 5;
        }
        console.log(i, ' >>> ', weights[i])
      }
      console.log("Статистичны ваги: ", weights);
      resolve(weights);
    });
  }

  public getSum(x: number[][], weights: number[][]): number {
    let sum = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 5; j++) {
        sum += x[i][j] * weights[i][j];
      }
    }
    console.log("Сума = ", sum);
    return sum;
  }

  public isRight(sum: number): boolean {
    console.log(sum, " >= ", this.theta, ":  ", sum >= this.theta)
    return sum >= this.theta;
  }

  private async changeWeights(weights: number[][],  x: number[][], y: boolean, d: number): Promise<void> {
    return new Promise(resolve => {
      console.log("Нові синаптичні ваги: ");
      let ni = 2.5;
      let e = d - (y ? 1 : 0)
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 5; j++) {
          // this.weights[i][j] += ni * e * x[i][j];
          weights[i][j] = 8;
        }
      }
      console.log('changed:', weights);
      resolve();
    });
  }

  private initTheta(): void {
    this.theta = Math.random() * 2 - 1;
    console.log('θ = ', this.theta);
    console.log('');
  }

  private initArrays(): void {
    for (let letters of Letters.LETTERS) {
      this.letters.push(letters)
    }
  }

}
