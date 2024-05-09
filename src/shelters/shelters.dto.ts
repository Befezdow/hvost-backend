export class NewShelterDto {
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
  photos: Array<string>;
  links: Array<string>;
  login: string;
  password: string;
}

export class ShelterDetailsDto {
  id: string;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
  photos: Array<string>;
  links: Array<string>;
}

export class ShelterListDto {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  photos: Array<string>;
}

export class ShelterListRequestDto {
  offset?: number;
  limit?: number;
}

export class ShelterListResponseDto {
  totalAmount: number;
  list: Array<ShelterListDto>;
}
