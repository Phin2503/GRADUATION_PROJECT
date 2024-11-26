'use strict';
var __esDecorate =
  (this && this.__esDecorate) ||
  function (
    ctor,
    descriptorIn,
    decorators,
    contextIn,
    initializers,
    extraInitializers,
  ) {
    function accept(f) {
      if (f !== void 0 && typeof f !== 'function')
        throw new TypeError('Function expected');
      return f;
    }
    var kind = contextIn.kind,
      key = kind === 'getter' ? 'get' : kind === 'setter' ? 'set' : 'value';
    var target =
      !descriptorIn && ctor
        ? contextIn['static']
          ? ctor
          : ctor.prototype
        : null;
    var descriptor =
      descriptorIn ||
      (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _,
      done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === 'access' ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) {
        if (done)
          throw new TypeError(
            'Cannot add initializers after decoration has completed',
          );
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(
        kind === 'accessor'
          ? { get: descriptor.get, set: descriptor.set }
          : descriptor[key],
        context,
      );
      if (kind === 'accessor') {
        if (result === void 0) continue;
        if (result === null || typeof result !== 'object')
          throw new TypeError('Object expected');
        if ((_ = accept(result.get))) descriptor.get = _;
        if ((_ = accept(result.set))) descriptor.set = _;
        if ((_ = accept(result.init))) initializers.unshift(_);
      } else if ((_ = accept(result))) {
        if (kind === 'field') initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  };
var __runInitializers =
  (this && this.__runInitializers) ||
  function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue
        ? initializers[i].call(thisArg, value)
        : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  };
var __setFunctionName =
  (this && this.__setFunctionName) ||
  function (f, name, prefix) {
    if (typeof name === 'symbol')
      name = name.description ? '['.concat(name.description, ']') : '';
    return Object.defineProperty(f, 'name', {
      configurable: true,
      value: prefix ? ''.concat(prefix, ' ', name) : name,
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.User = void 0;
var class_transformer_1 = require('class-transformer');
var class_validator_1 = require('class-validator');
var roles_1 = require('../roles/roles');
var typeorm_1 = require('typeorm');
var User = (function () {
  var _classDecorators = [(0, typeorm_1.Entity)()];
  var _classDescriptor;
  var _classExtraInitializers = [];
  var _classThis;
  var _id_decorators;
  var _id_initializers = [];
  var _id_extraInitializers = [];
  var _username_decorators;
  var _username_initializers = [];
  var _username_extraInitializers = [];
  var _password_decorators;
  var _password_initializers = [];
  var _password_extraInitializers = [];
  var _fullName_decorators;
  var _fullName_initializers = [];
  var _fullName_extraInitializers = [];
  var _email_decorators;
  var _email_initializers = [];
  var _email_extraInitializers = [];
  var _dateOfBirth_decorators;
  var _dateOfBirth_initializers = [];
  var _dateOfBirth_extraInitializers = [];
  var _phoneNumber_decorators;
  var _phoneNumber_initializers = [];
  var _phoneNumber_extraInitializers = [];
  var _createAt_decorators;
  var _createAt_initializers = [];
  var _createAt_extraInitializers = [];
  var _updateAt_decorators;
  var _updateAt_initializers = [];
  var _updateAt_extraInitializers = [];
  var _role_decorators;
  var _role_initializers = [];
  var _role_extraInitializers = [];
  var User = (_classThis = /** @class */ (function () {
    function User_1() {
      this.id = __runInitializers(this, _id_initializers, void 0);
      this.username =
        (__runInitializers(this, _id_extraInitializers),
        __runInitializers(this, _username_initializers, void 0));
      this.password =
        (__runInitializers(this, _username_extraInitializers),
        __runInitializers(this, _password_initializers, void 0));
      this.fullName =
        (__runInitializers(this, _password_extraInitializers),
        __runInitializers(this, _fullName_initializers, void 0));
      this.email =
        (__runInitializers(this, _fullName_extraInitializers),
        __runInitializers(this, _email_initializers, void 0));
      this.dateOfBirth =
        (__runInitializers(this, _email_extraInitializers),
        __runInitializers(this, _dateOfBirth_initializers, void 0));
      this.phoneNumber =
        (__runInitializers(this, _dateOfBirth_extraInitializers),
        __runInitializers(this, _phoneNumber_initializers, void 0));
      this.createAt =
        (__runInitializers(this, _phoneNumber_extraInitializers),
        __runInitializers(this, _createAt_initializers, void 0));
      this.updateAt =
        (__runInitializers(this, _createAt_extraInitializers),
        __runInitializers(this, _updateAt_initializers, void 0));
      this.role =
        (__runInitializers(this, _updateAt_extraInitializers),
        __runInitializers(this, _role_initializers, void 0));
      __runInitializers(this, _role_extraInitializers);
    }
    return User_1;
  })());
  __setFunctionName(_classThis, 'User');
  (function () {
    var _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
    _username_decorators = [
      (0, typeorm_1.Column)({
        length: 30,
        unique: true,
      }),
    ];
    _password_decorators = [
      (0, typeorm_1.Column)({
        length: 155,
        update: true,
      }),
      (0, class_transformer_1.Exclude)(),
    ];
    _fullName_decorators = [
      (0, typeorm_1.Column)({
        length: 30,
      }),
    ];
    _email_decorators = [
      (0, typeorm_1.Column)({
        length: 50,
        unique: true,
      }),
    ];
    _dateOfBirth_decorators = [
      (0, typeorm_1.Column)({ type: Date }),
      (0, class_validator_1.IsDate)(),
    ];
    _phoneNumber_decorators = [
      (0, typeorm_1.Column)({
        length: 20,
        unique: true,
      }),
    ];
    _createAt_decorators = [
      (0, typeorm_1.Column)({
        update: false,
      }),
    ];
    _updateAt_decorators = [
      (0, typeorm_1.Column)(),
      (0, class_validator_1.IsOptional)(),
      (0, typeorm_1.UpdateDateColumn)(),
    ];
    _role_decorators = [(0, typeorm_1.Column)({ default: roles_1.ROLES.USER })];
    __esDecorate(
      null,
      null,
      _id_decorators,
      {
        kind: 'field',
        name: 'id',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'id' in obj;
          },
          get: function (obj) {
            return obj.id;
          },
          set: function (obj, value) {
            obj.id = value;
          },
        },
        metadata: _metadata,
      },
      _id_initializers,
      _id_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _username_decorators,
      {
        kind: 'field',
        name: 'username',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'username' in obj;
          },
          get: function (obj) {
            return obj.username;
          },
          set: function (obj, value) {
            obj.username = value;
          },
        },
        metadata: _metadata,
      },
      _username_initializers,
      _username_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _password_decorators,
      {
        kind: 'field',
        name: 'password',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'password' in obj;
          },
          get: function (obj) {
            return obj.password;
          },
          set: function (obj, value) {
            obj.password = value;
          },
        },
        metadata: _metadata,
      },
      _password_initializers,
      _password_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _fullName_decorators,
      {
        kind: 'field',
        name: 'fullName',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'fullName' in obj;
          },
          get: function (obj) {
            return obj.fullName;
          },
          set: function (obj, value) {
            obj.fullName = value;
          },
        },
        metadata: _metadata,
      },
      _fullName_initializers,
      _fullName_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _email_decorators,
      {
        kind: 'field',
        name: 'email',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'email' in obj;
          },
          get: function (obj) {
            return obj.email;
          },
          set: function (obj, value) {
            obj.email = value;
          },
        },
        metadata: _metadata,
      },
      _email_initializers,
      _email_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _dateOfBirth_decorators,
      {
        kind: 'field',
        name: 'dateOfBirth',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'dateOfBirth' in obj;
          },
          get: function (obj) {
            return obj.dateOfBirth;
          },
          set: function (obj, value) {
            obj.dateOfBirth = value;
          },
        },
        metadata: _metadata,
      },
      _dateOfBirth_initializers,
      _dateOfBirth_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _phoneNumber_decorators,
      {
        kind: 'field',
        name: 'phoneNumber',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'phoneNumber' in obj;
          },
          get: function (obj) {
            return obj.phoneNumber;
          },
          set: function (obj, value) {
            obj.phoneNumber = value;
          },
        },
        metadata: _metadata,
      },
      _phoneNumber_initializers,
      _phoneNumber_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _createAt_decorators,
      {
        kind: 'field',
        name: 'createAt',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'createAt' in obj;
          },
          get: function (obj) {
            return obj.createAt;
          },
          set: function (obj, value) {
            obj.createAt = value;
          },
        },
        metadata: _metadata,
      },
      _createAt_initializers,
      _createAt_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _updateAt_decorators,
      {
        kind: 'field',
        name: 'updateAt',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'updateAt' in obj;
          },
          get: function (obj) {
            return obj.updateAt;
          },
          set: function (obj, value) {
            obj.updateAt = value;
          },
        },
        metadata: _metadata,
      },
      _updateAt_initializers,
      _updateAt_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _role_decorators,
      {
        kind: 'field',
        name: 'role',
        static: false,
        private: false,
        access: {
          has: function (obj) {
            return 'role' in obj;
          },
          get: function (obj) {
            return obj.role;
          },
          set: function (obj, value) {
            obj.role = value;
          },
        },
        metadata: _metadata,
      },
      _role_initializers,
      _role_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    User = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (User = _classThis);
})();
exports.User = User;
