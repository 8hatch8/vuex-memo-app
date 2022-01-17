<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <p class="list-counter">total: {{ totalCardInList }}</p>
      <div class="deletelist" @click="removeList" >x</div>
    </div>
    <draggable group="cards" :list="cards" @end="$emit('change')">
      <card
        v-for="(item, index) in cards"
        :body="item.body"
        :key="item.id"
        :cardIndex="index"
        :listIndex="listIndex"
      />
    </draggable>
    <card-add :listIndex="listIndex" />
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import CardAdd from './CardAdd.vue'
import Card from './Card.vue'
export default {
  components: {
    Draggable, CardAdd, Card
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    listIndex: {
      type: Number,
      required: true
    },
    cards: {
      type: Array,
      required: true
    },
  },
  methods: {
    removeList() {
      if (confirm('リストを削除しますか？')) {
        this.$store.dispatch('removeList', { listIndex: this.listIndex })
      }
    },
  },
  computed: {
    totalCardInList() {
      return this.cards.length
    }
  }
}
</script>

<style>

</style>