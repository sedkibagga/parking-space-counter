package com.bagga.springboot.comments;

import com.bagga.springboot.comments.dto.CreateCommentDto;
import com.bagga.springboot.comments.dto.UpdateCommentDto;
import com.bagga.springboot.comments.response.*;
import com.bagga.springboot.entities.CommentsOfUser;
import com.bagga.springboot.entities.User;
import com.bagga.springboot.entities.UserCarInformation;
import com.bagga.springboot.repositories.CommentsRepository;
import com.bagga.springboot.repositories.UserInformationRepository;
import com.bagga.springboot.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentsServices {
       private final UserRepository userRepository ;
       private final CommentsRepository commentsRepository;
       private final UserInformationRepository userInformationRepository;
    public CreateCommentResponse createComment(CreateCommentDto createCommentDto) {
        try {
            User user = this.userRepository.findById(createCommentDto.getUserId()).orElseThrow(()->new RuntimeException("User not found"));
            log.info("user:{}", user);
            CommentsOfUser comments = CommentsOfUser.builder()
                    .comment(createCommentDto.getComment())
                    .user(user)
                    .build();
            CommentsOfUser savedComments = this.commentsRepository.save(comments);
            return CreateCommentResponse.builder()
                    .id(savedComments.getId())
                    .comment(savedComments.getComment())
                    .userId(savedComments.getUser().getId())
                    .date(savedComments.getDate())
                    .build();
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public List<GetAllCommentsResponse> getAllComments() {
        try {
            List<CommentsOfUser> comments = this.commentsRepository.findAll();
            return comments.stream()
                    .map(commentsOfUser -> {
                        Optional<UserCarInformation> userCarInformation = this.userInformationRepository.findByUser(commentsOfUser.getUser());
                        return GetAllCommentsResponse.builder()
                                .id(commentsOfUser.getId())
                                .comment(commentsOfUser.getComment())
                                .date(commentsOfUser.getDate())
                                .firstName(userCarInformation.map(uc -> uc.getUser().getFirstName()).orElse("Unknown"))
                                .lastName(userCarInformation.map(uc -> uc.getUser().getLastName()).orElse("Unknown"))
                                .imageUri(userCarInformation.map(UserCarInformation::getImageUri).orElse(""))
                                .build();
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public DeleteCommentResponse deleteComment(Integer commentId) {
        try {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//          System.out.println("Authentication Object: " + authentication);
//          System.out.println("Principal: " + authentication.getPrincipal());
//         System.out.println("Name: " + authentication.getName());
            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = this.userRepository.findByEmail(userName).orElseThrow(()->new RuntimeException("User not found"));

            CommentsOfUser commentsOfUser = this.commentsRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
            if (!user.getCommentsOfUsers().contains(commentsOfUser)) {
                throw new RuntimeException("You do not have permission to delete this comment");
            }
            user.getCommentsOfUsers().remove(commentsOfUser);
            this.userRepository.save(user);
            this.commentsRepository.delete(commentsOfUser);
            return DeleteCommentResponse.builder()
                    .id(commentsOfUser.getId())
                    .comment(commentsOfUser.getComment())
                    .build();
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public List<GetCommentContainingUserFirstNameAndLastName> getCommentContainingUserFirstNameAndLastNames(String firstName, String lastName) {
        try {

            List<CommentsOfUser> comments = this.commentsRepository.findByUser_FirstNameContainingAndUser_LastNameContaining(firstName, lastName);
            return comments.stream()
                    .map(commentsOfUser -> {
                        UserCarInformation userCarInformation = this.userInformationRepository.findByUser(commentsOfUser.getUser()).orElseThrow(() -> new RuntimeException("UserCarInformation not found"));
                         return GetCommentContainingUserFirstNameAndLastName.builder()
                                 .id(commentsOfUser.getId())
                                 .comment(commentsOfUser.getComment())
                                 .date(commentsOfUser.getDate())
                                 .firstName(commentsOfUser.getUser().getFirstName())
                                 .lastName(commentsOfUser.getUser().getLastName())
                                 .imageUri(userCarInformation.getImageUri())
                                 .build();
                    })
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public UpdateCommentResponse updateComment(UpdateCommentDto updateCommentDto,Integer commentId) {
        try {
            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = this.userRepository.findByEmail(userName).orElseThrow(()->new RuntimeException("User not found"));
            CommentsOfUser commentsOfUser = this.commentsRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
            if (!user.getCommentsOfUsers().contains(commentsOfUser)) {
                throw new RuntimeException("You do not have permission to update this comment");
            }
            commentsOfUser.setComment(updateCommentDto.getComment());
            CommentsOfUser savedComments = this.commentsRepository.save(commentsOfUser);
            return UpdateCommentResponse.builder()
                    .id(savedComments.getId())
                    .comment(savedComments.getComment())
                    .build();
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }

    }
}
