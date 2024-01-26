export const shortcuts: Map<string, string> = new Map<string, string>([
  ['Alt + P', 'Add new profile'],
  ['Alt + F', 'Add food palette'],
  ['Alt + H', 'Open help page'],
]);

export enum pages {
  About = 'About',
  Help = 'Help',
  KeyboardShortcuts = 'Keyboard shortcuts',
  ReleaseNotes = 'Release notes',
}
