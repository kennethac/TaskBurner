import { Dictionary } from 'vue-router/types/router';
import Project from './project';
import IProject from '../../../shared/models/IProject';
import IUser from '../../../shared/dist/models/IUser';

export default interface RootStore {
    user?: IUser;
    classData : Dictionary<Project>;
    classList: IProject[];
}