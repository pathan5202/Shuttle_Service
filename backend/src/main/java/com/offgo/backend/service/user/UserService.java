package com.offgo.backend.service.user;

import com.offgo.backend.dto.response.ApiResponse;
import com.offgo.backend.dto.response.user.UserProfileResponse;

public interface UserService {

    ApiResponse<UserProfileResponse> getMyProfile();

}