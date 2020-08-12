import { Component, Injectable, OnInit } from '@angular/core';

import { CrudService } from './Service/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@Injectable()
export class AppComponent  implements OnInit {
  title = 'Firestore CRUD Operations Employee App';

  Employees: any;
  empID: string;
  empName: string;
  dob = new Date(0);
  deg: string;
  address: string;
  doj = new Date(0);

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.read_Employees().subscribe(data => {
      this.Employees = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Employee_ID: e.payload.doc.data()['Employee_ID'],
          Name: e.payload.doc.data()['Name'],
          DOB: e.payload.doc.data()['DOB'],
          Designation: e.payload.doc.data()['Designation'],
          Address: e.payload.doc.data()['Address'],
          DOJ: e.payload.doc.data()['DOJ']
        };
      })
      console.log(this.Employees);

    });
  }

  CreateRecord() {
    let record = {};
    record['Employee_ID'] = this.empID;
    record['Name'] = this.empName;
    record['DOB'] = this.dob;
    record['Designation'] = this.deg;
    record['Address'] = this.address;
    record['DOJ'] = this.doj;

    this.crudService.create_NewEmployee(record).then(resp => {
      this.empID = "";
      this.empName = "";
      this.dob = new Date(0);
      this.deg = "";
      this.address = "";
      this.doj = new Date(0);
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.crudService.delete_Employee(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditDOB = record.DOB;
    record.EditDesignation = record.Designation;
    record.EditAddress = record.Address;
    record.EditDOJ = record.DOJ;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['DOB'] = recordRow.EditDOB;
    record['Designation'] = recordRow.EditDesignation;
    record['Address'] = recordRow.EditAddress;
    record['DOJ'] = recordRow.EditDOJ;
    this.crudService.update_Employee(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
