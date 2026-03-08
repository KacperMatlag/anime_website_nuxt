<script setup lang="ts"></script>

<template>
  <div>
    <CardsCarousel
      query="order_by=score&sort=desc"
      :header="{
        title: 'Top',
        description: 'Najwyżej oceniane'
      }"
    />

    <CardsCarousel
      query="order_by=popularity"
      :header="{
        title: 'Popularne',
        description: 'popularne serie'
      }"
    />
  </div>
</template>
