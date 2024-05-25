import { Binary, ObjectId } from 'mongodb';
import {
  NewAnimalDbo,
  AnimalDetailsDbo,
  AnimalListDbo,
  AnimalListRequestDbo,
  AnimalListFiltersDbo,
} from './animals.dbo';
import {
  NewAnimalDto,
  AnimalDetailsDto,
  AnimalListDto,
  Gender,
  Species,
  Size,
  AnimalListRequestDto,
} from './animals.dto';

export function animalDetailsDboToDto(
  data: AnimalDetailsDbo,
): AnimalDetailsDto {
  return {
    id: data._id.toString(),
    nickname: data.nickname,
    gender: data.gender as Gender,
    species: data.species as Species,
    minBirthDate: data.minBirthDate.toISOString(),
    maxBirthDate: data.maxBirthDate.toISOString(),
    breed: data.breed,
    color: data.color,
    size: data.size as Size,
    description: data.description,
    photos: data.photos.map((elem) => elem.toString('base64')),
    shelter: {
      id: data.shelter.id.toString(),
      name: data.shelter.name,
      address: data.shelter.address,
      phoneNumber: data.shelter.phoneNumber,
      email: data.shelter.email,
      links: data.shelter.links,
    },
  };
}

export function animalListDboToDto(data: AnimalListDbo): AnimalListDto {
  return {
    id: data._id.toString(),
    nickname: data.nickname,
    photos: data.photos.map((elem) => elem.toString('base64')),
    gender: data.gender as Gender,
    species: data.species as Species,
    minBirthDate: data.minBirthDate.toISOString(),
    maxBirthDate: data.maxBirthDate.toISOString(),
    breed: data.breed,
    color: data.color,
    size: data.size as Size,
  };
}

export function animalListRequestDtoToDbo(
  data: AnimalListRequestDto,
): AnimalListRequestDbo {
  const filters: AnimalListFiltersDbo = {};
  if (data.filters?.shelterId) {
    filters.shelterId = new ObjectId(data.filters?.shelterId);
  }

  return {
    offset: data.offset,
    limit: data.limit,
    filters,
  };
}

export function newAnimalDtoToDbo(
  data: NewAnimalDto,
  shelterId: string,
): NewAnimalDbo {
  return {
    nickname: data.nickname,
    gender: data.gender as Gender,
    species: data.species as Species,
    minBirthDate: new Date(data.minBirthDate),
    maxBirthDate: new Date(data.maxBirthDate),
    breed: data.breed,
    color: data.color,
    size: data.size as Size,
    description: data.description,
    photos: data.photos.map((elem) => Binary.createFromBase64(elem)),
    shelterId: new ObjectId(shelterId),
  };
}
