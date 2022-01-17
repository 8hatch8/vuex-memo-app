<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <div class="deletelist" @click="removeList" >x</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    listIndex: {
      type: Number,
      required: true
    },
  },
  methods: {
    removeList() {
      if (confirm('リストを削除しますか？')) {
        this.$store.dispatch('removeList', { listIndex: this.listIndex })
      }
    },
  }
}
</script>

<style>

</style>