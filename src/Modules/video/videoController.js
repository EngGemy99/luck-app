import { videoModel } from "../../../models/Video.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import cloudinary from "../../utils/cloudinary.js";

export const allVideo = catchError(async (request, response, next) => {
  let apiFeature = new ApiFeature(videoModel.find(), request.query).filter();
  //? execute query
  let videos = await apiFeature.mongooseQuery;
  response.status(200).json({
    videos,
  });
});
export const addVideo = catchError(async (request, response, next) => {
  const { title } = request.body;
  let isFound = await videoModel.findOne({ title });
  if (isFound) return next(ErrorMessage(409, `title already exists`));
  if (!request.file) return next(ErrorMessage(409, `must update video`));
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    request.file.path,
    {
      resource_type: "video",
      folder: "Luke-App/Videos",
    }
  );
  if (!secure_url) return next(ErrorMessage(400, `Video upload failed`));
  request.body.video = { public_id, secure_url };
  let newVideo = await videoModel.create(request.body);
  response.status(200).json({
    message: "Success",
    newVideo,
  });
});

export const updateVideo = catchError(async (request, response, next) => {
  const { title, status } = request.body;

  const { id } = request.params;
  let video = await videoModel.findById(id);
  if (!video) {
    return next(ErrorMessage(404, "video not found"));
  }

  if (title) {
    let isFound = await videoModel.findOne({ title });
    if (isFound) {
      return next(ErrorMessage(409, `video with this name already exists`));
    }
    video.title = title;
  }
  if (status) {
    video.status = status;
  }
  if (request.file) {
    await cloudinary.uploader.destroy(video.image.public_id);
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      request.file.path,
      {
        resource_type: "video",
        folder: "Luke-App/Videos",
      }
    );
    video.video = { public_id, secure_url };
  }
  await video.save();
  response.status(200).json({
    message: "video updated successfully",
    result: video,
  });
});