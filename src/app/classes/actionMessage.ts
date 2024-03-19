import { Action, ActionType } from './constants';
import { FoodItem } from './food-item';

interface MessageMap {
  [key: number]: (payload: any, paletteName?: string) => string;
}
const messageMap: MessageMap = {
  [ActionType.ADD_PROFILE]: (payload) =>
    `Added new profile ${payload.profile.name}`,
  [ActionType.REMOVE_PROFILE]: (payload) => `Removed profile ${payload.name}`,
  [ActionType.ADD_PALETTE]: () => `Added a new palette`,
  [ActionType.REMOVE_PALETTE]: (_, paletteName) =>
    `Removed palette '${paletteName}'`,
  [ActionType.ADD_PARTICIPANT]: (payload, paletteName) =>
    `Added ${payload.participants!.length} participant(s) to '${paletteName}'`,
  [ActionType.REMOVE_PARTICIPANT]: (payload, paletteName) =>
    `Removed ${1} participant(s) from '${paletteName}'`,
  [ActionType.UPDATE_DISH_PRICE]: (payload, paletteName) =>
    `Updated '${paletteName}' price to ${payload.price}`,
  [ActionType.UPDATE_PARTICIPANT_PRICE]: (payload, paletteName) =>
    `Updated contribution of ${payload.name} from '${paletteName}' to ${payload.contribution}`,
  [ActionType.UPDATE_TAX_DISCOUNT]: () => `Updated Tax / Discount`,
  [ActionType.UPDATE_PALETTE_FOODNAME]: (payload, _) =>
    `Updated a palette name to '${payload.name}'`,
  [ActionType.SPLIT_EVENLY]: (_, paletteName) =>
    `Applied even splitting to '${paletteName}'`,
  [ActionType.RESET_PALETTE_DEFAULT_PRICE]: (_, paletteName) =>
    `Applied default price to '${paletteName}'`,
  [ActionType.CLEAR_PALETTE_PARTICIPANTS]: (_, paletteName) =>
    `Cleared participants from '${paletteName}'`,
  [ActionType.SCAN_RECEIPT_ACTION]: (_, __) => `Scan and parsed a receipt`,
};

export function getMessage(action: Action, palette?: { name: string }) {
  const { type, payload } = action;
  const paletteName = palette ? palette.name : undefined;
  const messageGenerator = messageMap[type];

  if (messageGenerator) {
    return messageGenerator(payload, paletteName);
  } else {
    return 'Unhandled action';
  }
}
