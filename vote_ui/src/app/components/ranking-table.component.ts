import { Directive } from '@angular/core';
import { TripPlace } from '../models/trip-place';

// @Component({
//   selector: 'ranking-table',
//   templateUrl: '../templates/ranking-table.component.html',
// })

@Directive({
    selector: 'ranking-table'
})
export class RankingTableComponent {

  name : string
  places : TripPlace[]

  constructor(name : string)
  {

  }

}
