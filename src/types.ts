import { Request } from 'express';
import { ShelterDetailsDto } from 'src/shelters/shelters.dto';

export interface ApiError {
  status: number;
  message: string;
}

export interface AuthorizedRequest extends Request {
  user: ShelterDetailsDto;
}
