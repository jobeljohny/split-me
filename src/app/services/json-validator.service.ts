import { Injectable } from '@angular/core';
import Ajv from 'ajv';
import { profileSchema } from '../classes/commons';

@Injectable({
  providedIn: 'root',
})
export class JsonValidatorService {
  private ajv: Ajv;
  constructor() {
    this.ajv = new Ajv();
  }
  validate(json: any, schema: any): boolean {
    const validate = this.ajv.compile(schema);
    const isValid = validate(json);

    if (!isValid) {
      console.error('Validation errors:', validate.errors);
    }

    return isValid;
  }
  profilesValidator(json: any) {
    return this.validate(json, profileSchema);
  }
}
