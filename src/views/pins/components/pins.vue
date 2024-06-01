<template>
  <div class="fixed left-0 top-0 w-screen h-screen text-xl bg-slate-500 z-20">
    {{ id }}
    <m-navbar>测试</m-navbar>
  </div>
</template>
<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>
