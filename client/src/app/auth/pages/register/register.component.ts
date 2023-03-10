import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    nombre: ['Sofia', [Validators.required]],
    email: ['sofia@gmail.com', [Validators.required, Validators.email]],
    password: ['Hola12345@', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder, private router: Router){

  }

  register() {
    console.log(this.miFormulario.value);
    //console.log(this.miFormulario.valid)

    this.router.navigateByUrl('/dashboard')
  }

}
