export class UserCreatedEvent {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}

  // nestjs would automatically call this method in emit event
  toString() {
    return JSON.stringify({
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }
}
