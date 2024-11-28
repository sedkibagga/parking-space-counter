package com.bagga.springboot.user;

import com.bagga.springboot.config.JwtService;
import com.bagga.springboot.entities.User;
import com.bagga.springboot.repositories.UserRepository;
import com.bagga.springboot.user.dtos.CreateUserDto;
import com.bagga.springboot.user.dtos.LoginUserDto;
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
    private final UserRepository userRepository ;
    private final PasswordEncoder passwordEncoder ;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService ;

    public CreateUserResponse createUserResponse (CreateUserDto createUserDto) {
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
            User savedUser = this.userRepository.save(user) ;
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
}
