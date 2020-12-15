import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'main-view.component.html',
  styleUrls: ['main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  rows: any[] = [];

  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.httpClient.get(`assets/samples/1.json`).subscribe((result: any) => {
      this.rows = result.rows;
    });
  }
}
