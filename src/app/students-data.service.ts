import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsDataService {
  protected studentsDataList: any[] = [
    {
      email: 'kranthi@gmail.com',
      mobile: '8985264956'
    },
    {
      email: 'kumar@gmail.com',
      mobile: '9398159868'
    },
  ];

  constructor() { }

  getAllStudentsData(){
    return this.studentsDataList;
  }

  getStudentDataByEmail(email: String){
    return this.studentsDataList.find(student => student.email === email);
  }

  submitForm(email: String, mobile: any) {
    this.studentsDataList.push({
      email, mobile
    })
  }
}
