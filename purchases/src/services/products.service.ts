import { Injectable } from "@nestjs/common";
import slugify from 'slugify';
import { PrismaService } from "src/database/prisma/prisma.service";

interface CreateProductParam {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor (private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
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