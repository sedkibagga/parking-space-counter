package com.bagga.springboot.user;

import com.bagga.springboot.reservations.responses.GetUserCarInformationResponse;
import com.bagga.springboot.user.dtos.*;
import com.bagga.springboot.user.responses.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService ;
//    @PreAuthorize("hasAuthority('ADMIN')")
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
    @PostMapping("/user/createUserCarInformation")
    public CreateUserCarInformationResponse createUserCarInformation(@RequestBody CreateUserInformationDto createUserInformationDto) {
        return this.userService.createUserCarInformation(createUserInformationDto) ;
    }
    @PatchMapping("/user/updateUserCarInformation/{id}")
    public UpdateUserCarInformationResponse updateUserCarInformation(@RequestBody UpdateUserCarInformationDto updateUserCarInformationDto , @PathVariable Integer id) {
        return this.userService.updateUserCarInformation(updateUserCarInformationDto , id) ;
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/user/deleteUserCarInformation/{id}")
    public DeleteUserCarInformation deleteUserCarInformation(@PathVariable Integer id) {
        return this.userService.deleteUserCarInformation(id) ;
    }

    @GetMapping("/user/getUserCarInformation/{id}")
    public GetUserCarInformationResponse getUserCarInformation(@PathVariable Integer id) {
        return this.userService.getUserCarInformation(id) ;

    }

    @PatchMapping("/user/updateUserPassword")
    public UpdateUserPasswordResponse updateUserPassword(@RequestBody UpdateUserPasswordDto updateUserPasswordDto) {
        return this.userService.updateUserPassword(updateUserPasswordDto) ;
    }

    @PatchMapping("/user/updateUserInformation/{id}")
    public UpdateUserInformationResponse updateUserInformation(@RequestBody UpdateUserInformationDto updateUserInformationDto , @PathVariable Integer id) {
        return this.userService.updateUserInformation(id , updateUserInformationDto) ;
    }

    @GetMapping("/user/getUserInformation/{id}")
    public GetUserInformationResponse getUserInformationResponse(@PathVariable Integer id) {
        return this.userService.getUserInformationResponse(id) ;
    }
}
