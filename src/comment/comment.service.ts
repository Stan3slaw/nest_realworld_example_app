import { ArticleEntity } from '@app/article/article.entity';
import { UserEntity } from '@app/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { AddCommentDto } from './dto/addComment.dto';
import { CommentResponseInterface } from './types/commentResponse.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  async addComment(
    currentUser: UserEntity,
    slug: string,
    addCommentDto: AddCommentDto,
  ): Promise<CommentEntity> {
    const comment = new CommentEntity();
    Object.assign(comment, addCommentDto);
    const article = await this.articleRepository.findOne({ slug });
    comment.author = currentUser;
    comment.article = article;
    return await this.commentRepository.save(comment);
  }

  async getArticleComments(slug: string): Promise<any> {
    const article = await this.articleRepository.findOne({ slug });
    if (!article) {
      return { comments: [] };
    }

    const queryBuilder = getRepository(CommentEntity)
      .createQueryBuilder('comments')
      .leftJoinAndSelect('comments.author', 'author')
      .where('comments.articleId = :id', { id: article.id });

    const comments = await queryBuilder.getMany();
    return { comments };
  }

  async deleteComment(currentUserId, commentId) {
    const comment = await this.commentRepository.findOne({ id: commentId });
    if (!comment) {
      throw new HttpException('Comment does not exist', HttpStatus.NOT_FOUND);
    }

    if (comment.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }
    return await this.commentRepository.delete({ id: commentId });
  }

  buildCommentResponse(comment: CommentEntity): CommentResponseInterface {
    delete comment.article;
    return { comment };
  }
}
