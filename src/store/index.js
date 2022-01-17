import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedLists = localStorage.getItem('trello-lists')

const store = new Vuex.Store({
  state: {
    // localStorageは文字列型で保存されるので、取得データをJSON形式に変換
    lists:  
      // 三項演算子
      savedLists ? JSON.parse(savedLists): [
        // ローカルストレージのデータ（savedLists）がなければ以下のデフォルトを返す
        {
          title: 'Backlog',
          cards: [ { body: 'English' }, { body: 'Math' }, ]
        },
        {
          title: 'Todo',
          cards: [ { body: 'Science'} ]
        },
        {
          title: 'Doing',
          cards: []
        }
      ],
  },
  mutations: { // stateを変更する
    addList(state, payload) {
      state.lists.push({ title: payload.title, cards: [] })
    },
    removeList(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    },
    addCardToList(state, payload) {
      state.lists[ payload.listIndex ].cards.push({ body: payload.body })
    },
    removeCardFromList(state, payload) {
      state.lists[ payload.listIndex ].cards.splice(payload.cardIndex, 1)
    }
  },
  actions: { // 非同期処理や外部APIとの通信を実行後、ミューテーションを呼び出す（context.commit）
    addList(ctx, payload) {
      ctx.commit('addList', payload)
    },
    removeList(ctx,payload) {
      ctx.commit('removeList', payload)
    },
    addCardToList(ctx, payload) {
      ctx.commit('addCardToList', payload)
    },
    removeCardFromList(ctx, payload) {
      ctx.commit('removeCardFromList', payload)
    }
  },
  getters: {
    totalCardCount(state) {
      let count = 0
      state.lists.map(list => count += list.cards.length)
      return count
    }
  },
  modules: { //ストアインスタンスを分割して管理する場合に使用
  }
})

// subscribeはストアのインスタンスメソッドで、mutationの後に呼ばれる
store.subscribe((mutation, state) => {
  // データを更新後、localStorageにハッシュ（key, value）を文字列型で保存
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

export default store