import { Profile } from './profile';

export class Participant {
  profile: Profile;
  contribution: number;
  constructor(profile: Profile, contribution: number) {
    this.profile = profile;
    this.contribution = contribution;
  }

  get name() {
    return this.profile.name;
  }
}
