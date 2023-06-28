import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocalService } from '../localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  subjectForm: FormGroup;
  items: any;
  savesubject: any;
  getdata: any;

  constructor(private fb: FormBuilder,
    private storage: LocalService,
    private route: Router,
    private router: ActivatedRoute,
    private service:ServicesService
  ) {

    this.getdata = this.route.getCurrentNavigation()?.extras?.state;
    console.log('pro:', this.getdata);;

    this.subjectForm = new FormGroup({
      name: new FormControl("", [Validators.required,]),
      subject: new FormArray([
        new FormGroup({
          subjectname: new FormControl(''),
          marks: new FormControl(''),
        })
      ])
    });

    if (this.getdata != null) {
      this.subjectForm.controls['name'].setValue(this.getdata.name);
      if (this.getdata.subject) {
        const subject = <FormArray>this.subjectForm.controls['subject'];
        subject.removeAt(0);
        this.getdata.subject.forEach((element: any) => {
          this.setSubjects(element);
        });
      }
    }


  }

  // showdata(){
  //   this.savesubject = JSON.parse(this.storage.getData('addUser') as string);
  //   console.log('data:', this.savesubject);

  // }


  get subject(): FormArray {
    return this.subjectForm.get('subject') as FormArray;
  }

  addSubjects() {
    this.subject.push(
      new FormGroup({
        subjectname: new FormControl(""),
        marks: new FormControl(""),
      })
    );
  }

  setSubjects(data: any) {
    this.subject.push(
      new FormGroup({
        subjectname: new FormControl(data.subjectname),
        marks: new FormControl(data.marks),
      })
    );
  }

  removesubject(index: number) {
    this.subject.removeAt(index);
  }



  
  onSubmit(value: any) {
    console.log('data:', value);
    this.savesubject = JSON.parse(this.storage.getData('addUser') as string);
    console.log('data:', this.savesubject);
    if (this.savesubject != null) {
      const index = this.savesubject.findIndex((item: any) => item.name == value.name);
      if (index !== -1) {
        this.savesubject[index] = value;
        this.service.presentAlert()
      } else {
        this.savesubject.push(value);
      }
    }
    // } else {
    //   this.savesubject = [value];
    // }
    this.storage.saveData('addUser', JSON.stringify(this.savesubject));
    this.subjectForm.reset();
    this.route.navigate(['/view']);
  }


}
