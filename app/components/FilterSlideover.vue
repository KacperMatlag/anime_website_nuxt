<script setup lang="ts">
const { dropDownLists, urlParams, updateRoute } = useFilterData()
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
        class="flex flex-col gap-2 w-full"
        :ui="{
          content: 'max-h-50 overflow-auto no-scrollbar'
        }"
      >
        <UButton
          label="Kategorie"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          block
        />

        <template #content>
          <UCheckboxGroup
            v-model="urlParams.genres"
            :items="dropDownLists.genres"
          />
        </template>
      </UCollapsible>
      <UCollapsible
        class="flex flex-col gap-2 w-full"
        default-open
      >
        <UButton
          label="Typ"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          block
        />

        <template #content>
          <URadioGroup
            v-model="urlParams.type"
            :items="dropDownLists.types"
          />
        </template>
      </UCollapsible>
      <UCollapsible
        class="flex flex-col gap-2 w-full"
        default-open
      >
        <UButton
          label="Rating"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          block
        />

        <template #content>
          <URadioGroup
            v-model="urlParams.rating"
            :items="dropDownLists.ratings"
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
