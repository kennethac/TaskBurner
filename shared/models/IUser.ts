export default interface IUser {
  id?: any;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  tokens: string[];
}