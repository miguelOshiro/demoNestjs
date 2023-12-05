import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './model/courses.schema';
import { User, UserSchema } from 'src/users/model/user.schema';

//import { SoftDeleteModel }, MongooseDelete from 'mongoose-delete';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Course.name, schema: CourseSchema},
        { name: User.name, schema: UserSchema},

      ]
    ),
    // MongooseModule.forFeatureAsync([
    //   {
    //     name:Course.name,
    //     useFactory: () => {
    //       const schema = CourseSchema
    //       const pluginOption = { overrideMethods: 'all' }
    //       schema.plugin(require('mongoose-delete'), pluginOption)
    //       return schema
    //     }
    //   }
    // ])
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],

})
export class CoursesModule {}
