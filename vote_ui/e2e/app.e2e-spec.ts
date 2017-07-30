import { TripPlaceVotePage } from './app.po';

describe('trip-place-vote App', () => {
  let page: TripPlaceVotePage;

  beforeEach(() => {
    page = new TripPlaceVotePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
