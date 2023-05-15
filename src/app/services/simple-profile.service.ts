import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver-es';
import { Profile } from '../classes/profile';

@Injectable({
  providedIn: 'root',
})
export class SimpleProfileService {
  profiles: Profile[] = [];
  constructor() {
    this.fetchFromLocalStorage();
  }

  remove(profileName: string) {
    this.profiles = this.profiles.filter((x) => x.name !== profileName);
    this.setLocalStorage();
  }

  add(profileName: string) {
    let newProfile = new Profile(profileName);
    this.profiles.push(newProfile);
    this.profiles.sort();
    this.setLocalStorage();
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
          this.setLocalStorage();
        }
      } catch (error) {
        console.log(error);
        alert('Invalid profile file');
      }
    };
  }

  fetchFromLocalStorage() {
    let profiles = localStorage.getItem('myProfiles');
    if (profiles != null) this.profiles = JSON.parse(profiles);
  }
  setLocalStorage() {
    localStorage.setItem('myProfiles', JSON.stringify(this.profiles));
  }
}
