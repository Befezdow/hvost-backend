import { Binary, ObjectId } from 'mongodb';
import { NewAnimalDbo, AnimalDetailsDbo, AnimalListDbo } from './animals.dbo';
import {
  NewAnimalDto,
  AnimalDetailsDto,
  AnimalListDto,
  Gender,
  Species,
  Size,
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
    photo: data.photo.toString('base64'),
    gender: data.gender as Gender,
    minBirthDate: data.minBirthDate.toISOString(),
    maxBirthDate: data.maxBirthDate.toISOString(),
  };
}

export function newAnimalDtoToDbo(data: NewAnimalDto): NewAnimalDbo {
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
    shelterId: new ObjectId(data.shelterId),
  };
}
