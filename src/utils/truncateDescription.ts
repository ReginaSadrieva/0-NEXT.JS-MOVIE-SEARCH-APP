// Utility function to truncate movie description without cutting off words.
// Takes the full text and max length, appends '...' if truncated.
export function truncateDescription(text: string, maxLength: number = 350): string {
  if (text.length <= maxLength) {
    return text;
  }
  // Find the last space before maxLength to avoid cutting words.
  const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
  return `${text.substring(0, lastSpaceIndex)}...`;
}
