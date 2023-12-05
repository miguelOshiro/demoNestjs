import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './model/courses.schema';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';

interface ModelExt<T> extends Model<T> {
  delete:Function;
  findAllCourses:Function
}

@Injectable()
export class CoursesService {

  constructor(@InjectModel(Course.name) private readonly courseModel:ModelExt<CourseDocument>,
  @InjectModel(User.name) private readonly userModel:ModelExt<UserDocument>) {}

  create(createCourseDto: CreateCourseDto) {
    const user = this.userModel.find()
    return this.courseModel.create(createCourseDto);
    //return 'This action adds a new course';
  }

  async findAll() {
    // const list = this.courseModel.find({});
    return this.courseModel.findAllCourses();
    // return list;
    //return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id)
    const resp = this.courseModel.delete({_id});
    return resp;
  }
}
