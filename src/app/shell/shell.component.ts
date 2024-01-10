import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StudentsDataService } from '../students-data.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements OnInit {
  task1 =
    'Create a variable and assaign some default text to it and then create a button element and by using the button element change the text?';
  text = 'Hi World';
  changeText() {
    this.text = 'Hi Kranthi';
  }

  task2 = 'Make an API call and bind the fetched data to a variable?';
  httpClient = inject(HttpClient);
  data: any[] = [];
  fetchData() {
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/todos')
      .subscribe((data: any) => {
        // console.log(data);
        this.data = data;
      });
  }

  task3 = 'Create a ReactiveForm and store the data in localStorage and access the data from the LocalStorage and Show them in the Window?';
  applyForm = new FormGroup({
    email: new FormControl(''),
    mobile: new FormControl(''),
  });

  // studentsDataList: any = [];
  // studentsDataService = inject(StudentsDataService);
  // submitForm(){
  //   this.studentsDataService.submitForm(
  //     this.applyForm.value.email ?? '',
  //     this.applyForm.value.mobile ?? ''
  //   )
  // }
  // constructor() {
  //   this.studentsDataList = this.studentsDataService.getAllStudentsData();
  // }

  studentsDataList: any = [];
  submitForm() {
    let data = {
      email: this.applyForm.value.email,
      mobile: this.applyForm.value.mobile,
    };

    localStorage.setItem('studentsList', JSON.stringify(data));
    this.loadData();
  }

  loadData() {
    let data: any = localStorage.getItem('studentsList');
    // alert(data);
    this.studentsDataList.push(JSON.parse(data));
  }

  ngOnInit(): void {
    this.fetchData();
    this.submitForm();
  }
}
