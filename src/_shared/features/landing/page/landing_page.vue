<template>
  <div class="mx-auto w-full max-w-4xl px-2 pb-16 pt-2">
    <h1 class="text-center text-3xl font-bold text-primary md:text-4xl">
      {{ t('landingPage.welcomeTo') }} Nuxt Clean Starter
    </h1>

    <p class="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted">
      {{ t('landingPage.paragraph1') }}
    </p>

    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <NuxtLink
        to="/login"
        class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:brightness-105"
      >
        {{ t('loginPage.signIn') }}
      </NuxtLink>
      <NuxtLink
        to="/register"
        class="inline-flex items-center gap-2 rounded-xl border border-border/15 bg-surface px-5 py-2.5 text-sm font-semibold text-text hover:border-border/25"
      >
        {{ t('registerPage.signUp') }}
      </NuxtLink>
    </div>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <section class="rounded-2xl border border-border/10 bg-surface/20 p-5">
        <h2 class="text-lg font-bold">{{ t('landingPage.featuresTitle') }}</h2>
        <p class="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">
          {{ t('landingPage.featuresDetails') }}
        </p>
      </section>

      <section class="rounded-2xl border border-border/10 bg-surface/20 p-5">
        <h2 class="text-lg font-bold">{{ t('landingPage.techStackTitle') }}</h2>
        <p class="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">
          {{ t('landingPage.techStackDetails') }}
        </p>
      </section>
    </div>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <section class="rounded-2xl border border-border/10 bg-surface/20 p-5">
        <h2 class="text-lg font-bold">{{ t('landingPage.structureTitle') }}</h2>
        <p class="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">
          {{ t('landingPage.structureDetails') }}
        </p>
      </section>

      <section class="rounded-2xl border border-border/10 bg-surface/20 p-5">
        <h2 class="text-lg font-bold">{{ t('landingPage.gettingStartedTitle') }}</h2>
        <p class="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">
          {{ t('landingPage.gettingStartedDetails') }}
        </p>
      </section>
    </div>

    <p class="mx-auto mt-10 max-w-2xl text-center text-base text-muted">
      {{ t('landingPage.paragraph2') }}
    </p>

    <div class="mt-6 flex justify-center">
      <a
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:brightness-105"
      >
        <span aria-hidden="true">&lt;/&gt;</span>
        {{ t('landingPage.viewOnGithub') }}
      </a>
    </div>

    <h2 class="mt-10 text-center text-xl font-bold">
      {{ t('landingPage.contributionsWelcome') }}
    </h2>
    <p class="mx-auto mt-3 max-w-2xl whitespace-pre-line text-center text-muted">
      {{ t('landingPage.paragraph3') }}
    </p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const githubUrl = 'https://github.com/BrockMekonnen/nuxt-clean-starter'
</script>
