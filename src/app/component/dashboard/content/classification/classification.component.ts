import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {

  model: any;
  loading: boolean;

  constructor() { }
  ngOnInit(): void {
  }

}
