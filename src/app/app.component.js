"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(crudService) {
        this.crudService = crudService;
        this.title = 'Firestore CRUD Operations Employee App';
        this.dob = new Date();
        this.doj = new Date();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.crudService.read_Employees().subscribe(function (data) {
            _this.Employees = data.map(function (e) {
                return {
                    id: e.payload.doc.id,
                    isEdit: false,
                    Name: e.payload.doc.data()['Name'],
                    DOB: e.payload.doc.data()['DOB'],
                    Designation: e.payload.doc.data()['Designation'],
                    Address: e.payload.doc.data()['Address'],
                    DOJ: e.payload.doc.data()['DOJ']
                };
            });
            console.log(_this.Employees);
        });
    };
    AppComponent.prototype.CreateRecord = function () {
        var _this = this;
        var record = {};
        record['Name'] = this.empName;
        record['DOB'] = this.dob;
        record['Designation'] = this.deg;
        record['Address'] = this.address;
        record['DOJ'] = this.doj;
        this.crudService.create_NewEmployee(record).then(function (resp) {
            _this.empName = "";
            _this.dob = new Date();
            _this.deg = "";
            _this.address = "";
            console.log(resp);
        })["catch"](function (error) {
            console.log(error);
        });
    };
    AppComponent.prototype.RemoveRecord = function (rowID) {
        this.crudService.delete_Employee(rowID);
    };
    AppComponent.prototype.EditRecord = function (record) {
        record.isEdit = true;
        record.EditName = record.Name;
        record.EditDOB = record.DOB;
        record.EditDesignation = record.Designation;
        record.EditAddress = record.Address;
        record.EditDOJ = record.DOJ;
    };
    AppComponent.prototype.UpdateRecord = function (recordRow) {
        var record = {};
        record['Name'] = recordRow.EditName;
        record['DOB'] = recordRow.EditDOB;
        record['Designation'] = recordRow.EditDesignation;
        record['Address'] = recordRow.EditAddress;
        record['DOJ'] = recordRow.EditDOJ;
        this.crudService.update_Employee(recordRow.id, record);
        recordRow.isEdit = false;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        core_1.Injectable()
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
