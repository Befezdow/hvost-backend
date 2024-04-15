import { ObjectId } from 'mongodb';

export class NewAnimalDbo {
  name: string;
  description: string;
  questions: Array<{
    text: string;
    options: Array<{
      id: number;
      text: string;
    }>;
    answer: number;
  }>;
}

export class AnimalDetailsDbo extends NewAnimalDbo {
  _id: ObjectId;
}

export class AnimalListDbo {
  _id: ObjectId;
  name: string;
  description: string;
}
