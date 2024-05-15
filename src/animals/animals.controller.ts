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
  Req,
  Res,
} from '@nestjs/common';
import { ApiError, AuthorizedRequest } from 'src/types';
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
  animalListRequestDtoToDbo,
} from './animals.mapper';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('animals')
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Public()
  @Post()
  @HttpCode(200)
  async findAll(
    @Body() requestDto: AnimalListRequestDto,
    @Res() response: Response,
  ): Promise<Response<AnimalListResponseDto | ApiError>> {
    let rawResult;
    let totalAmount;
    try {
      const requestDbo = animalListRequestDtoToDbo(requestDto);
      rawResult = await this.animalsService.findAll(requestDbo);
      totalAmount = await this.animalsService.totalAmount(requestDbo.filters);
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

  @Public()
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

  @Post('create')
  @HttpCode(200)
  async createOne(
    @Req() req: AuthorizedRequest,
    @Body() newAnimalDto: NewAnimalDto,
    @Res() response: Response,
  ): Promise<Response<{ id: string } | ApiError>> {
    let id;
    try {
      const shelterId = req.user.id;
      const newAnimalDbo = newAnimalDtoToDbo(newAnimalDto, shelterId);
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
    @Req() req: AuthorizedRequest,
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response<Record<string, never> | ApiError>> {
    let success;
    try {
      const shelterId = req.user.id;
      success = await this.animalsService.deleteById(id, shelterId);
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
