<template>
  <div class="w-full sm:w-auto">
    <label for="post-filter" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <select
      id="post-filter"
      :value="value"
      @change="handleChangeValue"
      class="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-700"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: 'Количество записей на странице'
    },
    options: {
      type: Array,
      default: () => [
        { value: 2, label: 'по 2 записи' },
        { value: 5, label: 'по 5 записей' },
        { value: 10, label: 'по 10 записей' },
        { value: 15, label: 'по 15 записей' }
      ]
    },
    selectedValue: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      // Локальное состояние для выбранного значения
      value: this.selectedValue
    }
  },
  methods: {
    handleChangeValue(event) {
      this.value = event.target.value
      this.$emit('changeValue', Number(event.target.value))
    },
  },
}
</script>
