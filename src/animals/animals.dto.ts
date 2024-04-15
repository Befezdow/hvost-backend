export class AnimalDetailsDto {
  id: string;
  name: string;
  description: string;
  questions: Array<{
    text: string;
    options: Array<{
      id: number;
      text: string;
    }>;
    answer: number;
  }>;
}

export class AnimalListDto {
  id: string;
  name: string;
  description: string;
}

export class NewAnimalDto {
  name: string;
  description: string;
  questions: Array<{
    text: string;
    options: Array<{
      id: number;
      text: string;
    }>;
    answer: number;
  }>;
}

export class ApiError {
  status: number;
  message: string;
}
