<script setup lang="ts">
const { filterMap, urlParams, updateRoute } = useFilterData()

const filters = ref<{ [T in keyof typeof urlParams.value]?: string }>({
  genres: ''
})
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
        v-for="(filter) in filterMap"
        :key="filter.vmodel"
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
          <div
            v-if="!filter.single"
            class="flex flex-col"
          >
            <UInput
              v-model="filters.genres"
              size="sm"
              variant="soft"
              class="py-3"
              placeholder="Kategoria"
            >
              <template
                v-if="filters.genres?.length"
                #trailing
              >
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  icon="i-lucide-circle-x"
                  aria-label="Clear input"
                  @click="filters.genres=''"
                />
              </template>
            </UInput>
            <UCheckboxGroup
              v-model="urlParams[filter.vmodel] as string[]"
              :ui="{ fieldset: 'my-2', root: 'h-50 max-h-50 overflow-y-auto' }"
              :items="filter.items.filter(z => z.label.toLocaleLowerCase().includes(filters[filter.vmodel]!.toLocaleLowerCase()))"
            />
          </div>
          <URadioGroup
            v-else
            v-model="urlParams[filter.vmodel] as string"
            :items="filter.items"
            :ui="{ fieldset: 'my-2', root: 'h-50 max-h-50 overflow-y-auto' }"
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
