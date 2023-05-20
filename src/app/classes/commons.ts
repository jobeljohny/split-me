export function randomBetween(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const profileSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      hue: { type: 'number' },
      name: { type: 'string' },
    },
    required: ['hue', 'name'],
  },
};
