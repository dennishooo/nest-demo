export class CreateUserCommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}
}
