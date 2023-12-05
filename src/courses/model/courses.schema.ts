import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ unique: true, default: uuidv4() })
  id: string;


  @Prop({required:true})
  title: string;

  @Prop({required:true})
  idAuthor: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  cover: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.statics.findAllCourses = function(){
  const list = this.aggregate(
    [
      {
        $lookup:{
          from:'users',
          foreignField:'id',
          localField:'isAuthor',
          as:'author',
          pipeline:[
            {
              $project:{
                _id:0,
                name:1,
                email:1,
                avatar:1
              }
            }
          ]
        }
      },
      {
        $unwind:'$author'
      }
    ]
  )
  return list;
}
