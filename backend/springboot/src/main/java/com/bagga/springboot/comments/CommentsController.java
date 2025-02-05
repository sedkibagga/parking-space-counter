package com.bagga.springboot.comments;

import com.bagga.springboot.comments.dto.CreateCommentDto;
import com.bagga.springboot.comments.dto.UpdateCommentDto;
import com.bagga.springboot.comments.response.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
@Slf4j
public class CommentsController {
    private final CommentsServices commentsServices;
    @PostMapping("/createComment")
    public CreateCommentResponse createComment(@RequestBody CreateCommentDto createCommentDto) {
        return this.commentsServices.createComment(createCommentDto);
    }

    @GetMapping("/getAllComments")
    public List<GetAllCommentsResponse> getAllComments() {
        return this.commentsServices.getAllComments();
    }

    @DeleteMapping("/deleteComment/{id}")
    public DeleteCommentResponse deleteComment(@PathVariable Integer id) {
        return this.commentsServices.deleteComment(id) ;
    }

    @GetMapping("/getCommentContainingUserFirstNameAndLastNames/{firstName}/{lastName}")
    public List<GetCommentContainingUserFirstNameAndLastName> getCommentContainingUserFirstNameAndLastNames(@PathVariable String firstName, @PathVariable String lastName) {
        return this.commentsServices.getCommentContainingUserFirstNameAndLastNames(firstName, lastName) ;
    }

    @PatchMapping("/updateComment/{id}")
    public UpdateCommentResponse updateComment(@RequestBody UpdateCommentDto updateCommentDto , @PathVariable Integer id) {
        return this.commentsServices.updateComment(updateCommentDto , id) ;
    }

}
