export function sanitizeUnicode(text: string): string {
  if (!text || typeof text !== "string") return text;

  return (
    text
      // Remove lone surrogate escape sequences
      .replace(/\\u[dD][89aAbBcCdDeEfF][0-9a-fA-F]{2}(?!\\u[dD][c-fC-F][0-9a-fA-F]{2})/g, "")
      // Remove malformed unicode escapes (incomplete)
      .replace(/\\u[0-9a-fA-F]{0,3}(?![0-9a-fA-F])/g, "")
      // Remove null bytes
      .replace(/\0/g, "")
      // Remove other problematic control characters
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
      // Replace Unicode replacement character
      .replace(/\uFFFD/g, "")
  );
}
