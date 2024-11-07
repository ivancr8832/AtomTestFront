import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterComponent } from "../components/register/register.component";
import { AuthService } from '../../../../core/services/auth.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RegisterComponent, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loadingLogin: boolean = false;
  textButtonLogin: string = 'Login';

  @ViewChild(RegisterComponent) registerComponentDialog!: RegisterComponent;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  openDialogRegister(){
    if (this.registerComponentDialog) {
      this.registerComponentDialog.visible = true;
    }
  }

  async onSubmit() {
    this.loadingLogin = true;
    this.textButtonLogin = 'Loading';

    try {
      const { token, user } = await this.authService.login(this.loginForm.value.email);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      this.router.navigate(['/']);

    } catch (error: any) {
      Notify.failure(error.message)
      if (this.registerComponentDialog) {
        this.registerComponentDialog.visible = true;
      }
    } finally {
      this.loadingLogin = false;
      this.textButtonLogin = 'Login';
    }
  }
}
