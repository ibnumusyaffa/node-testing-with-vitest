export type User = {
  id: string;
  name: string;
  email: string;
};

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
