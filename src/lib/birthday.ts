export const pages = [
  { path: '/', label: 'Welcome', title: 'Hey, Suhani!' },
  { path: '/secret-pin', label: 'Our little secret', title: 'A little secret, just for us' },
  { path: '/magical-gift', label: 'A little magic', title: 'Something special for you' },
  { path: '/birthday', label: 'Happy birthday', title: 'Happy 24th, Suhani!' },
  { path: '/her-gallery', label: 'Beautiful you', title: 'My favorite kind of beautiful' },
  { path: '/every-mood', label: 'Every little mood', title: 'A little love for every mood' },
  { path: '/my-letter', label: 'From my heart', title: 'My Letter to You ❤️' },
  { path: '/our-gallery', label: 'Our little world', title: 'You, me & a little magic' },
  { path: '/seven-reasons', label: 'Seven reasons', title: 'Seven reasons. One you.' },
  { path: '/birthday-puzzle', label: 'One last little thing', title: 'Piece together the surprise' },
  { path: '/final-surprise', label: 'Always, you', title: 'My favorite place is beside you' },
] as const;
export const BIRTHDAY_TARGET = '2027-10-14T00:00:00+05:30';
export function validPin(pin: string) { return pin === '143'; }
export function countdown(now: number) {
  const seconds = Math.max(0, Math.floor((Date.parse(BIRTHDAY_TARGET) - now) / 1000));
  return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
}
export const solvedBoard = [1, 2, 3, 4, 5, 6, 7, 8, 0];
export function isSolved(board: number[]) { return board.length === 9 && board.every((value, i) => value === solvedBoard[i]); }
export function moveTile(board: number[], index: number): number[] {
  const empty = board.indexOf(0);
  const adjacent = Math.abs(Math.floor(index / 3) - Math.floor(empty / 3)) + Math.abs(index % 3 - empty % 3) === 1;
  if (!adjacent || index < 0 || index > 8) return board;
  const next = [...board];
  const tile = next[index];
  const blank = next[empty];
  if (tile === undefined || blank === undefined) return board;
  next[index] = blank;
  next[empty] = tile;
  return next;
}
export function shuffleBoard(random: () => number = Math.random, steps = 12) {
  let board = [...solvedBoard];
  let previous = -1;
  for (let step = 0; step < steps; step++) {
    const empty = board.indexOf(0);
    const options = board.map((_, index) => index).filter(index => index !== previous && moveTile(board, index) !== board);
    const pick = options[Math.floor(random() * options.length)] ?? options[0];
    if (pick === undefined) continue;
    board = moveTile(board, pick);
    previous = empty;
  }
  return isSolved(board) ? moveTile(board, 7) : board;
}
export function pageHead(index: number) {
  const page = pages[index] ?? pages[0];
  const title = `${page.label} · For Suhani, with love`;
  const description = `A birthday surprise for Suhani Jain’s 24th birthday, October 14, 2026. ${page.title}.`;
  return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
