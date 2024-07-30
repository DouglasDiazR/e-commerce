import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Products } from './products.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductsDto } from 'src/dtos/createProducts.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { UpdateProductDto } from 'src/dtos/updateProduct.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(200)
  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    !page ? (page = '1') : page;
    !limit ? (limit = '5') : limit;
    if (page && limit)
      return this.productsService.getProducts(Number(page), Number(limit));
  }

  @Get('seeder')
  @HttpCode(200)
  addProducts() {
    return this.productsService.seederProducts();
  }

  @Get(':id')
  @HttpCode(200)
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(201)
  createProduct(@Body() product: CreateProductsDto) {
    return this.productsService.createProduct(product);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }
}
