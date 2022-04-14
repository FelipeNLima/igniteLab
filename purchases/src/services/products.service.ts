import { Injectable } from "@nestjs/common";
import slugify from 'slugify';
import { PrismaService } from "../database/prisma/prisma.service";

interface CreateProductParam {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor (private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  getProductByID(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id
      }
    });
  }

  createProduct({ title }: CreateProductParam) {
    const slug = slugify(title, { lower: true });

    const productWithSameSlug = this.prisma.product.findUnique({
      where: { slug }
    })

    if (productWithSameSlug) {
      throw new  Error('Another product with the same slug already exists');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug
      }
    });
  }
}