import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { cusomValidators } from './Validators/noSpaceAllowed.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Reactive_Forms';


formStatus:string='';
formData:any={}

  reactiveForm: FormGroup;
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, Validators.minLength(3), cusomValidators.noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, cusomValidators.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required, cusomValidators.checkUsername),
      dob: new FormControl(null),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('India'),
        city: new FormControl(null),
        region: new FormControl(null, Validators.required),
        postal: new FormControl(null, Validators.required),
      }),
      skills: new FormArray([
        new FormControl(null, Validators.required)
      ]),

      // experience:new FormArray([
      //   new FormGroup({

      //   })
      // ])
    })


    // // VALUE CHANGES EVENT IN PERTICULAR FIELD
    // this.reactiveForm.get('firstname').valueChanges.subscribe((value)=>{
    //   console.log('perticular field value change  '+value);
    // })

    //   // VALUE CHANGES EVENT IN WHOLE FORM
    //   this.reactiveForm.valueChanges.subscribe((value)=>{
    //     console.log(value);
    //   })


    // STATUS CHANGES EVENT IN PERCULAR FIELD-it will invalid/pending still we are not providing valid value
    this.reactiveForm.get('email').statusChanges.subscribe((value) => {
      console.log(value);
    })

    this.reactiveForm.get('username').statusChanges.subscribe((value) => {
      console.log(value);
    })


    // STATUS CHANGES EVENT IN WHOLE FORM-it will invalid/pending still we are not providing valid value
    this.reactiveForm.statusChanges.subscribe((value)=>{
      console.log(value);
      this.formStatus=value;
    })

  }
  OnFormSubmit() {
    console.log(this.reactiveForm);
    this.formData = this.reactiveForm.value;
    // this.reactiveForm.reset();
    this.reactiveForm.reset({
      firstname:null,
      lastname: null,
      email: null,
      username: null,
      dob: null,
      gender: 'male',
      address: {
        street: null,
        country: 'India',
        city:null,
        region:null,
        postal: null,
      },
      skills:[
       null
      ],
    });
  }


  addSkills() {
    (<FormArray>this.reactiveForm.get('skills'))
      .push(new FormControl(null, Validators.required));
  }

  deleteSkill(index: number) {
    const controls = <FormArray>this.reactiveForm.get('skills');
    controls.removeAt(index);
  }

  // addExperience(){

  //   const frmGroup = new FormGroup({
  //     company:new FormControl(null),
  //     position:new FormControl(null),
  //     totalExp:new FormControl(null),
  //     start:new FormControl(null),
  //     end:new FormControl(null)
  //   });
  //   (<FormArray>this.reactiveForm.get('experience')).push(frmGroup)
  // }



  generateUsername(){
    let username= '';
    let fName:string = this.reactiveForm.get('firstname').value
    let lName:string = this.reactiveForm.get('lastname').value
    let dob:string = this.reactiveForm.get('dob').value

    if(fName.length >= 3){
      username += fName.slice(0,3);
    }else{
      username += fName;
    }

    if(lName.length >= 3){
      username+= lName.slice(0,3);
    }else{
      username += lName;
    }

    let datetime  = new Date(dob);
    username += datetime.getFullYear();
    username = username.toLowerCase();
    console.log(username);


      // METHOD-1
    // this.reactiveForm.setValue({
    //   firstname:this.reactiveForm.get('firstname').value,
    //   lastname:this.reactiveForm.get('lastname').value,
    //   email:this.reactiveForm.get('email').value,
    //   username:username,
    //   dob:this.reactiveForm.get('dob').value,
    //   gender:this.reactiveForm.get('gender').value,
    //   address:{
    //     street:this.reactiveForm.get('address.street').value,
    //     country:this.reactiveForm.get('address.country').value,
    //     city:this.reactiveForm.get('address.city').value,
    //     region:this.reactiveForm.get('address.region').value,
    //     postal:this.reactiveForm.get('address.postal').value
    //   },
    //   skills:this.reactiveForm.get('skills').value
    // })


    // METHOD-2
    // this.reactiveForm.get('username').setValue(username);


    // METHOD-3
    this.reactiveForm.patchValue({
      username:username,
      address:{
        city:'Surat'
      }
    })
  }

}
