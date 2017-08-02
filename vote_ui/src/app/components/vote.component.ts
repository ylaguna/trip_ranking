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
  styleUrls: ['../styles/voting.component.css']
})
export class VoteComponent {

  name : string = "";
  email: string = "";

  placeOptions: PlaceOption[] = [];
  maxGames : number;
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
      this.placeOptions.push( new PlaceOption(place) );
    }
    this.maxGames = (this.placeOptions.length - 1);

    this.leftPlace = this.placeOptions[0];
    this.rightPlace = this.placeOptions[this.placeOptions.length - 1]
  }

  left() : void {
    this.vote(this.leftPlace, this.rightPlace)
  }

  right() : void {
    this.vote(this.rightPlace, this.leftPlace)
  }

  send() : void {
    this.isSending = false;
    this.finished = true;

    this.vote_service
          .sendVote(this.name, this.placeOptions)
          .then(ranking => this.ranking = ranking)
          .then(x => this.finished = false);
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

    if( this.checkFinished() ){
       this.isSending = true;
       this.isVoting = false;
     }
      else{
      this.changeOptions(winner);
     }
  }

  compute_single_game(winner : PlaceOption, looser : PlaceOption) : void {
      winner.wins.push(looser);
      winner.games.push(looser);

      looser.loses.push(winner);
      looser.games.push(winner);
  }

  changeOptions(winner) : void {

    const emptyOption = new EmptyOption();

    // Se a opção da direita foi inválida, esvazia o item préviamente,
    // evitanto o caso onde as duas opções já jogaram com todo mundo.

    if( this.rightPlace.games.length < this.maxGames == false ) {
      this.rightPlace = emptyOption;
    }

    if( this.leftPlace.games.length < this.maxGames == false || this.leftPlace == winner){
      this.leftPlace = this.getOption(this.rightPlace)
    }

    if(this.rightPlace == emptyOption || this.rightPlace == winner){
      this.rightPlace = this.getOption(this.leftPlace)
    }
  }

  checkFinished() : boolean {
    const maxGames = this.maxGames;
    const validOptionsCount = this.linq.Enumerable().From(this.placeOptions)
    .Where(function(option: PlaceOption){
      return option.games.length < maxGames
    }).Count()

    return validOptionsCount == 0
  }

  getOption(other_option : PlaceOption) : PlaceOption {
    const maxGames = this.maxGames;

    const placeOption = this.linq.Enumerable().From(this.placeOptions)
    .Where(function(option : PlaceOption){
      return option.games.includes(other_option) == false && option.place.id != other_option.place.id && option.games.length < maxGames
    }).OrderBy(function (option : PlaceOption) {
        return option.place.score
    }).Select(function(option : PlaceOption){
      return option;
    }).First();

    return placeOption;
    // return validPlaces.sort(x => x.score)[0]
  }



}
