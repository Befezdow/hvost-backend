import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiError } from 'src/types';
import {
  AnimalDetailsDto,
  AnimalListRequestDto,
  AnimalListResponseDto,
  NewAnimalDto,
} from './animals.dto';
import { AnimalsService } from './animals.service';
import {
  newAnimalDtoToDbo,
  animalDetailsDboToDto,
  animalListDboToDto,
} from './animals.mapper';

@Controller('animals')
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Post()
  @HttpCode(200)
  async findAll(
    @Body() requestDto: AnimalListRequestDto,
    @Res() response: Response,
  ): Promise<Response<AnimalListResponseDto | ApiError>> {
    let rawResult;
    let totalAmount;
    try {
      const { offset, limit } = requestDto;
      rawResult = await this.animalsService.findAll(offset, limit);
      totalAmount = await this.animalsService.totalAmount();
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }

    const result: AnimalListResponseDto = {
      totalAmount,
      list: rawResult.map((elem) => animalListDboToDto(elem)),
    };

    console.log('findAll :: ', result);

    return response.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response<AnimalDetailsDto | ApiError>> {
    let rawResult;
    try {
      rawResult = await this.animalsService.findById(id);
    } catch (err) {
      console.log(err);

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }

    if (rawResult !== null) {
      const result = animalDetailsDboToDto(rawResult);

      console.log('findOne :: ', result);

      return response.status(HttpStatus.OK).json(result);
    }

    return response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: 'Unknown animal ID',
    });
  }

  @Post()
  @HttpCode(200)
  async createOne(
    @Body() newAnimalDto: NewAnimalDto,
    @Res() response: Response,
  ): Promise<Response<{ id: string } | ApiError>> {
    let id;
    try {
      const newAnimalDbo = newAnimalDtoToDbo(newAnimalDto);
      id = await this.animalsService.create(newAnimalDbo);
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }

    const result = { id };

    console.log('createOne :: ', result);

    return response.status(HttpStatus.OK).json(result);
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteOne(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response<Record<string, never> | ApiError>> {
    let success;
    try {
      success = await this.animalsService.deleteById(id);
    } catch (err) {
      console.log(err);

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }

    if (!success) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: 'Unknown animal ID',
      });
    }

    console.log('deleteOne', id);

    return response.status(HttpStatus.OK).json({});
  }
}
