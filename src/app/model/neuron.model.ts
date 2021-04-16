export class NeuronModel {

  id: number = 0;
  weights: number[][] = [[]];
  speed = 0.35;
  bias: number = -Math.random();

  constructor(id: number) {
    this.id = id;
    this.bias = -Math.random();
    this.weights = Array.from({length: 7}).map(() =>
      Array.from({length: 5}).map(() => (Math.random()))
    );
  }

  public isRightLetter(letter: number[][]): boolean {
    let sum = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 5; j++) {
        sum += letter[i][j] * this.weights[i][j];
      }
    }
    sum += this.bias;
    return sum >= 0;
  }

  changeWeights(letter: number[][], eps: number) {
    this.bias += this.speed * eps;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 5; j++) {
        this.weights[i][j] += this.speed * eps * letter[i][j];
      }
    }
  }

}
