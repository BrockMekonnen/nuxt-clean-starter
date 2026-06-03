<template>
  <div class="mx-auto w-full max-w-lg">
    <div
      class="rounded-2xl border border-border/10 bg-surface/30 p-6 shadow-sm md:bg-surface/50"
    >
      <h1 class="text-xl font-semibold">{{ t('todoPage.title') }}</h1>
      <p class="mt-1 text-sm text-muted">{{ t('todoPage.subtitle') }}</p>

      <form class="mt-6 flex gap-2" @submit.prevent="onAdd">
        <input
          v-model="newTitle"
          type="text"
          :placeholder="t('todoPage.placeholder')"
          class="min-w-0 flex-1 rounded-lg border border-border/20 bg-bg/50 px-3 py-2 text-text outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          class="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:brightness-105 disabled:opacity-50"
          :disabled="isLoading"
        >
          {{ t('todoPage.add') }}
        </button>
      </form>

      <p v-if="isLoading && !items.length" class="mt-6 text-sm text-muted">
        {{ t('todoPage.loading') }}
      </p>

      <ul v-else-if="items.length" class="mt-6 space-y-2">
        <li
          v-for="todo in items"
          :key="todo.id"
          class="flex items-center gap-3 rounded-lg border border-border/15 bg-bg/40 px-3 py-2"
        >
          <input
            type="checkbox"
            :checked="todo.completed"
            class="h-4 w-4 rounded border-border text-primary"
            @change="onToggle(todo.id)"
          />
          <span
            class="min-w-0 flex-1 text-sm"
            :class="{ 'text-muted line-through': todo.completed }"
          >
            {{ todo.title }}
          </span>
          <button
            type="button"
            class="text-xs text-muted transition hover:text-red-400"
            @click="onRemove(todo.id)"
          >
            {{ t('todoPage.remove') }}
          </button>
        </li>
      </ul>

      <p v-else class="mt-6 text-sm text-muted">{{ t('todoPage.empty') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { failureMessage } from '@core/error/failures'

const { t } = useI18n()
const notify = useAppNotification()
const { items, isLoading, fetchTodos, addTodo, toggleTodo, removeTodo } =
  useTodo()

const newTitle = ref('')

function showTodoError(err: unknown) {
  notify.showError({
    title: t('notifications.todoErrorTitle'),
    description: failureMessage(err)
  })
}

onMounted(() => {
  void fetchTodos().catch(showTodoError)
})

async function onAdd() {
  const title = newTitle.value.trim()
  if (!title) return
  try {
    await addTodo(title)
    newTitle.value = ''
  } catch (err) {
    showTodoError(err)
  }
}

async function onToggle(id: string) {
  try {
    await toggleTodo(id)
  } catch (err) {
    showTodoError(err)
  }
}

async function onRemove(id: string) {
  try {
    await removeTodo(id)
  } catch (err) {
    showTodoError(err)
  }
}
</script>
