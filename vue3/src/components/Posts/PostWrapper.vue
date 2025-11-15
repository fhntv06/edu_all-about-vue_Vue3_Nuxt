<template>
  <div class="p-6">
    <!-- Кнопка открытия модального окна -->
    <div class="flex justify-between max-w-6xl mx-auto mb-6">
      <button
        @click="showModal"
        class="h-max bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Добавить пост
      </button>
      <Filter
        :label="'Фильтр постов'"
        :data="posts"
        @filterChange="handleFilterChange"
      />
    </div>

    <loader :isLoading="isLoading" />

    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <post-list :posts="posts" @deletePost="deletePost" />
    </div>

    <modal
      :isOpen="isModalOpen"
      title="Создать новый пост"
      @close="isModalOpen = false"
    >
      <post-form @createPost="handleCreatePost" />
    </modal>
  </div>
</template>

<script>
import { ref } from "vue";
import PostForm from "@/components/Posts/PostForm.vue";
import PostList from "@/components/Posts/PostList.vue";
import Loader from "@/components/UI/Loader.vue";
import PostFilter from "@/components/UI/Filter.vue";

export default {
  components: {
    PostFilter,
    Loader,
    PostList,
    PostForm,
  },
  data() {
    return {
      url: 'http://localhost:8888/posts',
      isModalOpen: false,
      isLoading: false,
    }
  },
  setup() {
    const posts = ref([])
    return {posts}
  },
  mounted() {
    this.isLoading = true

    setTimeout(() => {
      this.getPosts()
    }, 1000)
  },
  methods: {
    handleFilterChange(filteredPosts) {
      this.posts = filteredPosts
    },
    showModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
    handleCreatePost(post) {
      this.createPost(post)
      this.isModalOpen = false // Закрываем модальное окно после создания
    },
    createPost(post) {
      this.isLoading = true
      const id = Date.now().toString()
      const postDate = new Date()

      fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
          id,
          date: `${postDate.getDate()}.${postDate.getMonth() + 1}.${postDate.getFullYear()}`
        })
      })
        .then((response) => {
          if (response.ok) {
            alert(`Post with id="${id}" created!`)
            this.getPosts()
          } else {
            throw new Error(`Error request by create post with id="${id}"`)
          }
        })
        .catch((error) => console.error(error))
    },
    getPosts() {
      fetch(this.url)
        .then((response) => {
          if (response.ok) return response.json()
          else throw new Error(`Status getPosts is ${response.status}`)
        })
        .then((data) => {
          this.posts = data // Убрал .value, так как используем Options API
        })
        .catch((error) => console.error('Error get posts ', error))
        .finally(() => {
          this.isLoading = false
        })
    },
    deletePost(post) {
      this.isLoading = true

      fetch(`${this.url}/${post.id}`, {method: 'DELETE'})
        .then((response) => {
          if (response.ok) {
            alert(`Post with id="${post.id}" deleted!`)
            this.getPosts()
          } else {
            throw new Error(`Status not ok, in deletePost! Status deletePost is ${response.status}`)
          }
        })
        .catch((e) => console.error(`Error delete post with id="${post.id}", ${e}`))
    }
  },
}
</script>
