package com.bagga.springboot.user;

import com.bagga.springboot.config.JwtService;
import com.bagga.springboot.entities.User;
import com.bagga.springboot.entities.UserCarInformation;
import com.bagga.springboot.repositories.UserInformationRepository;
import com.bagga.springboot.repositories.UserRepository;
import com.bagga.springboot.user.dtos.CreateAdminDto;
import com.bagga.springboot.user.dtos.CreateUserDto;
import com.bagga.springboot.user.dtos.CreateUserInformationDto;
import com.bagga.springboot.user.dtos.LoginUserDto;
import com.bagga.springboot.user.responses.CreateAdminResponse;
import com.bagga.springboot.user.responses.CreateUserCarInformationResponse;
import com.bagga.springboot.user.responses.CreateUserResponse;
import com.bagga.springboot.user.responses.LoginUserResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
            UserCarInformation userCarInformation = UserCarInformation.builder()
                    .RegistrationNumber(createUserInformationDto.getRegistrationNumber())
                    .Model(createUserInformationDto.getModel())
                    .Color(createUserInformationDto.getColor())
                    .user(user)
                    .build();
            UserCarInformation savedUserCarInformation = this.userInformationRepository.save(userCarInformation);
            return CreateUserCarInformationResponse.builder()
                    .id(savedUserCarInformation.getId())
                    .RegistrationNumber(savedUserCarInformation.getRegistrationNumber())
                    .Model(savedUserCarInformation.getModel())
                    .Color(savedUserCarInformation.getColor())
                    .user(user)
                    .build();
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
    }
}