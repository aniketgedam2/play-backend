import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"
const userRegister = asyncHandler(async(req,res)=>{

    // Get user details from frontend.
    // Validation - if any field empty or not
    // check if user already exist or not.
    // check for images , check for avatar
    // upload them to cloudinery ,  check if uploaded success of not.
    // create user object - create entry in DB
    // remove password and refresh token field from response
    // check for user creation
    // return response


    const {username, email , fullName, password } = req.body;

    if(
        [username,email ,fullName,password].some((ele)=>(ele?.trim() === ""))
    ){
        throw new ApiError(400,"All fields is required")
    }

    const existedUser = User.findOne({
        $or: [{username},{email}]
    })

    if (existedUser) {
        throw new ApiError(409,"User Already exist")
    }

    const avatarLocalPath = req?.files.avatar[0]?.path;
    const coverImageLocalPath = req?.files.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar image is required");
    }

    const avatar =  uploadOnCloudinary(avatarLocalPath);
    const coverImage = uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        return new ApiError(400,"avatar file is required")
    }
    
    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Somting went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registerd successfully")
    )
})

export {userRegister};