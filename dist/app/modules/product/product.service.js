"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const SendImageCloudinary_1 = require("../../util/SendImageCloudinary");
const product_model_1 = require("./product.model");
// ! for creating a product
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createProduct = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const name = (_a = file === null || file === void 0 ? void 0 : file.originalname) === null || _a === void 0 ? void 0 : _a.trim();
    const path = file === null || file === void 0 ? void 0 : file.path;
    const imgUrlResult = yield (0, SendImageCloudinary_1.SendImageCloudinary)(path, name);
    const imgUrl = imgUrlResult === null || imgUrlResult === void 0 ? void 0 : imgUrlResult.secure_url;
    const result = yield product_model_1.productModel.create(Object.assign(Object.assign({}, payload), { productImage: imgUrl }));
    return result;
});
// ! for updating a product
const updateProduct = (payload, file, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const productData = yield product_model_1.productModel.findById(id);
    if (!productData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product not found !!!");
    }
    if (file) {
        const name = (_b = file === null || file === void 0 ? void 0 : file.originalname) === null || _b === void 0 ? void 0 : _b.trim();
        const path = file === null || file === void 0 ? void 0 : file.path;
        const imgUrlResult = yield (0, SendImageCloudinary_1.SendImageCloudinary)(path, name);
        const imgUrl = imgUrlResult === null || imgUrlResult === void 0 ? void 0 : imgUrlResult.secure_url;
        payload.productImage = imgUrl;
    }
    const result = yield product_model_1.productModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// ! for getting all products
const getAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("query from all products = ", query);
    const { limit, page, price, searchTerm, sortBy } = query;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params = {};
    if (price) {
        params.price = { $lte: parseInt(price) };
    }
    if (searchTerm) {
        params.$or = [
            { name: { $regex: new RegExp(searchTerm, "i") } },
            { detail: { $regex: new RegExp(searchTerm, "i") } },
        ];
    }
    const sortValue = sortBy === "asc" ? 1 : -1;
    const limitValue = limit ? parseInt(limit) : 0;
    const pageValue = page ? parseInt(page) : 0;
    const skipValue = limitValue * pageValue;
    const result = yield product_model_1.productModel
        .find(params)
        .limit(limitValue)
        .skip(limitValue && pageValue ? skipValue : 0)
        .sort({ price: sortValue });
    return result;
});
// ! for getting all recent product
const getRecentProducts = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.find({ _id: { $in: payload } });
    return result;
});
// ! for getting specific product
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.findById(id);
    return result;
});
// ! for deleting a product
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
//
exports.productServices = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getRecentProducts,
};
