import { Dictionary } from 'vue-router/types/router';
import ClassInfo from './class-info';
import IProject from '../../../shared/models/IProject';

export default interface RootStore {
    classData : Dictionary<ClassInfo>;
    classList: IProject[];
}