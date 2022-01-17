<template>
  <div>
    <header>
      Vuex Task Management
    </header>
    <main>
      <p class="info-line">All: 0 tasks</p>
      <div class="list-index">
        <list
          v-for="(item, index) in lists"
          :key="item.id"
          :title="item.title"
          :listIndex="index" />
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
  computed: {
    // オブジェクトスプレット演算子でmapStateヘルパー関数を呼び出す
    ...mapState([
      'lists'
    ]),
  },
}
</script>

<style>

</style>