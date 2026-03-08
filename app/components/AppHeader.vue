<template>
  <UHeader
    ref="headerRef"
    title="tytul"
  >
    <template #right>
      <UButton
        icon="material-symbols:search"
        variant="ghost"
        to="/search"
      />

      <UColorModeButton />
    </template>
  </UHeader>
</template>
