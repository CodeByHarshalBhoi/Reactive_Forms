import { AbstractControl, FormControl } from "@angular/forms";

export class cusomValidators{
  static noSpaceAllowed(control:FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1){
      return {noSpaceAllowed : true}
    }
    return null;
  }  static checkUsername(control:AbstractControl): Promise<any>{
        return asynValidator(control.value);
  }
}

function asynValidator(username:string){
  let users =['harsh', 'test', 'sample']
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      if(users.includes(username)){
        resolve ({checkUserName: true})
      }else{
            resolve(null);
      }
    }, 2000)
  })
}
