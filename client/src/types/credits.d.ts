type CombinedCreditsCast = CombinedCreditCastMovie | CombinedCreditCastTv;
type CombinedCreditsCrew = CombinedCreditCrewTv | CombinedCreditCrewMovie;
type CombinedCreditCastMovie = MovieResult &
  Pick<Person, 'credit_id'> &
  Pick<Cast, 'character' | 'order'>;

type CombinedCreditCastTv = TvResult &
  Pick<Person, 'credit_id'> &
  Pick<Cast, 'character' | 'order'> &
  Pick<CombinedCreditCrewTv, 'episode_count'>;

type CombinedCreditCrewTv = Pick<Person, 'credit_id'> &
  TvResult &
  Pick<Crew, 'department' | 'job'> & {
    episode_count: number;
  };

type CombinedCreditCrewMovie = Pick<Person, 'credit_id'> &
  MovieResult &
  Pick<Crew, 'department' | 'job'>;

interface CombinedCredits {
  cast: CombinedCreditsCast[];
  crew: CombinedCreditsCrew[];
}

type CombinedCreditsCastAndCrew = CombinedCreditsCast | CombinedCreditsCrew;
