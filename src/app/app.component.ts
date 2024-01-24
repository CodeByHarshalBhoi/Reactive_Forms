import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Reactive_Forms';

  reactiveForm:FormGroup;
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname:new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastname:new FormControl(null, Validators.required),
      email:new FormControl(null, [Validators.required, Validators.email]),
      username:new FormControl(null),
      dob:new FormControl(null),
      gender:new FormControl('male'),
      address: new FormGroup({
        street:new FormControl(null, Validators.required),
        country:new FormControl('India'),
        city:new FormControl(null),
        region:new FormControl(null, Validators.required),
        postal:new FormControl(null, Validators.required),
      }),
      skills:new FormArray([
        new FormControl(null, Validators.required)
      ])
    })
  }
  OnFormSubmit(){
    console.log(this.reactiveForm);
  }


  addSkills(){
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required));
  }

  deleteSkills(index:number){
    const controls = <FormArray>this.reactiveForm.get('skills');
    controls.removeAt(index);
  }
}
