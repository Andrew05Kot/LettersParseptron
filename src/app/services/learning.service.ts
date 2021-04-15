import {Injectable} from '@angular/core';
import {NeuronModel} from '../model/neuron.model';
import {Letters} from '../constnants/letters';
import {Alphabet} from '../constnants/alphabet';

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  neurons: NeuronModel[] = [];

  constructor() {
    this.learn();
  }

  private learn(): void {
    for (let i = 0; i < Letters.LETTERS.length; i++) {
      console.log('Learning ', Alphabet.ALPHABET[i], '...')
      this.neurons.push(this.learnLetter(new NeuronModel(i), Letters.LETTERS[i]));
    }
    console.log('Completed!');
  }

  private learnLetter(neuron: NeuronModel, learnLetter: number[][]): NeuronModel {
    while (true) {
      let counter = 0;
      for (let n = 0; n < Letters.LETTERS.length; n++) {
        const res: boolean = neuron.isRightLetter(Letters.LETTERS[n]);

        const isEqual = this.isEqual(Letters.LETTERS[n], learnLetter);
        if (res && isEqual || !res && !isEqual) {
          counter++;
        } else {
          neuron.changeWeights(Letters.LETTERS[n], (isEqual ? 1 : 0) - (res ? 1 : 0));
        }
      }
      if (counter === 33) {
        return neuron;
      }
    }
  }

  checkLetter(letter: number[][]): number {
    let id = 34;
    this.neurons.forEach(neuron => {
      const isRight = neuron.isRightLetter(letter);
      console.log(neuron.id, ' ', isRight);
      if (isRight) {
        id = neuron.id;
      }
    });
    return id;
  }

  isEqual(value: number[][], other: number[][]): boolean {
    return JSON.stringify(value) === JSON.stringify(other);
  }

}
