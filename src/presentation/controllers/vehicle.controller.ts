import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateVehicleUseCase } from '../../application/use-cases/create-vehicle.use-case';
import { FindAllVehiclesUseCase } from '../../application/use-cases/find-all-vehicles.use-case';
import { FindVehicleByIdUseCase } from '../../application/use-cases/find-vehicle-by-id.use-case';
import { UpdateVehicleUseCase } from '../../application/use-cases/update-vehicle.use-case';
import { DeleteVehicleUseCase } from '../../application/use-cases/delete-vehicle.use-case';
import { CreateVehicleDto } from '../../application/dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '../../application/dtos/update-vehicle.dto';
import { VehicleResponseDto } from '../../application/dtos/vehicle-response.dto';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    private readonly findAllVehiclesUseCase: FindAllVehiclesUseCase,
    private readonly findVehicleByIdUseCase: FindVehicleByIdUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo veículo' })
  @ApiResponse({
    status: 201,
    description: 'Veículo criado com sucesso',
    type: VehicleResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'Veículo já existe' })
  async create(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleResponseDto> {
    const vehicle = await this.createVehicleUseCase.execute(createVehicleDto);
    return vehicle.toJSON() as VehicleResponseDto;
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os veículos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de veículos retornada com sucesso',
    type: [VehicleResponseDto],
  })
  async findAll(): Promise<VehicleResponseDto[]> {
    const vehicles = await this.findAllVehiclesUseCase.execute();
    return vehicles.map((vehicle) => vehicle.toJSON() as VehicleResponseDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar veículo por ID' })
  @ApiParam({ name: 'id', description: 'ID do veículo' })
  @ApiResponse({
    status: 200,
    description: 'Veículo encontrado',
    type: VehicleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  async findOne(@Param('id') id: string): Promise<VehicleResponseDto> {
    const vehicle = await this.findVehicleByIdUseCase.execute(id);
    return vehicle.toJSON() as VehicleResponseDto;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar veículo' })
  @ApiParam({ name: 'id', description: 'ID do veículo' })
  @ApiResponse({
    status: 200,
    description: 'Veículo atualizado com sucesso',
    type: VehicleResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  @ApiResponse({ status: 409, description: 'Conflito de dados únicos' })
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleResponseDto> {
    const vehicle = await this.updateVehicleUseCase.execute(
      id,
      updateVehicleDto,
    );
    return vehicle.toJSON() as VehicleResponseDto;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir veículo' })
  @ApiParam({ name: 'id', description: 'ID do veículo' })
  @ApiResponse({ status: 204, description: 'Veículo excluído com sucesso' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.deleteVehicleUseCase.execute(id);
    return { message: 'Vehicle deleted successfully' };
  }
}
