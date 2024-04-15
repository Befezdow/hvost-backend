export enum Gender {
  BOY = 'BOY',
  GIRL = 'GIRL',
}

export enum Species {
  CAT = 'CAT',
  DOG = 'DOG',
}

export enum Size {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export class NewAnimalDto {
  nickname: string;
  gender: Gender;
  species: Species;
  minBirthDate: string;
  maxBirthDate: string;
  breed: string;
  color: string;
  size: Size;
  description: string;
  photos: Array<string>;
  shelterId: string;
}

export class AnimalDetailsDto {
  id: string;
  nickname: string;
  gender: Gender;
  species: Species;
  minBirthDate: string;
  maxBirthDate: string;
  breed: string;
  color: string;
  size: Size;
  description: string;
  photos: Array<string>;
  shelter: {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
    links: Array<string>;
  };
}

export class AnimalListDto {
  id: string;
  nickname: string;
  photo: string;
  gender: Gender;
  minBirthDate: string;
  maxBirthDate: string;
}
