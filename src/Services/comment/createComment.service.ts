import { AppDataSource } from "../../data-source";
import { Comment } from "../../Entities/comment.entity";
import { Professional } from "../../Entities/professional.entity";
import { User } from "../../Entities/user.entity";
import { AppError } from "../../Error/appError";
import { ICommentRequest } from "../../Interfaces/comment";

export const createCommentService = async ({
  userId, 
  professionalId, 
  content
}: ICommentRequest) => {
  
  const commentRepository = AppDataSource.getRepository(Comment);
  const userRepository = AppDataSource.getRepository(User);
  const professionalRepository = AppDataSource.getRepository(Professional);

  const findUser = await userRepository.findOneBy({id: userId});
  const findProfessional = await professionalRepository.findOneBy({id: professionalId});

  if(!findUser && !findProfessional) {
    throw new AppError(404, 'You need a profile with user/professional');
  };

  if(content.length < 1) {
    throw new AppError(404, 'To do a comment');
  };

  if(findUser) {
    const newComment = commentRepository.create({ 
      user: {id: userId},
      content
    });

    await commentRepository.save(newComment);

    return newComment;
  };
  if(findProfessional) {
    const newComment = commentRepository.create({
      professional: {id: userId},
      content
    });

    await commentRepository.save(newComment);

    return newComment;
  };
};