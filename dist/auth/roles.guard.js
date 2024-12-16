"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_constants_1 = require("./auth.constants");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const roles = this.reflector.get('roles', context.getHandler());
        const masterAdmin = roles === null || roles === void 0 ? void 0 : roles.find((val) => val === auth_constants_1.dataConstants.master_admin);
        const admin = roles === null || roles === void 0 ? void 0 : roles.find((val) => val === auth_constants_1.dataConstants.admin);
        const userRole = roles === null || roles === void 0 ? void 0 : roles.find((val) => val === auth_constants_1.dataConstants.user);
        const ustadz = roles === null || roles === void 0 ? void 0 : roles.find((val) => val === auth_constants_1.dataConstants.ustadz);
        if (masterAdmin && (user === null || user === void 0 ? void 0 : user.type_user) === auth_constants_1.dataConstants.master_admin) {
            return true;
        }
        if (admin && (user === null || user === void 0 ? void 0 : user.type_user) === auth_constants_1.dataConstants.admin) {
            return true;
        }
        if (userRole && (user === null || user === void 0 ? void 0 : user.type_user) === auth_constants_1.dataConstants.user) {
            return true;
        }
        if (ustadz && (user === null || user === void 0 ? void 0 : user.type_user) === auth_constants_1.dataConstants.ustadz) {
            return true;
        }
        throw new common_1.BadGatewayException('Not Have Access');
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map