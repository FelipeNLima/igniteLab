import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface CreateCustomerParam {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor (private prisma: PrismaService) {}

  getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: { 
        authUserId
      }
    })
  }

  createCustomer({ authUserId }: CreateCustomerParam) {
    return this.prisma.customer.create({
      data: {
        authUserId
      }
    });
  }
}