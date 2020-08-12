import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewEmployee(record) {
    return this.firestore.collection('Employees').add(record);
  }

  read_Employees() {
    return this.firestore.collection('Employees').snapshotChanges();
  }

  update_Employee(recordID,record){
    this.firestore.doc('Employees/' + recordID).update(record);
  }

  delete_Employee(record_id) {
    this.firestore.doc('Employees/' + record_id).delete();
  }
}
