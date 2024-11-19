"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
var showtime_entity_1 = require("../showtime/showtime.entity");
var typeorm_1 = require("typeorm");
var Movie = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _duration_decorators;
    var _duration_initializers = [];
    var _duration_extraInitializers = [];
    var _release_date_decorators;
    var _release_date_initializers = [];
    var _release_date_extraInitializers = [];
    var _genre_decorators;
    var _genre_initializers = [];
    var _genre_extraInitializers = [];
    var _rating_decorators;
    var _rating_initializers = [];
    var _rating_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    var _showtime_decorators;
    var _showtime_initializers = [];
    var _showtime_extraInitializers = [];
    var _background_image_url_decorators;
    var _background_image_url_initializers = [];
    var _background_image_url_extraInitializers = [];
    var Movie = _classThis = /** @class */ (function () {
        function Movie_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.title = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.duration = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _duration_initializers, void 0));
            this.release_date = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _release_date_initializers, void 0));
            this.genre = (__runInitializers(this, _release_date_extraInitializers), __runInitializers(this, _genre_initializers, void 0));
            this.rating = (__runInitializers(this, _genre_extraInitializers), __runInitializers(this, _rating_initializers, void 0));
            this.created_at = (__runInitializers(this, _rating_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            this.showtime = (__runInitializers(this, _updated_at_extraInitializers), __runInitializers(this, _showtime_initializers, void 0));
            this.background_image_url = (__runInitializers(this, _showtime_extraInitializers), __runInitializers(this, _background_image_url_initializers, void 0));
            __runInitializers(this, _background_image_url_extraInitializers);
        }
        return Movie_1;
    }());
    __setFunctionName(_classThis, "Movie");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _title_decorators = [(0, typeorm_1.Column)({
                nullable: false,
                length: 100,
            })];
        _description_decorators = [(0, typeorm_1.Column)()];
        _duration_decorators = [(0, typeorm_1.Column)()];
        _release_date_decorators = [(0, typeorm_1.Column)({
                nullable: false,
                type: 'date',
            })];
        _genre_decorators = [(0, typeorm_1.Column)({
                nullable: false,
                length: 50,
            })];
        _rating_decorators = [(0, typeorm_1.Column)({
                nullable: false,
                default: 0,
            })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)({
                nullable: false,
                type: 'datetime',
            })];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)({
                nullable: false,
                type: 'datetime',
            })];
        _showtime_decorators = [(0, typeorm_1.OneToMany)(function () { return showtime_entity_1.Showtime; }, function (Showtime) { return Showtime.movie; })];
        _background_image_url_decorators = [(0, typeorm_1.Column)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: function (obj) { return "duration" in obj; }, get: function (obj) { return obj.duration; }, set: function (obj, value) { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
        __esDecorate(null, null, _release_date_decorators, { kind: "field", name: "release_date", static: false, private: false, access: { has: function (obj) { return "release_date" in obj; }, get: function (obj) { return obj.release_date; }, set: function (obj, value) { obj.release_date = value; } }, metadata: _metadata }, _release_date_initializers, _release_date_extraInitializers);
        __esDecorate(null, null, _genre_decorators, { kind: "field", name: "genre", static: false, private: false, access: { has: function (obj) { return "genre" in obj; }, get: function (obj) { return obj.genre; }, set: function (obj, value) { obj.genre = value; } }, metadata: _metadata }, _genre_initializers, _genre_extraInitializers);
        __esDecorate(null, null, _rating_decorators, { kind: "field", name: "rating", static: false, private: false, access: { has: function (obj) { return "rating" in obj; }, get: function (obj) { return obj.rating; }, set: function (obj, value) { obj.rating = value; } }, metadata: _metadata }, _rating_initializers, _rating_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, null, _showtime_decorators, { kind: "field", name: "showtime", static: false, private: false, access: { has: function (obj) { return "showtime" in obj; }, get: function (obj) { return obj.showtime; }, set: function (obj, value) { obj.showtime = value; } }, metadata: _metadata }, _showtime_initializers, _showtime_extraInitializers);
        __esDecorate(null, null, _background_image_url_decorators, { kind: "field", name: "background_image_url", static: false, private: false, access: { has: function (obj) { return "background_image_url" in obj; }, get: function (obj) { return obj.background_image_url; }, set: function (obj, value) { obj.background_image_url = value; } }, metadata: _metadata }, _background_image_url_initializers, _background_image_url_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Movie = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Movie = _classThis;
}();
exports.Movie = Movie;
