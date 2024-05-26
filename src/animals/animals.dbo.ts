import { Binary, ObjectId } from 'mongodb';

export class PhotoDataDbo {
  mime: string;
  data: Binary;
}

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
  photos: Array<PhotoDataDbo>;
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
  photos?: Array<PhotoDataDbo>;
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
  photos: Array<PhotoDataDbo>;
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
  photos: Array<PhotoDataDbo>;
  gender: string;
  species: string;
  minBirthDate: Date;
  maxBirthDate: Date;
  breed: string;
  color: string;
  size: string;
}

export class AnimalListFiltersDbo {
  shelterId?: ObjectId;
}

export class AnimalListRequestDbo {
  offset?: number;
  limit?: number;
  filters: AnimalListFiltersDbo;
}
