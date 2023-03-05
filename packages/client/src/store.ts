import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";

export interface State {
  user:
    | {
        email: string;
        username: string;
        created: Date;
      }
    | false;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state() {
    return {
      user: false,
    };
  },
  mutations: {
    setUser(
      state,
      user:
        | {
            email: string;
            username: string;
            created: Date;
          }
        | false
    ) {
      state.user = user;
    },
  },
});
