<template>
  <div
    aria-hidden="true"
    class="locale-gate fixed inset-0 z-50 overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-white"
  >
    <div class="mx-auto flex w-full max-w-5xl animate-pulse flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="flex flex-col gap-2.5">
          <div class="h-8 w-52 rounded-lg bg-slate-200 sm:h-9 sm:w-64"></div>
          <div class="h-4 w-72 rounded bg-slate-200 sm:w-96"></div>
        </div>
        <div class="h-9 w-40 rounded-md bg-slate-200"></div>
      </div>

      <div class="h-[52px] rounded-2xl bg-slate-200"></div>

      <div class="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
        <div class="h-44 rounded-2xl bg-slate-200"></div>
        <div class="h-44 rounded-2xl bg-slate-200"></div>
        <div class="h-44 rounded-2xl bg-slate-200"></div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="h-4 w-full rounded bg-slate-200"></div>
        <div class="h-4 w-2/3 rounded bg-slate-200"></div>
      </div>
    </div>
  </div>
</template>
