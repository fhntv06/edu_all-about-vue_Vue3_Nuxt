<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Список постов</h2>
    <div v-if="posts.length" v-for="post in posts">
      <post-item :key="post.id" :post="post" @deletePost="deletePost" />
    </div>
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
