import { Controller, Get, Post, Body, Patch, Param, Delete, Query, 
  UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoggerInterceptor } from 'src/utils/logger/logger.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/logger/media.hadle';
import { CoursesService } from 'src/courses/courses.service';

@ApiTags('videos')
@UseInterceptors(LoggerInterceptor)
@Controller('videos')
// @UsePipes(new ValidationPipe()) 
export class VideosController {
  constructor(private readonly videosService: VideosService, 
              private readonly courseService: CoursesService) {}

  @Post()
  create(@Body() createVideoDto:CreateVideoDto) {
    console.log(createVideoDto)
    return this.videosService.create(createVideoDto);
  }

  @Post('upload')  //TODO [post] http://Localhost:3000/v1/videos/upload 
  @UseInterceptors(FileInterceptor('avatar', { storage:storage })) 
  handleUpload(@UploadedFile() file: Express.Multer.File) 
  {
    console.log(file);
  }

  @Get() // http://localhost:3000/videos?id=1&description=holamundo
  findAll(@Query('id') id:string) {
    //console.log(id);
    return this.videosService.findAll();
  }

  @Get(':id') // http://localhost:3000/videos/video-1
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
