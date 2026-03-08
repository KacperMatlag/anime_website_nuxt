<script setup lang="ts">
defineProps<{ quantity: number }>()
</script>

<template>
  <div
    v-for="_ in quantity"
    :key="_"
    class="flex flex-col aspect-9/16 min-w-0 w-[180px]"
  >
    <div class="overflow-hidden rounded-xl flex-8">
      <USkeleton class="w-full h-full max-h-full max-w-full object-cover" />
    </div>
    <div class="flex flex-col flex-1 mt-2">
      <USkeleton class="text-sm truncate" />
      <div class="flex flex-col gap-1">
        <USkeleton class="text-xs w-[100px] h-[10px]" />
        <USkeleton class="text-xs w-[70px] h-[10px]" />
      </div>
    </div>
  </div>
</template>
