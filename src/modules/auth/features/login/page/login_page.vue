<template>
  <section class="card">
    <h1 class="title">Login</h1>
    <p class="muted">
      Demo flow wired to <code>POST {{ apiBase }}/auth/login</code>.
    </p>

    <form class="form" @submit.prevent="onSubmit">
      <label class="label">
        Email
        <input v-model="email" class="input" type="email" autocomplete="email" />
      </label>

      <label class="label">
        Password
        <input
          v-model="password"
          class="input"
          type="password"
          autocomplete="current-password"
        />
      </label>

      <button class="btn" :disabled="isLoading">
        {{ isLoading ? 'Signing in…' : 'Sign in' }}
      </button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>

    <div v-if="session" class="panel">
      <div class="muted">Signed in as</div>
      <div class="mono">{{ session.user.email }}</div>
      <div class="mono small">token: {{ session.token }}</div>
      <button class="ghost" type="button" @click="logout">Logout</button>
    </div>
  </section>
</template>

<script setup lang="ts">
const email = ref('demo@acme.com')
const password = ref('password')

const { public: publicConfig } = useRuntimeConfig()
const apiBase = computed(() => publicConfig.apiBase)

const { session, isLoading, errorMessage, login, logout } = useAuth()

async function onSubmit() {
  await login(email.value, password.value)
}
</script>

<style scoped>
.card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 22px;
}
.title {
  font-size: 24px;
  margin: 0 0 8px;
}
.muted {
  opacity: 0.85;
  margin: 0 0 16px;
}
.form {
  display: grid;
  gap: 12px;
  max-width: 420px;
}
.label {
  display: grid;
  gap: 6px;
  font-weight: 600;
}
.input {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.18);
  color: inherit;
  outline: none;
}
.input:focus {
  border-color: rgba(79, 70, 229, 0.8);
}
.btn {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #4f46e5;
  color: white;
  font-weight: 700;
  cursor: pointer;
}
.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.error {
  color: #fecaca;
  margin: 0;
}
.panel {
  margin-top: 18px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.15);
}
.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
}
.small {
  font-size: 12px;
  opacity: 0.85;
}
.ghost {
  margin-top: 12px;
  padding: 8px 10px;
  border-radius: 12px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: inherit;
  font-weight: 700;
  cursor: pointer;
}
</style>

