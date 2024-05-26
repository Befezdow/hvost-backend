import { Binary } from 'mongodb';
import {
  NewShelterDbo,
  ShelterDetailsDbo,
  ShelterListDbo,
} from './shelters.dbo';
import {
  NewShelterDto,
  ShelterDetailsDto,
  ShelterListDto,
} from './shelters.dto';

export function shelterDetailsDboToDto(
  data: ShelterDetailsDbo,
): ShelterDetailsDto {
  return {
    id: data._id.toString(),
    name: data.name,
    description: data.description,
    address: data.address,
    phoneNumber: data.phoneNumber,
    email: data.email,
    photos: data.photos.map((elem) => ({
      mime: elem.mime,
      data: elem.data.toString('base64'),
    })),
    links: data.links,
  };
}

export function shelterListDboToDto(data: ShelterListDbo): ShelterListDto {
  return {
    id: data._id.toString(),
    name: data.name,
    address: data.address,
    phoneNumber: data.phoneNumber,
    photos: data.photos.map((elem) => ({
      mime: elem.mime,
      data: elem.data.toString('base64'),
    })),
  };
}

export function newShelterDtoToDbo(data: NewShelterDto): NewShelterDbo {
  return {
    name: data.name,
    description: data.description,
    address: data.address,
    phoneNumber: data.phoneNumber,
    email: data.email,
    photos: data.photos.map((elem) => ({
      mime: elem.mime,
      data: Binary.createFromBase64(elem.data),
    })),
    links: data.links,
    login: data.login,
    password: data.password,
  };
}
