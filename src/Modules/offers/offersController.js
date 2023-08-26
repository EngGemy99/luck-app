import { offersModel } from "../../../models/Offers.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import { ErrorMessage } from "../../utils/ErrorMessage.js";
import { catchError } from "../../utils/catchAsyncError.js";
import cloudinary from "../../utils/cloudinary.js";

export const topOffers = catchError(async (request, response, next) => {
  let apiFeature = new ApiFeature(
    offersModel.find({ offerType: "topOffer" }),
    request.query
  ).filter();
  //? execute query
  let result = await apiFeature.mongooseQuery;
  response.status(200).json({
    result,
    status: 200,
  });
});
export const offersWall = catchError(async (request, response, next) => {
  let apiFeature = new ApiFeature(
    offersModel.find({ offerType: "offersWall" }),
    request.query
  ).filter();
  //? execute query
  let result = await apiFeature.mongooseQuery;
  response.status(200).json({
    result,
    status: 200,
  });
});

export const addTopOffers = catchError(async (request, response, next) => {
  const { title } = request.body;
  let isFound = await offersModel.findOne({ title });
  if (isFound) return next(ErrorMessage(409, `it is already exists`));

  if (!request.file) return next(ErrorMessage(400, `image is required`));
  let { public_id, secure_url } = await cloudinary.uploader.upload(
    request.file.path,
    { folder: "Luke-App/Top-Offers" }
  );
  request.body.image = { public_id, secure_url };
  let newTopOffer = await offersModel.create(request.body);
  response.status(201).json({
    message: "added successfully",
    newTopOffer,
    status: 201,
  });
});

export const addOffersWall = catchError(async (request, response, next) => {
  const { title } = request.body;
  let isFound = await offersModel.findOne({ title });
  if (isFound) return next(ErrorMessage(409, `it is already exists`));

  if (!request.file) return next(ErrorMessage(400, `image is required`));

  let { public_id, secure_url } = await cloudinary.uploader.upload(
    request.file.path,
    { folder: "Luke-App/Offers-Wall" }
  );
  request.body.image = { public_id, secure_url };
  let newOfferWall = await offersModel.create(request.body);

  response.status(201).json({
    message: "added successfully",
    newOfferWall,
    status: 201,
  });
});

export const updateTopOffers = catchError(async (request, response, next) => {
  const { title, description, url, status } = request.body;
  const { id } = request.params;
  let topOffer = await offersModel.findById(id);
  if (!topOffer) {
    return next(ErrorMessage(404, "Payment way not found"));
  }
  if (title) {
    let isFound = await offersModel.findOne({ title });
    if (isFound) {
      return next(ErrorMessage(409, `title with this name already exists`));
    }
  }
  if (request.file) {
    await cloudinary.uploader.destroy(topOffer.image.public_id);
    let { public_id, secure_url } = await cloudinary.uploader.upload(
      request.file.path,
      { folder: "Luke-App/Top-Offers" }
    );

    topOffer.image = { public_id, secure_url };
  }
  if (title) topOffer.title = title;
  if (description) topOffer.description = description;
  if (url) topOffer.url = url;
  if (status) topOffer.status = status;

  await topOffer.save();
  response.status(200).json({
    message: "top offer updated successfully",
    result: topOffer,
    status: 200,
  });
});

export const updateOffersWall = catchError(async (request, response, next) => {
  const { title, description, url, status } = request.body;
  const { id } = request.params;
  let offerWall = await offersModel.findById(id);
  if (!offerWall) {
    return next(ErrorMessage(404, "Offer wall not found"));
  }
  if (title) {
    let isFound = await offersModel.findOne({ title });
    if (isFound) {
      return next(
        ErrorMessage(409, `Offer wall with this title already exists`)
      );
    }
  }
  if (request.file) {
    await cloudinary.uploader.destroy(offerWall.image.public_id);
    let { public_id, secure_url } = await cloudinary.uploader.upload(
      request.file.path,
      { folder: "Luke-App/Offers-Wall" }
    );
    offerWall.image = { public_id, secure_url };
  }
  if (title) offerWall.title = title;
  if (description) offerWall.description = description;
  if (url) offerWall.url = url;
  if (status) offerWall.status = status;
  await offerWall.save();
  response.status(200).json({
    message: "Offer wall updated successfully",
    result: offerWall,
    status: 200,
  });
});
