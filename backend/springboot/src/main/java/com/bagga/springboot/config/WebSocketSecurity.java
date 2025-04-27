package com.bagga.springboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.messaging.access.intercept.MessageMatcherDelegatingAuthorizationManager;
import org.springframework.security.messaging.context.SecurityContextChannelInterceptor;

@Configuration
@EnableWebSocketSecurity
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class WebSocketSecurity {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public WebSocketSecurity(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    AuthorizationManager<Message<?>> messageAuthorizationManager(MessageMatcherDelegatingAuthorizationManager.Builder messages) {
        return messages
                .simpTypeMatchers(SimpMessageType.CONNECT, SimpMessageType.HEARTBEAT).permitAll()
                .simpDestMatchers("/topic/public/**", "/queue/public/**").permitAll()
                .simpSubscribeDestMatchers("/topic/public/**", "/queue/public/**").permitAll()
                .simpDestMatchers("/app/**").authenticated()
                .simpSubscribeDestMatchers("/user/**", "/topic/private/**", "/queue/private/**").authenticated()
                .anyMessage().denyAll()
                .build();
    }

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE + 100)
    public ChannelInterceptor jwtChannelInterceptor() {
        return new JwtChannelInterceptor(jwtService, userDetailsService);
    }

//    @Bean
//    public ChannelRegistration configureClientInboundChannel(ChannelRegistration registration) {
//        registration.interceptors(
//                jwtChannelInterceptor(),
//                new SecurityContextChannelInterceptor()
//        );
//        return registration;
//    }
}