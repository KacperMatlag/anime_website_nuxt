<script setup lang="ts">
const { activeFilters, getFilterContext } = useFilterData()
const { urlParams, updateRoute } = useQueryFilters()

const removeFromFilter = (item: { key: string, value: string }) => {
  const ctx = getFilterContext(item.key)
  if (!ctx) return

  if (ctx.type === 'multi') {
    urlParams.value[ctx.key] = ctx.value.filter(v => v !== item.value)
  } else {
    urlParams.value[ctx.key] = ''
  }
  updateRoute()
}
</script>

<template>
  <div class="flex flex-1 flex-wrap gap-2">
    <UBadge
      v-for="item in activeFilters.filter(z => z.value)"
      :key="`${item.key}-${item.value}`"
    >
      <label>{{ item.label }}</label>
      <UButton
        icon="ic:baseline-clear"
        size="sm"
        @click="removeFromFilter(item)"
      />
    </UBadge>
  </div>
</template>
