<script setup lang="ts">
const { filterMap, urlParams, updateRoute } = useFilterData()
</script>

<template>
  <USlideover
    title="Filtry"
    :ui="{
      body: 'flex flex-col gap-2'
    }"
  >
    <UButton
      label="Filtry"
      color="neutral"
      variant="subtle"
      class="fixed right-10 bottom-10"
    />
    <template #body>
      <UCollapsible
        v-for="(filter, index) in filterMap"
        :key="index"
      >
        <UButton
          :label="filter.header"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          block
        />
        <template
          #content
        >
          <UCheckboxGroup
            v-if="!filter.single"
            v-model="urlParams[filter.vmodel] as string[]"
            :ui="{ fieldset: 'my-2', root: 'max-h-50 overflow-y-auto' }"
            :items="filter.items"
          />
          <URadioGroup
            v-else
            v-model="urlParams[filter.vmodel] as string"
            :items="filter.items"
            :ui="{ fieldset: 'my-2', root: 'max-h-50 overflow-y-auto' }"
          />
        </template>
      </UCollapsible>
    </template>
    <template #footer>
      <UButton
        class="w-full"
        :ui="{ base: 'flex flex-1 justify-center' }"
        @click="updateRoute"
      >
        Szukaj
      </UButton>
    </template>
  </USlideover>
</template>
