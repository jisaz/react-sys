/**
* common state 主要处理store中公共的数据
* */

const common = {
  state: {},
  reducers: {
    setState(state, paylod) {
      return { ...state, ...paylod };
    },
  },
  effects: dispatch => ({
    async getCommonData(payload, rootState) {
      try {

      } catch (err) {

      }
    },
  }),
};

export default common;
