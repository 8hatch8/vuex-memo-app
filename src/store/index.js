import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedLists = localStorage.getItem('trello-lists')

const store = new Vuex.Store({
  state: {
    // localStorageは文字列型で保存されるので、取得データをJSON形式に変換
    lists: savedLists ? JSON.parse(savedLists): [
      //三項演算子：取得データがなければ以下のデフォルトを表示
      {
        title: 'Backlog',
        cards: [
          { body: 'English' },
          { body: 'Math' },
        ]
      },
      {
        title: 'Todo',
        cards: [
          { body: 'Science'}
        ]
      },
      {
        title: 'Doing',
        cards: []
      }
    ],
  },
  mutations: {
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards: [] })
    },
  },
  actions: {
    addlist(context, payload) {
      context.commit('addlist', payload)
    },
  },
  getters: {

  },
  modules: { //ストアインスタンスを分割して管理する場合に使用
  }
})

// データを更新後、localStorageにハッシュ（key, value）を文字列型で保存
// subscribeはストアのインスタンスメソッドで、mutationの後に呼ばれる
store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

export default store