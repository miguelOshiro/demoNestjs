import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpException, HttpStatus, ParseIntPipe, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SlugPipe } from './pipes/slug/slug.pipe';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';
import { Request } from 'express';
import { RolesGuardGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { Rol } from 'src/decorators/rol/rol.decorator';

@ApiTags('courses')
@UseGuards(JwtGuardGuard, RolesGuardGuard)
@Controller('courses') // TODO http://localhost:3000/v1/courses
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}


  @Post()
  @HttpCode(201)
  @Rol(['admin'])
  create(@Req() req:Request, @Body() create: CreateCourseDto){

    return this.coursesService.create(create);
    // const {price} = create;
    // if(price === 999) throw new HttpException( 'El precio demaciado alto', HttpStatus.FORBIDDEN)
  }

  @Get('')
  @HttpCode(200)
  @Rol(['admin', 'user', 'manager'])
  getListCourses() {
    return this.coursesService.findAll()
  }

  @Delete(':id')
  @HttpCode(200)
  @Rol(['admin', 'user', 'manager'])
  deleteCourses(@Param('id') id:string) {
    return this.coursesService.remove(id)
  }



  // @Get(':title')
  // @Rol(['manager', 'admin'])
  // getDetail(@Param('title', new SlugPipe()) title: string)
  // {
  //   return this.coursesService.findOne(1);
  // }














  // @Post()
  // @ApiBearerAuth('')
  // create(@Body() createCourseDto: CreateCourseDto) {
  //   console.log('__CURRENCY__', process.env.CURRENCY)
  //   return this.coursesService.create(createCourseDto);
  // }

  // @Get()
  // findAll() {
  //   return this.coursesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.coursesService.findOne(+id);
  // }

  // @Patch(':id')
  // @ApiBearerAuth('')
  // update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
  //   return this.coursesService.update(+id, updateCourseDto);
  // }

  // @Delete(':id')
  // @ApiBearerAuth('')
  // remove(@Param('id') id: string) {
  //   return this.coursesService.remove(+id);
  // }
}
