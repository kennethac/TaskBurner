import { Dictionary } from 'vue-router/types/router';
import Project from './project';
import IProject from '../../../shared/models/IProject';

export default interface RootStore {
    classData : Dictionary<Project>;
    classList: IProject[];
}