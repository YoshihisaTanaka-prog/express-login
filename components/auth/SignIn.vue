<template>
  <div>
    <h1>Sign in</h1>
    <form onsubmit="return false">
      <p class="center">
        <input
          type="email"
          v-model="email"
          placeholder="メールアドレス"
          name="email"
          autocomplete="off" 
        />
      </p>
      <p class="center">
        <input
          v-model="password"
          type="password"
          placeholder="パスワード"
          name="password"
          autocomplete="off" 
        />
      </p>
      <p class="center">
        <button @click="signin">Sign in</button>
      </p>
    </form>
  </div>
</template>

<style scoped>
  h1 {
    text-align: center;
  }
  .center {
    text-align: center;
  }
  button {
    background-color: #04a0fb;
    color: #004;
    font-weight: bolder;
    border: 0.2rem solid #00f;
    border-radius: 0.4rem;
  }
  button:hover {
    background-color: #4cf;
  }
</style>

<script setup lang="ts">
  import axios from 'axios';
  import { ref } from 'vue';

  const email = ref('');
  const password = ref('');

  const signin = async () => {
    if([email.value, password.value].includes("")){
      alert('メールアドレスとパスワードを入力してください');
    } else {
      try {
        const response = await axios.post('/sign-in', {
          email: email.value,
          password: password.value
        });
        localStorage.setItem('token', response.data.token); // JWTを保存
        window.location.reload(); // 成功時にページリロード
      } catch (_) {
        alert('ログインに失敗しました');
        window.location.reload(); // 失敗時にページリロード
      }
    }
  };
</script>