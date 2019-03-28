export default interface IUser {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  tokens: string[] = [];
}