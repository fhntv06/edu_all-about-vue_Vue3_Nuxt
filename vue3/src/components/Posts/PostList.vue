<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Список постов</h2>
    <TransitionGroup name="list" tag="ul" v-if="posts.length">
      <post-item v-for="post in posts" :key="post.id" :post="post" @deletePost="deletePost" />
    </TransitionGroup>
    <h3 v-else>Список постов пуст</h3>
  </div>
</template>

<script>
import PostItem from "@/components/Posts/PostItem.vue";

export default {
  components: {PostItem},
  props: {
    posts: { type: Array, default: [] }
  },
  methods: {
    deletePost(post) {
      this.$emit('deletePost', post)
    }
  }
}
</script>
<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
