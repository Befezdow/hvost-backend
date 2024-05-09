import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiError } from 'src/types';
import { SheltersService } from './shelters.service';
import {
  NewShelterDto,
  ShelterDetailsDto,
  ShelterListRequestDto,
  ShelterListResponseDto,
} from './shelters.dto';
import {
  newShelterDtoToDbo,
  shelterDetailsDboToDto,
  shelterListDboToDto,
} from './shelters.mapper';

@Controller('shelters')
export class SheltersController {
  constructor(private sheltersService: SheltersService) {}

  @Post()
  @HttpCode(200)
  async findAll(
    @Body() requestDto: ShelterListRequestDto,
    @Res() response: Response,
  ): Promise<Response<ShelterListResponseDto | ApiError>> {
    let rawResult;
    let totalAmount;
    try {
      const { offset, limit } = requestDto;
      rawResult = await this.sheltersService.findAll(offset, limit);
      totalAmount = await this.sheltersService.totalAmount();
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }

    const result: ShelterListResponseDto = {
      totalAmount,
      list: rawResult.map((elem) => shelterListDboToDto(elem)),
    };

    console.log('findAll :: ', result);

    return response.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response<ShelterDetailsDto | ApiError>> {
    let rawResult;
    try {
      rawResult = await this.sheltersService.findById(id);
    } catch (err) {
      console.log(err);

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }

    if (rawResult !== null) {
      const result = shelterDetailsDboToDto(rawResult);

      console.log('findOne :: ', result);

      return response.status(HttpStatus.OK).json(result);
    }

    return response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: 'Unknown shelter ID',
    });
  }

  @Post()
  @HttpCode(200)
  async createOne(
    @Body() newShelterDto: NewShelterDto,
    @Res() response: Response,
  ): Promise<Response<{ id: string } | ApiError>> {
    let id;
    try {
      const newShelterDbo = newShelterDtoToDbo(newShelterDto);
      id = await this.sheltersService.create(newShelterDbo);
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
}
