import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { User } from '../../interfaces';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  private router = inject(Router);
  nameUser: string = '';

  ngOnInit(): void {
    const userLocalDb = JSON.parse(localStorage.getItem("user")!) as User;
    this.nameUser = userLocalDb.name
  }


  onLogout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    this.router.navigate(['/login']);
  }
}
