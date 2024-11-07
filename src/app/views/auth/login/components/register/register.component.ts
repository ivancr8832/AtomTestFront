import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../../../../core/services/auth.service';
import { User } from '../../../../../interfaces';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  @Input() visible: boolean = false;

  registerForm!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isSubmited: boolean = false;
  textButtonSubmit: string = 'Submit';

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onCancel(){
    this.registerForm.reset();
    this.visible = false;
  }

  async onSubmit(){

    this.isSubmited = true;
    this.textButtonSubmit = 'Loading';

    try {
      const newUser: User = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email
      }

      const { token, user } = await this.authService.register(newUser);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      this.router.navigate(['/']);

    } catch (error: any) {
      Notify.failure(error.message)
    } finally {
      this.isSubmited = false;
      this.textButtonSubmit = 'Submit';
    }
  }

}
