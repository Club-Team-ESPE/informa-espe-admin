import { FormControl, ValidationErrors } from "@angular/forms"

export class CustomValidator{
  static noUpperCaseAtStart(control : FormControl): ValidationErrors | null{
    if(control.value != null
      && !(/^(\s)*([A-Z]){1}(.)+(\s)*$/)
      .test(control.value.trim())){
      return { noUpperCaseAtStart : true }
    }

    return null;
  }
}