export class SanitizeInput {
  sanitizeInput(input: string) {
    return input.replace(/[;'"\\]/g, '');
  }
}
