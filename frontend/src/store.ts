import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import RootStore from '@/models/root-store';
import Project from '@/models/project';
import Task from '@/models/task'
import IProject from '../../shared/models/IProject';
import IUser from '../../shared/dist/models/IUser';
import { register } from 'register-service-worker';

Vue.use(Vuex)

export default new Vuex.Store({
  state: <RootStore>{
    user: undefined,
    classData: {
      /* No initial classes */
    },
    classList: []
  },
  mutations: {
    setUser(state: RootStore, payload: IUser) {
      state.user = payload;
    },
    setClassInfo(state: RootStore, payload: { classKey: string, classInfo: Project }) {
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
        Vue.set(state.classData, payload.classKey, <Project>{});
      }

      if (!state.classData[payload.classKey].hasOwnProperty("loading")) {
        state.classData[payload.classKey] = { ...state.classData[payload.classKey], loading: payload.loading } as Project;
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
    async login(context, payload) {
      const request = await fetch("/users/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (request.status == 403) {
        return (await request.json()).message;
      }

      if (!request.ok) {
        return "All fields are required.";
      }

      const response = await request.json();

      if (response.error) {
        return response.error;
      }

      context.commit("setUser", response.user);
    },
    async logout(context) {
      try {
        const request = await fetch("/users/logout",
          {
            method: "DELETE"
          });
        context.commit('setUser', undefined);
        return "";
      } catch (error) {
        console.log(error);
        return "There was a problem.";
      }
    },
    async register(context, payload) {
      const request = await fetch("/users/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!request.ok) {
        return "All fields are required.";
      }

      const response = await request.json();

      if (response.error) {
        return response.error;
      }

      context.commit("setUser", response.user);
    },
    async getUser(context) {
      const startedLoggedOut = context.state.user == undefined;

      const request = await fetch("/users/");

      if (!request.ok) {
        return "Error with request";
      }

      context.commit("setUser", await request.json());

      if (startedLoggedOut) {
        context.dispatch("getClassList");
      }
      return "";
    },
    async update(context, classKey) {
      let commit = context.commit;

      console.log("Update with: " + classKey);
      let url = "/projects/";


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
      let url = "/projects/";

      var response = await fetch(url);

      if (!response.ok) {
        console.error("Failed to fetch class list.");
      }

      var result = await response.json();
      console.log(result);
      commit('setClassList', { classList: result });
    }

  },
  // This is "computed" for Vuex Store.
  getters: {
    getClass: (state: RootStore) => (classKey: string) => {
      if (classKey === "all") {
        console.log("All tasks.");
        let data = <Project>{};
        data.fullName = "All Tasks";
        data.loading = false;
        data.tasks = [];
        let allProjects = state.classData;
        Object.keys(allProjects).map((k) => allProjects[k]).forEach((next) => data.tasks = data.tasks.concat(next.tasks));
        return data;
      }

      let data = state.classData[classKey];
      if (data === undefined) {
        data = <Project>{};
      }
      return data;
    },
    getClasses: (state: RootStore) => () => {
      try {
        return state.classList.map(i => i.shortName);
      } catch (err) {
        return [];
      }
    },
    getUser: (state: RootStore) => () => {
      return state.user;
    }
  }
})
