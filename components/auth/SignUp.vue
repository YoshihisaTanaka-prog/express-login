<template>
  <div>
    <h1>Sign up</h1>
    <form onsubmit="return false">
      <p class="center">
        <input
          v-model="name"
          placeholder="名前"
          name="name"
          autocomplete="username"
        />
      </p>
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
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="パスワード（確認用）"
          name="confirm-password"
          autocomplete="off" 
        />
      </p>
      <p class="center">
        <button @click="signup">Sign up</button>
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
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const signup = async () => {
    if([name.value, email.value, password.value, confirmPassword.value].includes("")){
      alert('すべての項目を入力してください');
    } else if(password.value != confirmPassword.value) {
      alert('パスワードが一致していません');
      password.value = '';
      confirmPassword.value = '';
    } else {
      try {
        const response = await axios.post('/sign-up', {
          name: name.value,
          email: email.value,
          password: password.value
        });
        localStorage.setItem('token', response.data.token); // JWTを保存
        window.location.reload(); // 成功時にページリロード
      } catch (error) {
        alert('ログインに失敗しました');
        window.location.reload(); // 失敗時にページリロード
      }
    }
  };
</script>