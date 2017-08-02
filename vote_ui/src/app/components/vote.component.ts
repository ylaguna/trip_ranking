import { Component, Input, OnInit } from '@angular/core';

import { TripPlace } from '../models/trip-place';
import { PlaceOption } from "../models/place-option";
import { TripService } from '../services/trip.service';


import { LinqService } from 'ng2-linq';
import { VoteService } from "../services/vote.service";
import { PersonalRanking } from "../models/personal-ranking";
import { EmptyOption } from "../models/empty-option";


@Component({
  providers: [LinqService],
  selector: 'vote',
  templateUrl: '../templates/voting.component.html',
  // styleUrls: ['./app.component.css']
})
export class VoteComponent {

  name : string = "";
  email: string = "";

  placeOptions: PlaceOption[] = [];
  teste: number[] = [];

  leftPlace : PlaceOption
  rightPlace : PlaceOption

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
    this.isVoting = true;

    for (let place of places) {
      place.score = 1;
      this.placeOptions.push( new PlaceOption(place) );
    }


    this.leftPlace = this.placeOptions[0];
    this.rightPlace = this.placeOptions[this.placeOptions.length - 1]
  }

  left() : void {
    this.vote(this.leftPlace, this.rightPlace)
  }

  right() : void {
    this.vote(this.rightPlace, this.leftPlace)
  }

  compute_single_game(winner : PlaceOption, looser : PlaceOption) : void {
      winner.wins.push(looser);
      winner.games.push(looser);

      looser.loses.push(winner);
      looser.games.push(winner);

  }


  vote(winner : PlaceOption, looser : PlaceOption) : void {

    this.compute_single_game(winner, looser);

    looser.wins.forEach(win => {
      if(winner.games.includes(win) == false){
        this.compute_single_game(winner, win);
      }
    });

    //Se eu perder para um pais, significa que perderia para todos os paises que aquele pais perdeu...
    // Se A ganha de B e eu perder para B, eu perderia de A
    winner.loses.forEach(lose => {
      if(looser.games.includes(lose) == false){
        this.compute_single_game(lose, looser);
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
    .Where(function(x : PlaceOption){
      return x.games.length < 4
    }).Count()

    return validOptionsCount == 0
  }

  removeDefined(winner) : void {

    const emptyOption = new EmptyOption();

    if(this.rightPlace.games.length == 4){
      this.rightPlace = emptyOption;
    }

    if(this.leftPlace.games.length == 4 || this.leftPlace == winner){
      this.leftPlace = this.getLast(this.rightPlace)
    }

    if(this.rightPlace == emptyOption || this.rightPlace.games.length == 4 || this.rightPlace == winner){
      this.rightPlace = this.getLast(this.leftPlace)
    }
  }

  getLast(other_place : PlaceOption) : PlaceOption {
    const placeOption = this.linq.Enumerable().From(this.placeOptions)
    .Where(function(x : PlaceOption){
      return x.games.includes(other_place) == false && x.place.id != other_place.place.id && x.games.length < 4
    }).OrderBy(function (x : PlaceOption) {
        return x.place.score
    }).Select(function(x : PlaceOption){
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
