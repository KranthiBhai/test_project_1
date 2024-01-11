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

  task3 =
    'Create a ReactiveForm and store the data in localStorage and access the data from the LocalStorage and Show them in the Window?';
  applyForm = new FormGroup({
    email: new FormControl(''),
    mobile: new FormControl(''),
  });

  studentsDataList: any[] = [];
  selectedIndex: number = -1;
  isEditMode: boolean = false;
  isSubmitMode: boolean = true;

  submitForm() {
    if (this.isEditMode) {
      this.updateData();
    } else {
      this.addNewData();
    }
    this.clear();
  }

  edit(i: number) {
    this.applyForm.patchValue({
      email: this.studentsDataList[i].email,
      mobile: this.studentsDataList[i].mobile,
    });
    this.selectedIndex = i;
    this.isEditMode = true;
    this.isSubmitMode = false;
  }

  updateData() {
    if (this.selectedIndex !== -1) {
      this.studentsDataList[this.selectedIndex].email =
        this.applyForm.value.email;
      this.studentsDataList[this.selectedIndex].mobile =
        this.applyForm.value.mobile;

      localStorage.setItem(
        'studentsList',
        JSON.stringify(this.studentsDataList)
      );
    }
    this.clearEditMode();
  }

  addNewData() {
    this.studentsDataList.push(this.applyForm.value);
    localStorage.setItem('studentsList', JSON.stringify(this.studentsDataList));
  }

  clear() {
    this.applyForm.reset();
    this.clearEditMode();
  }

  clearEditMode() {
    this.selectedIndex = -1;
    this.isEditMode = false;
    this.isSubmitMode = true;
  }

  loadData() {
    let data: any = localStorage.getItem('studentsList');
    // alert(data);
    this.studentsDataList = JSON.parse(data);
  }

  onDelete(i: number) {
    this.studentsDataList.splice(i, 1);
    localStorage.setItem('studentsList', JSON.stringify(this.studentsDataList));
  }

  ngOnInit(): void {
    this.fetchData();
    // this.submitForm();
    let localData = localStorage.getItem('studentsList');
    if (localData !== null) {
      this.studentsDataList = JSON.parse(localData || '[]');
    }
  }
}
