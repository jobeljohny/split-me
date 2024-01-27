import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { saveAs } from 'file-saver-es';
import { Profile } from '../classes/profile';
import { selectionStatus } from '../classes/interfaces';
import { Subject } from 'rxjs';
import { JsonValidatorService } from './json-validator.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SimpleProfileService {
  profiles: Profile[] = [];
  selections: Profile[] = [];
  selectionCleared = new Subject<void>();
  private selectonListener: (() => void) | undefined;
  private clickListenerActive = false;
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    private validator: JsonValidatorService,
    private toastr: ToastrService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.fetchFromLocalStorage();
    this.SelectionClickHandler = this.SelectionClickHandler.bind(this);
  }

  remove(profileName: string) {
    this.profiles = this.profiles.filter((x) => x.name !== profileName);
    this.setLocalStorage();
  }

  add(profileName: string) {
    let newProfile = new Profile(profileName);
    this.profiles.push(newProfile);
    this.profiles.sort((a, b) => a.name.localeCompare(b.name));
    this.setLocalStorage();
  }

  exportProfiles() {
    if (this.profiles.length > 0) {
      return saveAs(
        new Blob([JSON.stringify(this.profiles, null, 2)], { type: 'JSON' }),
        'my_profiles.prf'
      );
    } else {
      this.toastr.error('There are no profiles to export');
    }
  }
  //multi-selection functions
  SelectionClickHandler(event: MouseEvent) {
    if (this.selections.length != 0) {
      const clickedElement = event.target as HTMLElement;
      if (!clickedElement.closest('app-name-profile')) this.clearSelection();
    }
  }

  onSelectionUpdated(selection: selectionStatus) {
    if (selection.status) {
      this.selections.push(selection.profile);
    } else {
      const index = this.selections.indexOf(selection.profile);
      if (index !== -1) {
        this.selections.splice(index, 1);
      }
    }
    if (this.selections.length) this.enableClickListener();
    else this.disableClickListener();
  }

  enableClickListener() {
    if (!this.clickListenerActive) {
      this.clickListenerActive = true;
      this.selectonListener = this.renderer.listen(
        'document',
        'click',
        this.SelectionClickHandler
      );
    }
  }

  disableClickListener() {
    this.clickListenerActive = false;
    if (this.selectonListener) this.selectonListener();
  }

  //- end - multi-selection functions

  clearSelection() {
    this.selections = [];
    this.selectionCleared.next();
    this.disableClickListener();
  }

  checkValid(profilePack: any) {
    return this.validator.profilesValidator(profilePack);
  }

  importProfiles(file: any) {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      try {
        if (fileReader.result)
          var impData = JSON.parse(fileReader.result as string);
        if (this.checkValid(impData)) {
          this.profiles = impData;
          this.setLocalStorage();
          this.toastr.success(
            `successfully imported ${this.profiles.length} profiles`,
            'Success'
          );
        } else {
          this.toastr.error('Invalid profile file');
        }
      } catch (error) {
        console.log(error);
        this.toastr.error('Invalid profile file');
      }
    };
    fileReader.readAsText(file);
  }

  fetchFromLocalStorage() {
    let profiles = localStorage.getItem('myProfiles');
    if (profiles != null) {
      let json = JSON.parse(profiles);
      if (this.checkValid(json)) this.profiles = json;
    }
  }
  setLocalStorage() {
    localStorage.setItem('myProfiles', JSON.stringify(this.profiles));
  }
}
