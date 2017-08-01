import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import VoteFactory from '../factory/vote.factory'

import { TripPlace } from '../models/trip-place';
import { PersonVote } from "../models/person-vote";
import { PlaceChoice } from "../models/place-choice";
import { PersonalRanking } from "../models/personal-ranking";

@Injectable()
export class VoteService {
  private voteUrl = 'http://localhost:3000/api/trip/vote';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  sendVote(name : string, place_options : PlaceChoice[]): Promise<PersonalRanking> {
    var person_vote = new PersonVote();
    person_vote.name = name;
    person_vote.email = "test@mail.com"
    person_vote.votes = VoteFactory(place_options);

    return this.http.post(this.voteUrl,
              {
                name: person_vote.name,
                email: person_vote.email,
                votes: person_vote.votes
              })
             .toPromise()
             .then(response => response.json().result as PersonalRanking)
             .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}