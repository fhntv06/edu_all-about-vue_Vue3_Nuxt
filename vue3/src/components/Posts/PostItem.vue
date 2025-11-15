<template>
  <div class="relative w-full min-w-[280px] bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ post.title }}</h2>
    <div class="text-gray-600 mb-4">
      {{ post.content }}
    </div>
    <div class="flex items-center justify-between text-sm text-gray-500">
      <span>Автор: {{ post.author }}</span>
      <span>{{ post.date }}</span>
    </div>
    <button class="absolute top-[12px] right-[12px] text-gray-400 hover:text-red-500 transition-colors group cursor-pointer" @click="deletePost(post)">
      <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      post: {
        type: {
          id: Number,
          author: String,
          title: String,
          content: String,
          date: String
        },
        required: true
      }
    },
    methods: {
      deletePost(post) {
        this.$emit('deletePost', post)
      }
    },
  }
</script>
