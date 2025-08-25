import http from '@/utils/http';
import type { MutationTree, ActionTree, GetterTree } from 'vuex';
import type { State } from '../index';

export interface ChecksState {}

const state: ChecksState = {};

const mutations: MutationTree<ChecksState> = {};
const actions: ActionTree<ChecksState, State> = {
  login() {
    return http.post('/users/login');
  },
};
const getters: GetterTree<ChecksState, State> = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
