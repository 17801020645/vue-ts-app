import http from '@/utils/http';
import type { MutationTree, ActionTree, GetterTree } from 'vuex';
import type { State } from '../index';

export interface UsersState {
  token: string;
}

const state: UsersState = {
  token: '',
};

const mutations: MutationTree<UsersState> = {
  updateToken(state, payload) {
    state.token = payload;
  },
};
const actions: ActionTree<UsersState, State> = {
  login(context, payload) {
    return http.post('/users/login', payload);
  },
};
const getters: GetterTree<UsersState, State> = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
