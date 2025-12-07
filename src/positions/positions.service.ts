import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // or your DB service
import { Position } from '@prisma/client'; // adjust if using TypeORM or custom model

@Injectable()
export class PositionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Position[]> {
    return this.prisma.position.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: number): Promise<Position | null> {
    return this.prisma.position.findUnique({ where: { id } });
  }

  async create(data: {
    position_code: string;
    position_name: string;
  }): Promise<Position> {
    return this.prisma.position.create({ data });
  }

  async update(
    id: number,
    data: { position_code: string; position_name: string }
  ): Promise<Position | null> {
    const exists = await this.findOne(id);
    if (!exists) return null;

    return this.prisma.position.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Position | null> {
    const exists = await this.findOne(id);
    if (!exists) return null;

    return this.prisma.position.delete({ where: { id } });
  }
}
