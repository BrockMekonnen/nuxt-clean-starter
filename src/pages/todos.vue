<template>
  <TodoListPage />
</template>

<script setup lang="ts">
import TodoListPage from '@modules/todo/features/list/page/todo_list_page.vue'
import { TODO_NAV_TAB } from '@modules/todo/todo_nav'

definePageMeta({
  layout: 'app',
  middleware: 'auth',
  navTab: TODO_NAV_TAB.list,
  appTitle: 'todoPage.title',
  requiresAuth: true
})
</script>
