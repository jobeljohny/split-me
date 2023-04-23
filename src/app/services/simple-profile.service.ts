import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver-es';

@Injectable({
  providedIn: 'root',
})
export class SimpleProfileService {
  profiles: string[] = [
    'jobel',
    'arathy',
    'manju',
    'arshith',
    'athuljith',
    'yogesh',
    'joel',
    'john',
    'thomas',
    'sidharth',
    'jithin',
  ].sort();
  constructor() {}

  remove(profile: string) {
    this.profiles = this.profiles.filter((x) => x !== profile);
  }

  add(profile: string) {
    this.profiles.push(profile);
    this.profiles.sort();
  }

  exportProfiles() {
    if (this.profiles.length > 0) {
      return saveAs(
        new Blob([JSON.stringify(this.profiles, null, 2)], { type: 'JSON' }),
        'my_profiles.prf'
      );
    } else {
      alert('No profile set to export');
    }
  }
  checkValid(profilePack: string[]) {
    return !(new Set(profilePack).size !== profilePack.length);
  }

  importProfiles(file: any) {
    let fileReader = new FileReader();

    fileReader.readAsText(file);
    fileReader.onload = (e) => {
      try {
        if (fileReader.result)
          var impData = JSON.parse(fileReader.result as string);
        if (this.checkValid(impData)) {
          this.profiles = impData;
          this.profiles.sort();
        }
      } catch (error) {
        console.log(error);
        alert('Invalid profile file');
      }
    };
  }
}
