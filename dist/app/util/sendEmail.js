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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const sendEmail = (resetPasswordLink, receiverMail) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: config_1.default.nodemailer_host,
        port: 587,
        secure: false,
        auth: {
            user: "mdmoniruzzamanbillal2@gmail.com",
            pass: "ilmf eeqw agtp mibf",
        },
    });
    const response = yield transporter.sendMail({
        from: config_1.default.nodemailer_sender,
        to: receiverMail,
        subject: "Reset your password within 5 mins!",
        text: "",
        html: resetPasswordLink,
    });
    return response;
});
exports.sendEmail = sendEmail;
