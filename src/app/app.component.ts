import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Exercise';
  isLoading: boolean;

  ngOnInit(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 600);
  }
}
