import http from '@/utils/http';
import type { MutationTree, ActionTree, GetterTree } from 'vuex';
import type { State } from '../index';

export interface SignsState {}

const state: SignsState = {};

const mutations: MutationTree<SignsState> = {};
const actions: ActionTree<SignsState, State> = {
  login() {
    return http.post('/users/login');
  },
};
const getters: GetterTree<SignsState, State> = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
