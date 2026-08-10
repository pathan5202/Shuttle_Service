package com.offgo.backend.controller.user;

import com.offgo.backend.dto.response.ApiResponse;
import com.offgo.backend.dto.response.user.UserProfileResponse;
import com.offgo.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> profile() {

        return ResponseEntity.ok(
                userService.getMyProfile());

    }

}