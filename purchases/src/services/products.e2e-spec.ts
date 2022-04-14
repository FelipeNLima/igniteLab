import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import slugify from 'slugify';
import request from 'supertest';
import { PrismaService } from '../database/prisma/prisma.service';
import { Product } from '../http/graphql/models/product';
import { ProductsService } from './products.service';

describe('Products', () => {
  let app: INestApplication;
  const prisma = new PrismaService();
  const slug = slugify('Curso de Node.JS', { lower: true });

  beforeAll(async () => {
    await prisma.product.create({
      data: {
        title: 'Product 1',
        slug: slug,
      }
    })

    const moduleRef = await Test.createTestingModule({
      imports: [Product],
      providers: [PrismaService, ProductsService]
    })
      .overrideProvider(ProductsService)
      .useValue(ProductsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET products`, () => {
    return 
  });

  afterAll(async () => {
    const deleteProduct = prisma.product.deleteMany()
  
    await prisma.$transaction([
      deleteProduct
    ])
  
    await prisma.$disconnect()
    await app.close();
  })
});