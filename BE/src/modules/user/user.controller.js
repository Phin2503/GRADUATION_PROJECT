"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var auth_guard_1 = require("../guards/auth.guard");
var role_guard_1 = require("../guards/role.guard");
var UserController = function () {
    var _classDecorators = [(0, common_1.Controller)('/api/v1/user'), (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _register_decorators;
    var _login_decorators;
    var _findAll_decorators;
    var _getCurrentUser_decorators;
    var _updateById_decorators;
    var UserController = _classThis = /** @class */ (function () {
        function UserController_1(userService, authService) {
            this.userService = (__runInitializers(this, _instanceExtraInitializers), userService);
            this.authService = authService;
        }
        UserController_1.prototype.register = function (requestBody) {
            return this.authService.register(requestBody);
        };
        UserController_1.prototype.login = function (requestBody) {
            return this.authService.login(requestBody);
        };
        UserController_1.prototype.findAll = function (pagination) {
            return this.userService.findAll(pagination);
        };
        UserController_1.prototype.getCurrentUser = function (currentUser) {
            console.log(currentUser);
            console.log('he');
            return currentUser;
        };
        UserController_1.prototype.updateById = function (requestBody, id, currentUser) {
            return this.userService.updateById(id, requestBody, currentUser);
        };
        return UserController_1;
    }());
    __setFunctionName(_classThis, "UserController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _register_decorators = [(0, common_1.Post)('/register')];
        _login_decorators = [(0, common_1.Post)('/login')];
        _findAll_decorators = [(0, common_1.Get)(), (0, common_1.UseGuards)(new role_guard_1.RoleGuard(['user'])), (0, common_1.UseGuards)(auth_guard_1.AuthGuard)];
        _getCurrentUser_decorators = [(0, common_1.Get)('current-user'), (0, common_1.UseGuards)(auth_guard_1.AuthGuard)];
        _updateById_decorators = [(0, common_1.Put)('update/:id'), (0, common_1.UseGuards)(auth_guard_1.AuthGuard)];
        __esDecorate(_classThis, null, _register_decorators, { kind: "method", name: "register", static: false, private: false, access: { has: function (obj) { return "register" in obj; }, get: function (obj) { return obj.register; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: function (obj) { return "login" in obj; }, get: function (obj) { return obj.login; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCurrentUser_decorators, { kind: "method", name: "getCurrentUser", static: false, private: false, access: { has: function (obj) { return "getCurrentUser" in obj; }, get: function (obj) { return obj.getCurrentUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateById_decorators, { kind: "method", name: "updateById", static: false, private: false, access: { has: function (obj) { return "updateById" in obj; }, get: function (obj) { return obj.updateById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserController = _classThis;
}();
exports.UserController = UserController;
