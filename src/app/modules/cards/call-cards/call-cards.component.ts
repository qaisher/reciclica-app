import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-call-cards',
  templateUrl: './call-cards.component.html',
  styleUrls: ['./call-cards.component.scss'],
})
export class CallCardsComponent implements OnInit {

  @Input() hasHeader : boolean = false;
  @Input() hasFooter : boolean = false;

  @Input() status: string = '';
  @Input() updatedAt: string = '';
  @Input() createdOn: string = '';
  @Input() notes: string = '';
  @Input() value: string = '$0'


  constructor(private router : Router) { }

  ngOnInit() {}

  seeAllPickupCalls() {
    this.router.navigate(['pickup-calls']);
  }
  
}
