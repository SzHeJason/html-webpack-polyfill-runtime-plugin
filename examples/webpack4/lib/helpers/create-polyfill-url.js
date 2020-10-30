"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const browserslist_1 = __importDefault(require("browserslist"));
const index_1 = __importDefault(require("create-polyfill-service-url/src/index"));
const utils = __importStar(require("./utils"));
const features_analyser_1 = __importDefault(require("./features-analyser"));
function getPolyfillUrl(assetsMap, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { url, browserslist: browserslistConfig } = options;
        const browsers = browserslist_1.default(browserslistConfig, {
            path: process.cwd(),
        });
        const featureMap = yield features_analyser_1.default(assetsMap);
        const featureList = Object.values(featureMap).reduce((carry, item) => [...carry, ...item], []);
        const uniqueFeatureList = utils.unique(featureList);
        const result = yield index_1.default(uniqueFeatureList, browsers);
        if (result.type === index_1.default.TYPE_URL &&
            utils.isFunction(url)) {
            result.message = url(uniqueFeatureList, featureMap) || result.message;
        }
        return result.message;
    });
}
exports.default = getPolyfillUrl;
