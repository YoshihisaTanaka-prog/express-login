<template>
  <p>
    <button :class="isSignIn? 'selected-btn': ''" @click="()=>{emits('changeStatus', true)}">Sign in</button>&nbsp;
    <button :class="isSignIn? '': 'selected-btn'" @click="()=>{emits('changeStatus', false)}">Sign up</button>
  </p>
</template>

<style scoped>
  p {
    text-align:center;
  }
  button {
    border-radius: 0.4rem;
    font-weight: bolder;
    border: 0.2rem solid #f00;
    color: #f00;
  }
  button:hover {
    background-color: #e7919e33;
  }
  .selected-btn {
    color: #400;
    background-color: #e7919eff;
  }
  .selected-btn:hover {
    background-color: #e7919ecc;
  }
</style>

<script setup lang="ts">
  import { defineEmits, defineProps } from 'vue';
  defineProps({
    isSignIn: {type: Boolean, required: true},
  });
  const emits = defineEmits<{
    (event: "changeStatus", isSignIn:boolean): void,
  }>();
</script>