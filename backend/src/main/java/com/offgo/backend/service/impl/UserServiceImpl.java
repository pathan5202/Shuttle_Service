package com.offgo.backend.service.impl;

import com.offgo.backend.dto.response.ApiResponse;
import com.offgo.backend.dto.response.user.UserProfileResponse;
import com.offgo.backend.entity.User;
import com.offgo.backend.exception.ResourceNotFoundException;
import com.offgo.backend.repository.UserRepository;
import com.offgo.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public ApiResponse<UserProfileResponse> getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        UserProfileResponse profile = UserProfileResponse.builder()
                .id(user.getId().toString())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .employeeId(user.getEmployeeId())
                .phoneNumber(user.getPhoneNumber())
                .department(user.getDepartment())
                .role(user.getRole())
                .status(user.getStatus())
                .build();

        return ApiResponse.<UserProfileResponse>builder()
                .success(true)
                .message("Profile fetched successfully")
                .data(profile)
                .build();
    }
}