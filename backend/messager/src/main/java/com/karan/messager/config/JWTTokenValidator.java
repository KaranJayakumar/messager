package com.karan.messager.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

public class JWTTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws BadCredentialsException, ServletException, IOException {
        System.out.println("Reached filter");
       String jwt = request.getHeader("Authorization");
       if(jwt != null){
           try{
               System.out.println("Reached filter");
               //Bearer token
               jwt = jwt.substring(7);
               SecretKey key = Keys.hmacShaKeyFor(JWTConstant.SECRET_KEY.getBytes());
               Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload();
               String username = String.valueOf(claims.get("username"));
               String authorities = String.valueOf(claims.get("authorities"));
               List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
               Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, auths);
               SecurityContextHolder.getContext().setAuthentication(authentication);
           }catch(Exception e){
               throw new BadCredentialsException("Invalid token received");
           }
       }
       filterChain.doFilter(request, response);
    }

}
