<template>
  <div>
    <header>
      Vuex Task Manager
    </header>
    <main>
      <p class="info-line">All: {{ totalCardCount }} tasks</p>
      <div class="list-index">
        <list
          v-for="(item, index) in lists"
          :key="item.id"
          :title="item.title"
          :cards="item.cards"
          :listIndex="index"
          @change="movingCard" />
      <list-add />
      </div>
    </main>
  </div>
</template>

<script>
import ListAdd from './ListAdd.vue'
import List from './List'
import { mapState } from 'vuex'
export default {
  components: { ListAdd, List },
  methods: {
    movingCard() {
      this.$store.dispatch('updateList', {lists: this.lists})
    }
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