"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateObject = void 0;
var ValidateObject = /** @class */ (function () {
    function ValidateObject() {
    }
    ValidateObject.prototype.validateObject = function (object1, object2) {
        if (!this.isObject(object1) || !this.isObject(object2)) {
            return { valid: false };
        }
        for (var key in object1) {
            if (!object2[key])
                return { valid: false };
            else if (typeof object2[key] == 'object') {
                var check = this.validateObject(object2[key], object1[key]);
                if (!check.valid)
                    return { valid: false };
            }
            else if (!object2[key].length || !object1[key].length)
                return { valid: false };
            else {
                if (object2[key] !== object1[key])
                    return { valid: false };
            }
        }
        return { valid: true };
    };
    ValidateObject.prototype.isObject = function (value) {
        return typeof value === 'object' && value !== null;
    };
    return ValidateObject;
}());
exports.ValidateObject = ValidateObject;
var object1 = {
    name: 'sandeep',
    sec: 'pachat',
    add:{
        name:'sa'
    }
};
var object2 = {
    name: 'sandeep',
    sec: 'pachat',
    add:{
        name:'sxa'
    }
};
var out = new ValidateObject();
var ok = out.validateObject(object1, object2);
console.log(ok);
