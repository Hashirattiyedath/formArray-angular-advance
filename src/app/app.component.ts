import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  reactiveForms!: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.reactiveForms = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],

      personalDetails: this._fb.group({
        motherName: ['', Validators.required],
        fatherName: ['', Validators.required],
      }),

      skills: this._fb.array([
        // default showing input lists
        this.newSkills()
      ]),
    });
  }

  get skillList(): FormArray {
    return this.reactiveForms.get('skills') as FormArray;
  }

  newSkills() {
    return this._fb.group({
      skill: ['', Validators.required],
      exp: ['', Validators.required],
    });
  }

  addSkills() {
    this.skillList.push(this.newSkills());
  }

  removeSkill(i: number) {
    // removeAt() is the formArray inbuild property for removing currrent formControls in an array
    this.skillList.removeAt(i);
  }

  submitForm() {
    console.log(this.reactiveForms.value);
  }
}
