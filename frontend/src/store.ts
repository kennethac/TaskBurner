import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import RootStore from '@/models/root-store';
import ClassInfo from '@/models/class-info';
import Task from '@/models/task'
import IProject from '../../shared/models/IProject';

Vue.use(Vuex)

export default new Vuex.Store({
  state: <RootStore>{
    classData: {
      /* No initial classes */
    },
    classList: []
  },
  mutations: {
    setClassInfo(state: RootStore, payload: { classKey: string, classInfo: ClassInfo }) {
      console.log("Setting!");
      if (state.classData.hasOwnProperty(payload.classKey) && state.classData[payload.classKey].lastUpdated === payload.classInfo.lastUpdated) {
        console.log("Quitting");
        return;
      }
      else {
        console.log("Not quitting.");
        try {
          console.log(state.classData[payload.classKey].lastUpdated + " vs " + payload.classInfo.lastUpdated);
        } catch (error) {
          console.log(error);
        }
      }

      // Set all dates to be dates.
      for (let index in payload.classInfo.tasks) {
        console.log(index);
        payload.classInfo.tasks[index] = Task.from(payload.classInfo.tasks[index]);
      }

      Vue.set(state.classData, payload.classKey, payload.classInfo);
    },

    setLoading(state: RootStore, payload: { classKey: string, loading: boolean }) {
      if (!state.classData.hasOwnProperty(payload.classKey)) {
        Vue.set(state.classData, payload.classKey, <ClassInfo>{});
      }

      if (!state.classData[payload.classKey].hasOwnProperty("loading")) {
        state.classData[payload.classKey] = { ...state.classData[payload.classKey], loading: payload.loading };
      } else {
        state.classData[payload.classKey].loading = payload.loading;
      }
    },

    addTask(state: RootStore, payload: { classKey: string, task: Task }) {
      console.log(payload);
      if (state.classData[payload.classKey].tasks === undefined) {
        state.classData[payload.classKey].tasks = [payload.task];
      } else {
        state.classData[payload.classKey].tasks.splice(0, 0, payload.task);
      }
    },

    setClassList(state: RootStore, payload: { classList: IProject[] }) {
      state.classList = payload.classList;
    },
  },
  actions: {
    async update(context, classKey) {
      let commit = context.commit;

      console.log("Update with: " + classKey);
      let url = process.env.VUE_APP_TASKS_ENDPOINT;


      commit("setLoading", {
        classKey, loading: true
      });

      var response = await fetch(url + classKey);

      if (!response.ok) {
        // Handle error.
        console.error("Failed fetch!");
      }

      var result = await response.json();

      commit('setClassInfo', {
        classKey, classInfo: result
      });

      commit("setLoading", {
        classKey, loading: false
      });
    },
    async getClassList({ commit }) {
      let url = process.env.VUE_APP_TASKS_ENDPOINT;

      var response = await fetch(url);
      
      if (!response.ok) {
        console.error("Failed to fetch class list.");
      }

      var result = await response.json();
      console.log(result);
      commit('setClassList', {classList: result});
    }

  },
  // This is "computed" for Vuex Store.
  getters: {
    getClass: (state: RootStore) => (classKey: string) => {
      if (classKey === "all") {
        console.log("All tasks.");
        let data = <ClassInfo>{};
        data.name = "All Tasks";
        data.loading = false;
        data.tasks = [];
        let allProjects = state.classData;
        Object.keys(allProjects).map((k) => allProjects[k]).forEach((next) => data.tasks = data.tasks.concat(next.tasks));
        return data;
      }

      let data = state.classData[classKey];
      if (data === undefined) {
        data = <ClassInfo>{};
      }
      return data;
    },
    getClasses: (state: RootStore) => () => {
      try {
        return state.classList.map(i => i.shortName);
      } catch (err) {
        return [];
      }
    }
  }
})
