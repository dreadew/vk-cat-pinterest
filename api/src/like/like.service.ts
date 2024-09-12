import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddLikeDto } from './dto/add-like.dto';
import { FindLikeByUserDto } from './dto/find-like-by-user.dto';
import { RemoveLikeDto } from './dto/remove-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
  ) {}

  async findLikeByUser(findLikeByUserDto: FindLikeByUserDto) {
    const likes = await this.likeRepository.find({
      where: {
        user: {
          id: findLikeByUserDto.userId,
        },
      },
    });

    return likes;
  }

  async AddLike(addLikeDto: AddLikeDto, userId: string) {
    const isAlreadyLiked = await this.likeRepository.findOne({
      where: {
        catId: addLikeDto.catId,
        user: {
          id: userId,
        },
      },
    });

    if (isAlreadyLiked) {
      throw new BadRequestException('Invalid input');
    }

    const like = await this.likeRepository.save({
      catId: addLikeDto.catId,
      url: addLikeDto.url,
      user: {
        id: userId,
      },
    });

    return { like };
  }

  async RemoveLike(removeLikeDto: RemoveLikeDto) {
    const like = await this.likeRepository.findOne({
      where: {
        catId: removeLikeDto.catId,
        user: {
          id: removeLikeDto.userId,
        },
      },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.likeRepository.delete({
      catId: removeLikeDto.catId,
      user: {
        id: removeLikeDto.userId,
      },
    });

    return 'Successful operation';
  }
}
