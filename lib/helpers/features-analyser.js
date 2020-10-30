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
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const core_1 = __importDefault(require("@babel/core"));
const index_1 = __importDefault(require("@financial-times/js-features-analyser/src/index"));
const utils = __importStar(require("./utils"));
function getJsFeature(assetsMap) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!utils.isObject(assetsMap)) {
            return Promise.reject(new Error('bad params ,assetsMap must be webpack assets object'));
        }
        const tempFolder = yield fs_extra_1.default.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'js-features-analyser'));
        const outputDestination = path_1.default.join(tempFolder, 'features.json');
        const actions = Object.values(assetsMap).map(assets => {
            return new Promise((resolve, reject) => {
                try {
                    core_1.default.transformSync(assets.source(), {
                        plugins: [
                            [
                                index_1.default,
                                {
                                    outputDestination,
                                },
                            ],
                        ],
                        ast: false,
                        code: false,
                    });
                    resolve(JSON.parse(fs_extra_1.default.readFileSync(outputDestination, 'utf-8')));
                }
                catch (error) {
                    reject(error.message);
                }
            });
        });
        return Promise.all(actions).then(res => {
            const result = {};
            Object.keys(assetsMap).forEach((file, key) => {
                result[file] = res[key];
            });
            return result;
        });
    });
}
exports.default = getJsFeature;
