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

export class PhotoDataDto {
  mime: string;
  data: string;
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
  photos: Array<PhotoDataDto>;
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
  photos: Array<PhotoDataDto>;
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
  photos: Array<PhotoDataDto>;
  gender: Gender;
  species: Species;
  minBirthDate: string;
  maxBirthDate: string;
  breed: string;
  color: string;
  size: Size;
}

export class AnimalListRequestDto {
  offset?: number;
  limit?: number;
  filters?: {
    shelterId?: string;
  };
}

export class AnimalListResponseDto {
  totalAmount: number;
  list: Array<AnimalListDto>;
}
