import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { userModel } from "../../../models/User.js";
import cloudinary from "../../utils/cloudinary.js";

export const profile = catchError(async (request, response, next) => {
  let { _id } = request.user;
  let userProfile = await userModel.findById(_id);
  if (!userProfile) {
    return next(ErrorMessage(404, `Not Found`));
  }
  response.status(200).json({
    userProfile,
  });
});

export const editProfilePic = catchError(async (request, response, next) => {
  let { _id } = request.user;

  let user = await userModel.findById(_id);
  if (!user) return next(ErrorMessage(404, `Not Found`));

  if (user.profilePic.public_id != "") {
    await cloudinary.uploader.destroy(user.profilePic.public_id);
  }

  let { public_id, secure_url } = await cloudinary.uploader.upload(
    request.file.path,
    { folder: "Luke-App/Profile-Images" }
  );
  let result = await userModel.findByIdAndUpdate(
    _id,
    {
      profilePic: { public_id, secure_url },
    },
    { new: true }
  );
  response.status(200).json({
    message: "Done",
    result,
  });
});

export const forgotPassword = catchError(async (request, response, next) => {
  const { email } = request.body;
  let isFound = await userModel.findOne({ email });
  if (!isFound) {
    return next(ErrorMessage(404, `user with this email not found`));
  }
  response.status(200).json({
    message: "User exists",
  });
});
export const resetPassword = catchError(async (request, response, next) => {
  const { email, password } = request.body;
  let user = await userModel.findOne({ email });
  user.password = password;
  await user.save();
  response.status(200).json({
    message: "password updated successfully",
    user,
  });
});

export const getUser = catchError(async (request, response, next) => {
  const { id } = request.params;
  let user = await userModel.findById(id);
  if (!user) return next(ErrorMessage(404, `Not Found`));
  response.status(200).json({
    user,
  });
});
