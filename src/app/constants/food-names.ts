export interface foodItem {
  name: string;
  icon: string;
}

export const foodNames: foodItem[] = [
  { icon: '🍗', name: 'Al Faham' },
  { icon: '🍛', name: 'Chilly Chicken' },
  { icon: '🍛', name: 'Pepper Chicken' },
  { icon: '🍘', name: 'Al Faham Mandhi' },
  { icon: '🍘', name: 'Mandhi' },
  { icon: '🥘', name: 'Biriyani' },
  { icon: '🍗', name: 'Chicken Biriyani' },
  { icon: '🍖', name: 'Beef Biriyani' },
  { icon: '🍜', name: 'Noodles' },
  { icon: '🍜', name: 'Chicken Noodles' },
  { icon: '🍜', name: 'Schezwan Noodles' },
  { icon: '🍚', name: 'Fried Rice' },
  { icon: '🍚', name: 'Chicken Fried Rice' },
  { icon: '🍗', name: 'Brosted Chicken' },
  { icon: '🫓', name: 'Porotta' },
  { icon: '🫓', name: 'Chapatti' },
  { icon: '🥚', name: 'Egg Curry' },
  { icon: '🍖', name: 'Beef Roast' },
  { icon: '🍖', name: 'Beef Fry' },
  { icon: '🍔', name: 'Burger' },
  { icon: '🍔', name: 'Chicken Burger' },
  { icon: '🍔', name: 'Butter Chicken' },
  { icon: '🫓', name: 'Naan' },
  { icon: '🫓', name: 'Butter Naan' },
  { icon: '🍚', name: 'Meals' },
  { icon: '🌭', name: 'Sausage' },
  { icon: '🍕', name: 'Pizza' },
  { icon: '🍚', name: 'Meals' },
  { icon: '🌯', name: 'Shawarma' },
  { icon: '🍖', name: 'Kebab' },
  { icon: '🥪', name: 'Sandwich' },
  { icon: '🥪', name: 'Chicken Sandwich' },
  { icon: '🦐', name: 'Prawns' },
  { icon: '🥟', name: 'Momos' },
  { icon: '🍗', name: 'Nuggets' },
  { icon: '🍟', name: 'Fries' },
  { icon: '🥗', name: 'Salad' },

  // --DRINKS--
  { icon: '🥤', name: 'Shake' },
  { icon: '🧋', name: 'Chocolate Shake' },
  { icon: '🍹', name: 'Mojito' },
  { icon: '🥤', name: 'Coke' },
  { icon: '🥤', name: 'Pepsi' },
  { icon: '🧃', name: 'Juice' },
];

export const foodLogo: foodItem[] = [
  { icon: '🥪', name: 'sandwich' },
  { icon: '🌯', name: 'roll' },
  { icon: '🐟', name: 'fish' },
  { icon: '🍚', name: 'rice' },
  { icon: '🍗', name: 'chicken|faham|bbq|alfahm|fahm' },
  { icon: '🍘', name: 'mandhi|mandi' },
  { icon: '🍖', name: 'beef' },
  { icon: '🍲', name: 'soup' },
  { icon: '🍜', name: 'Noodles' },
  { icon: '🍰', name: 'cake' },
  { icon: '🍔', name: 'burger' },
  { icon: '🍲', name: 'curry' },
  { icon: '🥤', name: 'shake|juice|cola' },
  { icon: '☕', name: 'tea|coffee' },
];

export function getLogo(value: string) {
  value = value.toLowerCase();
  let icon = '🍽️';
  let item = foodNames.find((fooditem) => fooditem.name.toLowerCase() == value);
  if (item) {
    icon = item.icon;
    return icon;
  }

  //keyword search
  const searchKeywords = value.split(' ');

  for (const keyword of searchKeywords) {
    const matchingFoodItem = foodLogo.find((foodItem) =>
      foodItem.name
        .split('|')
        .some((namePart) => namePart.toLowerCase() === keyword)
    );

    if (matchingFoodItem) {
      icon = matchingFoodItem.icon;
    }
  }
  return icon;
}
