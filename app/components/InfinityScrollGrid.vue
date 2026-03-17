<script setup lang="ts" generic="T">
const { items, loadMoreIf = true, rootMargin = '200px' } = defineProps<{
  items: T[] | undefined
  loadMoreIf?: boolean
  rootMargin?: string
}>()

const emit = defineEmits(['loadMore'])

const loadMoreTrigger = ref<HTMLElement | null>(null)

useIntersectionObserver(
  loadMoreTrigger,
  ([entry]) => {
    if (entry?.isIntersecting && loadMoreIf) {
      emit('loadMore')
    }
  },
  {
    rootMargin
  }
)
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2">
    <slot
      v-for="(item, index) in items"
      :key="index"
      :item="item"
    />
    <div
      ref="loadMoreTrigger"
      class="col-span-full h-full"
    />
  </div>
</template>
