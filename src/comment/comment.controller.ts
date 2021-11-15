import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';
import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto/addComment.dto';
import { CommentResponseInterface } from './types/commentResponse.interface';
import { CommentsResponseInterface } from './types/commentsResponse.interface';

@Controller('articles/:slug/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async addComment(
    @User() currentUser: UserEntity,
    @Param('slug') slug: string,
    @Body('comment') addCommentDto: AddCommentDto,
  ): Promise<CommentResponseInterface> {
    const comment = await this.commentService.addComment(
      currentUser,
      slug,
      addCommentDto,
    );
    return await this.commentService.buildCommentResponse(comment);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getArticleComments(
    @Param('slug') slug: string,
  ): Promise<CommentsResponseInterface> {
    return await this.commentService.getArticleComments(slug);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteComment(
    @User('id') currentUserId: number,
    @Param('id') commentId: number,
  ): Promise<void> {
    await this.commentService.deleteComment(currentUserId, commentId);
  }
}
