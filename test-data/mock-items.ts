import { DetailsService } from "src/app/services/details.service";
import { FoodPaletteService } from "src/app/services/food-palette.service";
import { SimpleProfileService } from "src/app/services/simple-profile.service";

// in simple-profile.service.ts for mock profiles list
SimpleProfileService

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

  //in food-palette.service.ts for mock palettes
FoodPaletteService

 palettes: FoodItem[] = [
    new FoodItem('cb half', 89, [
      new Participant('jobel', 89),
      new Participant('arathy', 89 / 2),
      new Participant('manju', 89 / 2),
      new Participant('athul', 89),
      new Participant('yogesh', 89),
      new Participant('arshith', 89),
    ]),
    new FoodItem('veg biriyani', 103, [
      new Participant('thomas', 103),
      new Participant('john', 103),
    ]),
    new FoodItem('cb full', 153, [new Participant('jithin', 153)]),
    new FoodItem('beef roast', 139, [
      new Participant('joel', 69.5),
      new Participant('sidharth', 69.5),
    ]),
    new FoodItem('chapathi', 12, [new Participant('sidharth', 12 * 3)]),
    new FoodItem('porotta', 12, [new Participant('joel', 12 * 2)]),
  ];

 // in details.service.ts
 DetailsService

  tax: number = 113.15;
  discount: number = 75;