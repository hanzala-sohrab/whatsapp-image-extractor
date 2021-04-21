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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var wa_automate_1 = require("@open-wa/wa-automate");
var axios = require("axios");
var mime = require("mime-types");
// const fs = require("fs");
function start(client) {
    var _this = this;
    client.onMessage(function (message) { return __awaiter(_this, void 0, void 0, function () {
        var filename, mediaData, imageBase64, sender;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(message.mimetype && !message.chatId.endsWith("@c.us"))) return [3 /*break*/, 2];
                    filename = message.t + "-" + Math.floor(Math.random() * 1000) + "." + mime.extension(message.mimetype);
                    return [4 /*yield*/, wa_automate_1.decryptMedia(message)];
                case 1:
                    mediaData = _a.sent();
                    imageBase64 = "data:" + message.mimetype + ";base64," + mediaData.toString("base64");
                    sender = {
                        id: message.sender.id,
                        name: message.sender.pushname,
                        group: message.chat.formattedTitle,
                        time: message.timestamp,
                        isPersonal: message.chatId.includes("c.us")
                    };
                    /**
                          await client.sendImage(
                            "972533500951@c.us",
                            imageBase64,
                            filename,
                            `You just received this ${message.type} from *${message.sender.name}* with id ${message.sender.id}, at ${message.timestamp}, in group *${message.chat.formattedTitle}* (id: ${message.chat.id})`
                          );
                    */
                    // Uncomment the below snippet to save the image
                    // fs.writeFile(filename, mediaData, function (err) {
                    //   if (err) {
                    //     return console.log(err);
                    //   }
                    //   console.log("The file was saved!");
                    // });
                    axios
                        .post("http://localhost:8080/api/predict/", {
                        imageURL: imageBase64,
                        sender: sender
                    })
                        .then(function (res) {
                        console.log("statusCode: " + res.statusCode);
                        console.log(res);
                    })["catch"](function (error) {
                        console.error(error);
                    });
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
    client.onGlobalParticipantsChanged(function (participantAdded) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            /**
                await client.sendText(
                  "972533500951@c.us",
                  `who: ${participantAdded.who}\nwhat: ${participantAdded.action}\ngroup: ${participantAdded.chat}`
                );
            */
            axios
                .post("http://127.0.0.1:8080/api/new-user/", {
                who: participantAdded.who,
                action: participantAdded.action,
                group: participantAdded.chat
            })
                .then(function (res) {
                console.log("statusCode: " + res.statusCode);
                console.log(res);
            })["catch"](function (error) {
                console.error(error);
            });
            return [2 /*return*/];
        });
    }); });
}
wa_automate_1.create().then(function (client) { return start(client); });
