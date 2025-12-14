<template>
  <div class="bg-white shadow rounded-lg">
    <div class="p-5">
      <div class="flex flex-wrap gap-y-3 items-center justify-between mb-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">Мировое время</h3>
            <p class="text-sm text-gray-500">Время в разных городах</p>
          </div>
        </div>
        <Select
          :label="'Выбор города'"
          :options="cities"
          @changeValue="handleChangeCity"
        />
      </div>
      <div v-if="isLoading" class="mt-4 flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
      <div  v-else class="mt-4">
        <div class="text-2xl font-bold text-gray-900">{{ worldTime }}</div>
        <div class="text-lg text-gray-600 mt-1">{{ worldDate }}</div>
        <div class="text-sm text-gray-500 mt-2 flex items-center">
          <span class="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
          {{ selectedCityLabel }}
        </div>
        <div class="text-xs text-gray-400 mt-1">{{ timezoneInfo }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { CITIES } from '@/config/constants.js'
import { useGeolocation } from '@/composables/useGeolocation'

export default {
  name: 'WorldTimeWidget',
  data() {
    return {
      interval: null,
      userCity: null
    }
  },
  setup() {
    const
      { userCity, isLoading } = useGeolocation(),
      worldTime = ref(''),
      worldDate = ref(''),
      timezoneInfo = ref(''),
      cities = ref(CITIES)

    return {
      userCity, isLoading,
      worldTime, worldDate, timezoneInfo,
      cities
    }
  },
  computed: {
    selectedCityLabel() {
      const { label, country, timezone } = this.userCity.value

      this.timezoneInfo = timezone

      return this.selectedCity ? `${label}, ${country}` : ''
    }
  },
  methods: {
    handleChangeCity(value) {
      this.selectedCity.value = this.cities.find(city => city.value === value) ||
        this.userCity ||
        this.cities[0]
    },
    updateTime() {
      const now = new Date()
      this.worldTime = now.toLocaleTimeString('ru-RU', {
        timeZone: this.userCity.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })

      this.worldDate = now.toLocaleDateString('ru-RU', {
        timeZone: this.userCity.timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  watch: {
    selectedCityId() {
      this.updateTime()
    },
    isLoading(newIsLoading) {
      if (!newIsLoading && this.userCity) {
        this.updateTime()
        this.interval = setInterval(this.updateTime, 1000)
      }
    },
  },
  unmounted() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
}
</script>
