import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface createStudentParam {
  authUserId: string;
}

@Injectable()
export class StudentsService {
  constructor (private prisma: PrismaService) {}

  listAllStudents() {
    return this.prisma.student.findMany();
  }

  async getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id: id
      }
    });
  }

  getStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: { 
        authUserId
      }
    })
  }

  createStudent({ authUserId }: createStudentParam) {
    return this.prisma.student.create({
      data: {
        authUserId,
      }
    })  
  }
}