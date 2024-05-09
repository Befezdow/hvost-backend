import { Binary, ObjectId } from 'mongodb';

export class NewShelterDbo {
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
  photos: Array<Binary>;
  links: Array<string>;
  login: string;
  password: string;
}

export class UpdateShelterDbo {
  name?: string;
  description?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  photos?: Array<Binary>;
  links?: Array<string>;
  login?: string;
  password?: string;
}

export class ShelterDetailsDbo {
  _id: ObjectId;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
  photos: Array<Binary>;
  links: Array<string>;
  login: string;
  password: string;
}

export class ShelterListDbo {
  _id: ObjectId;
  name: string;
  address: string;
  phoneNumber: string;
  photos: Array<Binary>;
}
