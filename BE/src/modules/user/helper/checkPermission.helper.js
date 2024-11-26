'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Permission = void 0;
var common_1 = require('@nestjs/common');
var Permission = /** @class */ (function () {
  function Permission() {}
  Permission.check = function (id, currentUser) {
    if (id === currentUser.id) return;
    if (currentUser.role === 'ADMIN') return;
    throw new common_1.BadRequestException("User can't perform action");
  };
  return Permission;
})();
exports.Permission = Permission;
