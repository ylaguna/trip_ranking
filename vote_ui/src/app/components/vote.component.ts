import { Component, Input, OnInit } from '@angular/core';

import { TripPlace } from '../models/trip-place';
import { PlaceChoice } from '../models/place-choice';
import { TripService } from '../services/trip.service';


import { LinqService } from 'ng2-linq';
import { VoteService } from "../services/vote.service";
import { PersonalRanking } from "../models/personal-ranking";


@Component({
  providers: [LinqService],
  selector: 'vote',
  templateUrl: '../templates/voting.component.html',
  // styleUrls: ['./app.component.css']
})
export class VoteComponent {

  name : string = "";
  placeOptions: PlaceChoice[] = [];

  leftPlace : PlaceChoice
  rightPlace : PlaceChoice
  valids : number
  isVoting : boolean;
  isSending : boolean;
  finished : boolean;

  ranking : PersonalRanking

  constructor(private service: TripService, private linq: LinqService, private vote_service: VoteService) { }


  ngOnInit(): void {
    this.service.getPlaces()
      .then(places => this.initialize(places));
  }

  initialize(places: TripPlace[]) : void  {
    this.valids = places.length;
    this.isVoting = true;

    for (let place of places) {
      place.score = 1;
      this.placeOptions.push( new PlaceChoice(place) );
    }

    this.leftPlace = this.placeOptions[0];
    this.rightPlace = this.placeOptions[this.placeOptions.length - 1]
  }

  left() : void {
    this.finish_game(this.leftPlace, this.rightPlace)

    // if(this.valids > 2)
    // {
    //   this.leftPlace = this.getLast(this.rightPlace)
    // }

  }

  right() : void {
    this.finish_game(this.rightPlace, this.leftPlace)
    // if(this.valids > 2)
    // {
    //   this.rightPlace = this.getLast(this.leftPlace)
    // }
  }

  finish_game(winner : PlaceChoice, looser : PlaceChoice) : void {
    // winner.place.score ++;


    winner.wins.push(looser)
    looser.loses.push(winner)
    winner.games.push(looser)
    looser.games.push(winner)

    looser.wins.forEach(win => {
      if(winner.games.includes(win) == false){

        winner.wins.push(win)
        win.loses.push(winner)

        winner.games.push(win)
        win.games.push(winner)

      }
    });

    //Se eu perder para um pais, significa que perderia para todos os paises que aquele pais perdeu...
    // Se A ganha de B e eu perder para B, eu perderia de A
    winner.loses.forEach(lose => {
      if(looser.games.includes(lose) == false){

        looser.loses.push(lose)
        lose.wins.push(looser)

        looser.games.push(lose)
        lose.games.push(looser)

      }
    });



    if( this.checkFinished() == false ){
      this.removeDefined(winner);
     }else{
       this.isSending = true;
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

  removeDefined(winner) : void {

    if(this.leftPlace.games.length == 4 || this.leftPlace == winner){
      this.leftPlace = this.getLast(this.rightPlace)
    }

    if(this.rightPlace.games.length == 4 || this.rightPlace == winner){
      this.rightPlace = this.getLast(this.leftPlace)
    }
  }

  getLast(other_place : PlaceChoice) : PlaceChoice {
    const placeOption = this.linq.Enumerable().From(this.placeOptions)
    .Where(function(x : PlaceChoice){
      return x.games.includes(other_place) == false && x.place.id != other_place.place.id && x.games.length < 4
    }).OrderBy(function (x : PlaceChoice) {
        return x.place.score
    }).Select(function(x : PlaceChoice){
      return x;
    }).First();

    return placeOption;
    // return validPlaces.sort(x => x.score)[0]
  }

  send() : void {
    this.isSending = false;
    this.finished = true;

    this.vote_service
          .sendVote(this.name, this.placeOptions)
          .then(ranking => this.ranking = ranking)
          .then(x => this.finished = false);
  }

}
