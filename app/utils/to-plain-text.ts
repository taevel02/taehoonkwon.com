export function toPlainText(html: string) {
  return html
    .replace(/<[^>]*>?/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function clamp(text: string, maxLength: number = 500) {
  return text.length > maxLength ? text.slice(0, maxLength - 1) + "..." : text;
}
