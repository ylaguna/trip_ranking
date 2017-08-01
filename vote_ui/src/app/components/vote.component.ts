import { Component, Input, OnInit } from '@angular/core';

import { TripPlace } from '../models/trip-place';
import { PlaceChoice } from '../models/place-choice';
import { TripService } from '../services/trip.service';


import { LinqService } from 'ng2-linq';


@Component({
  providers: [LinqService],
  selector: 'vote',
  templateUrl: '../templates/voting.component.html',
  // styleUrls: ['./app.component.css']
})
export class VoteComponent {

  nameString : string = "";
  placeOptions: PlaceChoice[] = [];

  leftPlace : PlaceChoice
  rightPlace : PlaceChoice
  valids : number
  isVoting : boolean;
  finished : boolean;


  constructor(private service: TripService, private linq: LinqService) { }


  ngOnInit(): void {
    this.service.getPlaces()
      .then(places => this.initialize(places));
  }

  initialize(places: TripPlace[]) : void  {
    this.valids = places.length;
    this.isVoting = true;

    for (let place of places) {
      place.score = 0;
      this.placeOptions.push( new PlaceChoice(place) );
    }

    this.leftPlace = this.placeOptions[0];
    this.rightPlace = this.placeOptions[this.placeOptions.length - 1]
  }

  left() : void {
    this.finish_game(this.leftPlace, this.rightPlace)

    if(this.valids > 2)
    {
      this.leftPlace = this.getLast(this.rightPlace)
    }

  }

  right() : void {
    this.finish_game(this.rightPlace, this.leftPlace)
    if(this.valids > 2)
    {
      this.rightPlace = this.getLast(this.leftPlace)
    }
  }

  finish_game(winner : PlaceChoice, looser : PlaceChoice) : void {
    // winner.place.score ++;


    winner.wins.push(looser.place.id)

    looser.wins.forEach(win => {
      if(winner.wins.includes(win) == false){
        winner.wins.push(win)
      }
    });

    winner.place.score = winner.wins.length

    winner.games.push(looser.place.id)
    looser.games.push(winner.place.id)

    if(!this.checkFinished()){
      this.removeDefined();
     }else{
       this.finished = true;
       this.isVoting = false;
     }
  }

  checkFinished() : boolean {
    const validOptionsCount = this.linq.Enumerable().From(this.placeOptions)
    .Where(function(x : PlaceChoice){
      return x.games.length < 4
    }).Count()

    this.valids = validOptionsCount;

    return validOptionsCount == 0
  }

  removeDefined() : void {

    if(this.leftPlace.games.length == 4){
      this.leftPlace = this.getLast(this.rightPlace)
    }

    if(this.rightPlace.games.length == 4){
      this.rightPlace = this.getLast(this.leftPlace)
    }
  }

  getLast(other_place : PlaceChoice) : PlaceChoice {
    const placeOption = this.linq.Enumerable().From(this.placeOptions)
    .Where(function(x : PlaceChoice){
      return x.games.includes(other_place.place.id) == false && x.place.id != other_place.place.id && x.games.length < 4
    }).OrderBy(function (x : PlaceChoice) {
        return x.place.score
    }).Select(function(x : PlaceChoice){
      return x;
    }).First();

    return placeOption;
    // return validPlaces.sort(x => x.score)[0]
  }

  send() : void {

  }

}
