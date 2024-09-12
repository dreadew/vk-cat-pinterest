import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/user/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { AddLikeDto } from './dto/add-like.dto';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get()
  @Auth()
  async GetLikes(@CurrentUser('id') userId: string) {
    return await this.likeService.findLikeByUser({
      userId: userId,
    });
  }

  @Post()
  @Auth()
  @UsePipes(new ValidationPipe())
  async AddLike(
    @CurrentUser('id') userId: string,
    @Body() addLikeDto: AddLikeDto,
  ) {
    return await this.likeService.AddLike(addLikeDto, userId);
  }

  @Delete('/:cat_id')
  @Auth()
  @UsePipes(new ValidationPipe())
  async RemoveLike(
    @CurrentUser('id') userId: string,
    @Param('cat_id') catId: string,
  ) {
    return await this.likeService.RemoveLike({
      userId: userId,
      catId: catId,
    });
  }
}
