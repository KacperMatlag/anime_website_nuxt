<template>
  <UFooter>
    <template #left>
      <p>Copyright © {{ new Date().getFullYear() }}</p>
    </template>
    <template #right>
      <div>
        <ULink to="https://github.com/KacperMatlag/anime_website_nuxt">
          <UIcon name="mdi:github" />
        </ULink>
      </div>
    </template>
  </UFooter>
</template>
