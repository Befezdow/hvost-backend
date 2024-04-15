import { NewAnimalDbo, AnimalDetailsDbo, AnimalListDbo } from './animals.dbo';
import { NewAnimalDto, AnimalDetailsDto, AnimalListDto } from './animals.dto';

export function animalDetailsDboToDto(data: AnimalDetailsDbo): AnimalDetailsDto {
  return {
    id: data._id.toString(),
    name: data.name,
    description: data.description,
    questions: data.questions.map((question) => ({
      text: question.text,
      answer: question.answer,
      options: question.options.map((option) => ({
        id: option.id,
        text: option.text,
      })),
    })),
  };
}

export function animalListDboToDto(data: AnimalListDbo): AnimalListDto {
  return {
    id: data._id.toString(),
    name: data.name,
    description: data.description,
  };
}

export function newAnimalDtoToDbo(data: NewAnimalDto): NewAnimalDbo {
  return {
    name: data.name,
    description: data.description,
    questions: data.questions.map((question) => ({
      text: question.text,
      answer: question.answer,
      options: question.options.map((option) => ({
        id: option.id,
        text: option.text,
      })),
    })),
  };
}
