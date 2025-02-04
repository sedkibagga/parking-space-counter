package com.bagga.springboot.user;

import com.bagga.springboot.config.JwtService;
import com.bagga.springboot.entities.User;
import com.bagga.springboot.entities.UserCarInformation;
import com.bagga.springboot.repositories.UserInformationRepository;
import com.bagga.springboot.repositories.UserRepository;
import com.bagga.springboot.reservations.responses.GetUserCarInformationResponse;
import com.bagga.springboot.user.dtos.*;
import com.bagga.springboot.user.responses.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserInformationRepository userInformationRepository;

    public CreateUserResponse createUserResponse(CreateUserDto createUserDto) {
        try {
            if (this.userRepository.findByEmail(createUserDto.getEmail()).isPresent()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
            }
            if (this.userRepository.findByCin(createUserDto.getCin()).isPresent()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Cin already exists");
            }
            User user = User.builder()
                    .firstName(createUserDto.getFirstName())
                    .lastName(createUserDto.getLastName())
                    .cin(createUserDto.getCin())
                    .email(createUserDto.getEmail())
                    .password(passwordEncoder.encode(createUserDto.getPassword()))
                    .role("CLIENT")
                    .tel(createUserDto.getTel())
                    .build();
            User savedUser = this.userRepository.save(user);
            return CreateUserResponse.builder()
                    .firstName(savedUser.getFirstName())
                    .lastName(savedUser.getLastName())
                    .Cin(createUserDto.getCin())
                    .email(createUserDto.getEmail())
                    .tel(createUserDto.getTel())
                    .build();
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public LoginUserResponse loginUser(LoginUserDto loginUserDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginUserDto.getEmail(),
                            loginUserDto.getPassword()
                    )
            );

            User user = this.userRepository.findByEmail(loginUserDto.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
            String token = this.jwtService.generateToken(user);
            return LoginUserResponse.builder()
                    .id(user.getId())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .cin(user.getCin())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .tel(user.getTel())
                    .token(token)
                    .build();

        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public CreateAdminResponse createAdmin(CreateAdminDto createAdminDto) {
        try {
            if (this.userRepository.findByEmail(createAdminDto.getEmail()).isPresent()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
            }
            if (this.userRepository.findByCin(createAdminDto.getCin()).isPresent()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Cin already exists");
            }
            User user = User.builder()
                    .firstName(createAdminDto.getFirstName())
                    .lastName(createAdminDto.getLastName())
                    .cin(createAdminDto.getCin())
                    .email(createAdminDto.getEmail())
                    .password(passwordEncoder.encode(createAdminDto.getPassword()))
                    .role("ADMIN")
                    .tel(createAdminDto.getTel())
                    .build();
            User savedUser = this.userRepository.save(user);
            return CreateAdminResponse.builder()
                    .firstName(savedUser.getFirstName())
                    .lastName(savedUser.getLastName())
                    .Cin(savedUser.getCin())
                    .email(savedUser.getEmail())
                    .tel(savedUser.getTel())
                    .build();
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public CreateUserCarInformationResponse createUserCarInformation(CreateUserInformationDto createUserInformationDto) {
        try {
            User user = this.userRepository.findById(createUserInformationDto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
            log.info("user:{}", user);
            UserCarInformation userCarInformation = UserCarInformation.builder()
                    .RegistrationNumber(createUserInformationDto.getRegistrationNumber())
                    .Model(createUserInformationDto.getModel())
                    .Color(createUserInformationDto.getColor())
                    .user(user)
                    .build();
            UserCarInformation savedUserCarInformation = this.userInformationRepository.save(userCarInformation);
            log.info("savedUserCarInformation:{}", savedUserCarInformation);
            return CreateUserCarInformationResponse.builder()
                    .id(savedUserCarInformation.getId())
                    .RegistrationNumber(savedUserCarInformation.getRegistrationNumber())
                    .Model(savedUserCarInformation.getModel())
                    .Color(savedUserCarInformation.getColor())
                    .userId(user.getId())
                    .build();
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public UpdateUserCarInformationResponse updateUserCarInformation(UpdateUserCarInformationDto updateUserCarInformationDto , Integer id) {
        try {
            User user = this.userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            UserCarInformation userCarInformation = this.userInformationRepository.findByUser(user).orElseThrow(() -> new RuntimeException("UserCarInformation not found"));
            if (updateUserCarInformationDto.getRegistrationNumber() != null) {
                userCarInformation.setRegistrationNumber(updateUserCarInformationDto.getRegistrationNumber());
            }
            if (updateUserCarInformationDto.getModel() != null) {
                userCarInformation.setModel(updateUserCarInformationDto.getModel());
            }
            if (updateUserCarInformationDto.getColor() != null) {
                userCarInformation.setColor(updateUserCarInformationDto.getColor());
            }

            if (updateUserCarInformationDto.getImageUri() != null) {
                userCarInformation.setImageUri(updateUserCarInformationDto.getImageUri());
            }
            UserCarInformation savedUserCarInformation = this.userInformationRepository.save(userCarInformation);
            return UpdateUserCarInformationResponse.builder()
                    .id(savedUserCarInformation.getId())
                    .registrationNumber(savedUserCarInformation.getRegistrationNumber())
                    .model(savedUserCarInformation.getModel())
                    .color(savedUserCarInformation.getColor())
                    .userId(user.getId())
                    .imageUri(savedUserCarInformation.getImageUri())
                    .build();

        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }


    }

    public DeleteUserCarInformation deleteUserCarInformation(Integer id){
        try{
            UserCarInformation userCarInformation = this.userInformationRepository.findById(id).orElseThrow(() -> new RuntimeException("UserCarInformation not found"));
            this.userInformationRepository.delete(userCarInformation);
            return DeleteUserCarInformation.builder()
                    .id(userCarInformation.getId())
                    .registrationNumber(userCarInformation.getRegistrationNumber())
                    .model(userCarInformation.getModel())
                    .color(userCarInformation.getColor())
                    .userId(userCarInformation.getUser().getId())
                    .build();
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public GetUserCarInformationResponse getUserCarInformation(Integer userId) {
        try {

            User user = this.userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            UserCarInformation userCarInformation = this.userInformationRepository.findByUser(user).orElseThrow(() -> new RuntimeException("UserCarInformation not found"));
            return GetUserCarInformationResponse.builder()
                    .id(userCarInformation.getId())
                    .registrationNumber(userCarInformation.getRegistrationNumber())
                    .model(userCarInformation.getModel())
                    .color(userCarInformation.getColor())
                    .userId(userCarInformation.getUser().getId())
                    .imageUri(userCarInformation.getImageUri())
                    .build();
       } catch (Exception e) {log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public UpdateUserPasswordResponse updateUserPassword (UpdateUserPasswordDto updateUserPasswordDto) {
       try {

           Authentication authentication  = new UsernamePasswordAuthenticationToken(SecurityContextHolder.getContext().getAuthentication().getName(),updateUserPasswordDto.getOldPassword()) ;
           authenticationManager.authenticate(authentication);
           if (!updateUserPasswordDto.getNewPassword().equals(updateUserPasswordDto.getConfirmPassword())) {
               throw new RuntimeException("New password and confirm password do not match");
           }

           String userName = SecurityContextHolder.getContext().getAuthentication().getName();
           User user = this.userRepository.findByEmail(userName).orElseThrow(()->new RuntimeException("User not found")) ;
           user.setPassword(passwordEncoder.encode(updateUserPasswordDto.getNewPassword()));
           User savedUser = this.userRepository.save(user);
           return UpdateUserPasswordResponse.builder()
                   .firstName(savedUser.getFirstName())
                   .lastName(savedUser.getLastName())
                   .Cin(savedUser.getCin())
                   .email(savedUser.getEmail())
                   .tel(savedUser.getTel())
                   .build();

       } catch(Exception e) {
             log.info(e.getMessage());
             throw new RuntimeException(e);
       }
    }

    public UpdateUserInformationResponse updateUserInformation (Integer userId , UpdateUserInformationDto updateUserInformationDto) {
        try {
            User user = this.userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            log.info("user:{}", user);
            if (updateUserInformationDto.getFirstName()!=null) {
                user.setFirstName(updateUserInformationDto.getFirstName());
            }

            if (updateUserInformationDto.getLastName()!=null) {
                user.setLastName(updateUserInformationDto.getLastName());
            }

            if (updateUserInformationDto.getPhoneNumber()!=null) {
                user.setTel(updateUserInformationDto.getPhoneNumber());
            }

            if (updateUserInformationDto.getEmail()!=null) {
                user.setEmail(updateUserInformationDto.getEmail());
            }

            User savedUser = this.userRepository.save(user);
            log.info("savedUser:{}", savedUser);
            return UpdateUserInformationResponse.builder()
                    .id(savedUser.getId())
                    .firstName(savedUser.getFirstName())
                    .lastName(savedUser.getLastName())
                    .email(savedUser.getEmail())
                    .phoneNumber(savedUser.getTel())
                    .build();
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }


   public GetUserInformationResponse getUserInformationResponse (Integer userId) {
       try {
           User user = this.userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
           return GetUserInformationResponse.builder()
                   .firstName(user.getFirstName())
                   .lastName(user.getLastName())
                   .email(user.getEmail())
                   .phoneNumber(user.getTel())
                   .build();
       } catch (Exception e) {
           log.info(e.getMessage());
           throw new RuntimeException(e);
       }
   }
}
