package com.karan.messager.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class TokenProvider {
    SecretKey key = Keys.hmacShaKeyFor(JWTConstant.SECRET_KEY.getBytes());
    public String generateToken(Authentication auth) {
        return Jwts.builder().issuer("Karan's code")
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + 86400000))
                .claim("email", auth.getName())
                .signWith(key)
                .compact();

    }
    public String getEmailFromToken(String jwt){
        jwt = jwt.substring(7);
        Claims claim = Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(JWTConstant.SECRET_KEY.getBytes()))
                .build()
                .parseSignedClaims(jwt).getPayload();;
        return String.valueOf(claim.get("email"));
    }
}
