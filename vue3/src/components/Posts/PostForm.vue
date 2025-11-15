<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Создать новый пост</h2>

    <form class="space-y-4" id="postForm" ref="refForm" @submit.prevent="createPost">
      <field
        :id="'title'"
        :name="'title'"
        :type="'text'"
        :label="'Название поста *'"
        :placeholder="'Введите название поста...'"
        v-model="post.title"
        :required="true"
      />
      <field
        :id="'author'"
        :name="'author'"
        :type="'text'"
        :label="'Автор *'"
        :placeholder="'Имя автора...'"
        v-model="post.author"
        :required="true"
      />
      <field
        :id="'content'"
        :name="'content'"
        :type="'textarea'"
        :label="'Содержание поста *'"
        :placeholder="'Напишите содержание вашего поста...'"
        v-model="post.content"
        :required="true"
      />

      <div class="flex gap-3">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Создать пост
        </button>
        <button
          type="button"
          class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors"
          @click="resetForm"
        >
          Очистить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import { useTemplateRef } from 'vue'

  export default {
    data() {
      return {
        post: {
          title: '',
          content: '',
          author: '',
        }
      }
    },
    setup() {
      const refForm = useTemplateRef('refForm')

      return { refForm }
    },
    methods: {
      createPost() {
        this.$emit('createPost', this.post)

        this.clearPost()
      },
      clearPost() {
        this.refForm.reset()
        this.post = {
          title: '',
          content: '',
          author: '',
        }
      }
    }
  }
</script>

