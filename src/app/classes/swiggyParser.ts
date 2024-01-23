import { Line } from 'tesseract.js';
import { IBillEntry } from './interfaces';

const BillEntryRegex = /\bx\s*\d+\b/i;

function splitDishComponents(itemString: string): IBillEntry {
  const entry: IBillEntry = {
    item: '',
    amount: 0,
  };
  const Splitregex = /(.+?)\s*(x\s*\d+)\s*(\d+)/i;
  const DecimalPickregex = /\d+/g;
  const match = itemString.match(Splitregex);
  if (match) {
    const [, itemName, quantity, price] = match;
    quantity.match(DecimalPickregex)?.map(Number);

    entry.item = itemName.trim();
    entry.amount = parseInt(price, 10);
    entry.quantity = quantity.match(DecimalPickregex)?.map(Number)[0];
  }
  return entry;
}

function filterDishItems(data: Line[]) {
  return data.filter((line) => BillEntryRegex.test(line.text));
}

function swiggyIconStubCorrenction(line: Line) {
  const stubConfidenceThreshold = 65;
  const firstWord = line.words[0];

  if (firstWord.confidence <= stubConfidenceThreshold) {
    line.words.shift();
  }
  return line;
}
function priceSymbolCorrection(line: Line) {
  const symbolConfidenceThreshold = 98;
  const price = line.words[line.words.length - 1];
  let newPrice = '';
  let dirtyFlag = false;
  price.symbols.forEach((symbol) => {
    if (symbol.confidence < symbolConfidenceThreshold) {
      dirtyFlag = true;
      symbol.text = '';
    }
    newPrice += symbol.text;
  });

  if (dirtyFlag) {
    line.words[line.words.length - 1].text = newPrice;
  }

  return line;
}

function constructEntries(data: Line[]): IBillEntry[] {
  const entries: IBillEntry[] = [];
  data.forEach((line) => {
    const billItemString = line.words.map((item) => item.text).join(' ');
    const dish = splitDishComponents(billItemString);
    entries.push(dish);
  });
  return entries;
}

function entriesRectification(data: Line[]) {
  data.forEach((line) => {
    line = swiggyIconStubCorrenction(line);
    line = priceSymbolCorrection(line);
  });
}

export function swiggyParse(data: Line[]) {
  data = filterDishItems(data);
  entriesRectification(data);
  const entries = constructEntries(data);
  return entries;
}
