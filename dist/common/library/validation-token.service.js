"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationTokenApp = void 0;
const common_1 = require("@nestjs/common");
const google_auth_library_1 = require("google-auth-library");
let ValidationTokenApp = class ValidationTokenApp {
    constructor() {
        this.googleClientId = '692802393188-pasejq37kukb4me4oo6j2470abol21li.apps.googleusercontent.com';
    }
    async validateTokenGoogle(clientToken) {
        try {
            const client = new google_auth_library_1.OAuth2Client(this.googleClientId);
            const ticket = await client.verifyIdToken({
                idToken: clientToken,
            });
            const payload = ticket.getPayload();
            return payload;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid tokenApp');
        }
    }
};
ValidationTokenApp = __decorate([
    (0, common_1.Injectable)()
], ValidationTokenApp);
exports.ValidationTokenApp = ValidationTokenApp;
//# sourceMappingURL=validation-token.service.js.map