import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../database/prisma/prisma.service';
import { ProductsResolver } from '../http/graphql/resolvers/products.resolver';
import { ProductsService } from './products.service';

describe('Products', () => {
  let app: INestApplication;
  // const prisma = new PrismaService();
  // const slug = slugify('Curso de Node.JS', { lower: true });

  beforeAll(async () => {
    // await prisma.product.create({
    //   data: {
    //     title: 'Product 1',
    //     slug: slug,
    //   }
    // })

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService, ProductsService, ProductsResolver]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET products`, () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
  });

  afterAll(async () => {
    // const deleteProduct = prisma.product.deleteMany()
  
    // await prisma.$transaction([
    //   deleteProduct
    // ])
  
    // await prisma.$disconnect()
    await app.close();
  })
});