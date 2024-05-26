export class PhotoDataDto {
  mime: string;
  data: string;
}

export class NewShelterDto {
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
  photos: Array<PhotoDataDto>;
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
  photos: Array<PhotoDataDto>;
  links: Array<string>;
}

export class ShelterListDto {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  photos: Array<PhotoDataDto>;
}

export class ShelterListRequestDto {
  offset?: number;
  limit?: number;
}

export class ShelterListResponseDto {
  totalAmount: number;
  list: Array<ShelterListDto>;
}
