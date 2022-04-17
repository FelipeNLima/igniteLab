import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface getByCourseAndStudentIdParam {
  courseId: string;
  studentId: string;
}

interface createEnrollmentParam {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor (private prisma: PrismaService) {}


  getByCourseAndStudentId({ courseId, studentId }:getByCourseAndStudentIdParam) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null
      }
    });
  }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  listEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  createEnrollment({ studentId, courseId }: createEnrollmentParam) {
    return this.prisma.enrollment.create({
      data: { studentId, courseId },
    });
  }
}