<template>
  <form :class="classList" @submit.prevent="addList">
    <input
      v-model="title"
      type="text"
      class="text-input"
      placeholder="Add new list"
      @focusin="startEditing"
      @focusout="finishEditing">

    <button
      type="submit"
      class="add-button"
      v-if="isEditing || titleExists">
    Add
    </button>

  </form>
</template>

<script>
export default {
  data(){
    return {
      title: '',
      isEditing: false,
    }
  },
  methods: {
    addList(){
      //this.$store.dispath('アクション名', オブジェクト型)
      this.$store.dispatch('addList', { title: this.title })
      this.title = ''
    },
    startEditing() {
      this.isEditing = true
    },
    finishEditing() {
      this.isEditing = false
    }
  },
  computed: {
    classList(){
      const classList = ['addList']
      // 編集中にフォームを白地にする
      if (this.isEditing) {
        classList.push('active')
      }
      // 投稿可能ならbtnを緑地にする
      if (this.titleExists) {
        classList.push('addable')
      }
      return classList
    },
    titleExists(){
      return this.title.length > 0
    },
  }
}
</script>

<style>

</style>