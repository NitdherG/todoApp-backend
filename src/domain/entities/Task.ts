export class Task {
  constructor(
    public id: string,
    public name: string,
    public completed: boolean = false,
    public createdAt: Date = new Date()
  ) {}
}
