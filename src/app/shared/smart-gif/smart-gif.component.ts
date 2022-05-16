import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/reducers';

@Component({
  selector: 'app-smart-gif',
  templateUrl: './smart-gif.component.html',
  styleUrls: ['./smart-gif.component.scss']
})
export class SmartGifComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
