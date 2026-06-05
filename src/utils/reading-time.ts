const WORDS_PER_MINUTE = 200;

export function getReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / WORDS_PER_MINUTE);
}
