import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    miFormulario: FormGroup = this.fb.group({
      email: ['sofia@gmail.com', [Validators.required, Validators.email]],
      password: ['Hola12345@', [Validators.required, Validators.minLength(8)]]
    });

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService){

    }

    login() {
      console.log(this.miFormulario.value);
      const {email, password} = this.miFormulario.value;
      this.authService.login(email, password)
      .subscribe(ok => {
        //console.log(resp);
        if(ok){
          this.router.navigateByUrl('/dashboard')
        }
        else {
          //TODO
        }
      })
      
    }
}
