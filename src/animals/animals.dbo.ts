import { Binary, ObjectId } from 'mongodb';

export class NewAnimalDbo {
  nickname: string;
  gender: string;
  species: string;
  minBirthDate: Date;
  maxBirthDate: Date;
  breed: string;
  color: string;
  size: string;
  description: string;
  photos: Array<Binary>;
  shelterId: ObjectId;
}

export class UpdateAnimalDbo {
  nickname?: string;
  gender?: string;
  species?: string;
  minBirthDate?: Date;
  maxBirthDate?: Date;
  breed?: string;
  color?: string;
  size?: string;
  description?: string;
  photos?: Array<Binary>;
  shelterId?: ObjectId;
}

export class AnimalDetailsDbo {
  _id: ObjectId;
  nickname: string;
  gender: string;
  species: string;
  minBirthDate: Date;
  maxBirthDate: Date;
  breed: string;
  color: string;
  size: string;
  description: string;
  photos: Array<Binary>;
  shelter: {
    id: ObjectId;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    links: Array<string>;
  };
}

export class AnimalListDbo {
  _id: ObjectId;
  nickname: string;
  photos: Array<Binary>;
  gender: string;
  minBirthDate: Date;
  maxBirthDate: Date;
}

export class AnimalListFiltersDbo {
  shelterId?: ObjectId;
}

export class AnimalListRequestDbo {
  offset?: number;
  limit?: number;
  filters: AnimalListFiltersDbo;
}
