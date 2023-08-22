import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import { userModel } from "../../../models/User.js";
import cloudinary from "../../utils/cloudinary.js";
import { requestModel } from "../../../models/Request.js";

export const profile = catchError(async (request, response, next) => {
  let { _id } = request.user;
  let userProfile = await userModel.findById(_id);
  if (!userProfile) {
    return next(ErrorMessage(404, `Not Found`));
  }
  response.status(200).json({
    userProfile,
    status: 200,
  });
});

export const allUser = catchError(async (request, response, next) => {
  let users = await userModel.find({});
  response.status(200).json({
    users,
    status: 200,
  });
});

export const editUserPoint = catchError(async (request, response, next) => {
  let { id } = request.params;
  let user = await userModel.findById(id);
  if (!user) {
    return next(ErrorMessage(404, `Not Found`));
  }
  user.points = user.points + Number(request.body.pointsChange);
  if (user.points < 0) user.points = 0;
  await user.save();
  response.status(200).json({
    message: "edit point successfully",
    user,
    status: 200,
  });
});

export const editStatusUser = catchError(async (request, response, next) => {
  let { id } = request.params;
  let user = await userModel.findByIdAndUpdate(
    id,
    {
      status: request.body.status,
    },
    { new: true }
  );
  if (!user) return next(ErrorMessage(404, `Not Found`));
  response.status(200).json({
    message: "edit status successfully",
    user,
    status: 200,
  });
});

export const deleteUser = catchError(async (request, response, next) => {
  let { id } = request.params;
  let result = await userModel.findByIdAndDelete(id);
  if (!result) {
    return next(ErrorMessage(404, `user Not Found`));
  }
  await requestModel.deleteMany({ user: id });
  response.status(200).json({
    message: "Delete Successfully",
    status: 200,
  });
});

export const updateProfile = catchError(async (request, response, next) => {
  const { userName } = request.body;
  const { _id } = request.user;
  let user = await userModel.findById(_id);
  if (!user) {
    return next(ErrorMessage(404, "admin not found"));
  }
  if (userName) {
    let isFound = await userModel.findOne({ userName });
    if (isFound) {
      return next(ErrorMessage(409, `Admin with this name already exists`));
    }
    user.userName = userName;
  }
  if (request.file) {
    if (user.profilePic.public_id) {
      await cloudinary.uploader.destroy(user.profilePic.public_id);
    }
    let { public_id, secure_url } = await cloudinary.uploader.upload(
      request.file.path,
      {
        folder: "Luke-App/Profile-Images",
      }
    );
    user.profilePic = { public_id, secure_url };
  }
  await user.save();
  response.status(200).json({
    message: "admin profile updated successfully",
    result: user,
    status: 200,
  });
});
