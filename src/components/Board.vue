<template>
  <div>
    <header>
      Vuex Task Manager
    </header>
    <main>
      <p class="info-line">All: {{ totalCardCount }} tasks</p>
      <draggable :list="lists" @end="saveList" class="list-index">
        <list
          v-for="(item, index) in lists"
          :key="item.id"
          :title="item.title"
          :cards="item.cards"
          :listIndex="index"
          @change="saveList" />
      <list-add />
      </draggable>
    </main>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import ListAdd from './ListAdd.vue'
import List from './List'
import { mapState } from 'vuex'
export default {
  components: { Draggable, ListAdd, List },
  methods: {
    saveList() {
      this.$store.dispatch('updateList', {lists: this.lists})
    },
  },
  computed: {
    // オブジェクトスプレット演算子でmapStateヘルパー関数を呼び出す
    ...mapState([
      'lists'
    ]),
    totalCardCount() {
      return this.$store.getters.totalCardCount
    }
  },
}
</script>

<style>

</style>