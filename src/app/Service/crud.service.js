"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CrudService = void 0;
var core_1 = require("@angular/core");
var CrudService = /** @class */ (function () {
    function CrudService(firestore) {
        this.firestore = firestore;
    }
    CrudService.prototype.create_NewEmployee = function (record) {
        return this.firestore.collection('Employees').add(record);
    };
    CrudService.prototype.read_Employees = function () {
        return this.firestore.collection('Employees').snapshotChanges();
    };
    CrudService.prototype.update_Employee = function (recordID, record) {
        this.firestore.doc('Employees/' + recordID).update(record);
    };
    CrudService.prototype.delete_Employee = function (record_id) {
        this.firestore.doc('Employees/' + record_id)["delete"]();
    };
    CrudService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CrudService);
    return CrudService;
}());
exports.CrudService = CrudService;
