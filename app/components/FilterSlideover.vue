<script setup lang="ts">
const { dropdownLists, filterQueries } = useFilterData()
const { updateRoute, urlParams } = useQueryFilters()

const scrollToTop = () => {
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
const isSlideoverOpen = ref(false)
</script>

<template>
  <div>
    <UButton
      label="Filtry"
      color="neutral"
      variant="subtle"
      class="fixed right-10 bottom-10"
      @click="isSlideoverOpen=true"
    />

    <USlideover
      v-model:open="isSlideoverOpen"
      description="Wybierz kryteria wyszukiwania."
      title="Filtry"
      :ui="{
        body: 'flex flex-col gap-2'
      }"
    >
      <template #body>
        <UCollapsible
          v-for="filter in dropdownLists"
          :key="filter?.header"
          :ui="{
            content: 'overflow-hidden transition-[height] duration-300 ease-out'
          }"
        >
          <UButton
            size="xl"
            :label="filter?.header"
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-chevron-down"
            block
          />
          <template
            #content
          >
            <div
              v-if="keyType.isMulti(filter!.key)"
              class="flex flex-col"
            >
              <UInput
                v-model="filterQueries[filter!.key]"
                size="lg"
                class="mt-2"
                variant="soft"
                placeholder="Kategoria"
              >
                <template
                  #trailing
                >
                  <UButton
                    v-show="filterQueries[filter!.key].length>0"
                    mcolor="neutral"
                    variant="link"
                    size="sm"
                    icon="i-lucide-circle-x"
                    aria-label="Clear input"
                    @click="filterQueries[filter!.key]=''"
                  />
                </template>
              </UInput>
              <UCheckboxGroup
                v-model="(urlParams[filter!.key])"
                :items="filter!.items"
                class="my-2"
                size="xl"
                :ui="{ root: 'max-h-50 h-50 overflow-y-auto' }"
              />
            </div>
            <URadioGroup
              v-else
              v-model="(urlParams[filter!.key])"
              size="xl"
              :items="filter!.items"
              :ui="{
                fieldset: 'my-2'
              }"
            />
          </template>
        </UCollapsible>
      </template>
      <template #footer>
        <UButton
          class="w-full"
          :ui="{ base: 'flex flex-1 justify-center' }"
          @click="() => {
            updateRoute()
            scrollToTop()
            isSlideoverOpen=false
          }"
        >
          Szukaj
        </UButton>
      </template>
    </USlideover>
  </div>
</template>
