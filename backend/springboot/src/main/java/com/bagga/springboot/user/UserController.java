package com.bagga.springboot.user;

import com.bagga.springboot.user.dtos.CreateAdminDto;
import com.bagga.springboot.user.dtos.CreateUserDto;
import com.bagga.springboot.user.dtos.LoginUserDto;
import com.bagga.springboot.user.responses.CreateAdminResponse;
import com.bagga.springboot.user.responses.CreateUserResponse;
import com.bagga.springboot.user.responses.LoginUserResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService ;
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/createClient")
    public CreateUserResponse createUser(@Valid  @RequestBody CreateUserDto createUserDto) {
        return this.userService.createUserResponse(createUserDto) ;
    }
    @PostMapping("/login")
    public LoginUserResponse loginUser(@Valid  @RequestBody LoginUserDto loginUserDto) {
        return this.userService.loginUser(loginUserDto) ;
    }

    @PostMapping("/createAdmin")
    public CreateAdminResponse createAdmin(@Valid  @RequestBody CreateAdminDto createAdminDto) {
        return this.userService.createAdmin(createAdminDto) ;
    }
}