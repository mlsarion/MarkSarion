import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  async findAll() {
    console.log('GET /positions triggered');
    const positions = await this.positionsService.findAll();
    return positions.map((pos) => ({
      id: pos.id,
      position_code: pos.position_code,
      position_name: pos.position_name,
      created_at: pos.created_at,
      updated_at: pos.updated_at,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(`GET /positions/${id} triggered`);
    const position = await this.positionsService.findOne(+id);
    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }
    return {
      id: position.id,
      position_code: position.position_code,
      position_name: position.position_name,
      created_at: position.created_at,
      updated_at: position.updated_at,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() positionData: { position_code: string; position_name: string }
  ) {
    console.log('POST /positions triggered', positionData);
    const created = await this.positionsService.create(positionData);
    return {
      id: created.id,
      position_code: created.position_code,
      position_name: created.position_name,
      created_at: created.created_at,
      updated_at: created.updated_at,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: { position_code: string; position_name: string }
  ) {
    console.log(`PUT /positions/${id} triggered`, updateData);
    const updated = await this.positionsService.update(+id, updateData);
    if (!updated) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }
    return {
      id: updated.id,
      position_code: updated.position_code,
      position_name: updated.position_name,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    console.log(`DELETE /positions/${id} triggered`);
    const deleted = await this.positionsService.remove(+id);
    if (!deleted) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }
    return {
      id: deleted.id,
      position_code: deleted.position_code,
      position_name: deleted.position_name,
      created_at: deleted.created_at,
      updated_at: deleted.updated_at,
    };
  }
}
