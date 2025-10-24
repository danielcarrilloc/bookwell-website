<template>
  <section class="space-y-10">
    <div class="grid lg:grid-cols-2 gap-8 items-center">
      <div>
        <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight font-display">Run your studio with clarity</h1>
        <p class="mt-3 text-slate-600 dark:text-zinc-300">Bookings, credits, and clients — in one calm, modern tool.</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <router-link to="/auth/register" class="h-10 px-4 rounded-md bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90">Start Free</router-link>
          <router-link to="/auth/login" class="h-10 px-4 rounded-md border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900">Book a Demo</router-link>
        </div>
      </div>
      <div class="rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop" alt="Studio" class="w-full h-72 object-cover">
      </div>
    </div>

    <div class="grid sm:grid-cols-3 gap-4">
      <div class="rounded-lg border border-slate-200 dark:border-zinc-800 p-4">
        <div class="text-sm text-slate-600 dark:text-zinc-300">Bookings</div>
        <div class="mt-1 text-lg font-medium tracking-tight">Smart calendar</div>
      </div>
      <div class="rounded-lg border border-slate-200 dark:border-zinc-800 p-4">
        <div class="text-sm text-slate-600 dark:text-zinc-300">Credits</div>
        <div class="mt-1 text-lg font-medium tracking-tight">Flexible packs</div>
      </div>
      <div class="rounded-lg border border-slate-200 dark:border-zinc-800 p-4">
        <div class="text-sm text-slate-600 dark:text-zinc-300">Clients</div>
        <div class="mt-1 text-lg font-medium tracking-tight">Profiles & notes</div>
      </div>
    </div>

    <div class="rounded-xl border border-slate-200 dark:border-zinc-800">
      <div class="p-4 border-b border-slate-200 dark:border-zinc-800 font-medium">Pricing</div>
      <div class="p-4 grid sm:grid-cols-2 gap-4">
        <div class="rounded-lg border border-slate-200 dark:border-zinc-800 p-4">
          <div class="text-sm text-slate-600 dark:text-zinc-300">Freemium</div>
          <div class="mt-2 text-3xl font-semibold">Free</div>
          <ul class="mt-3 space-y-2 text-sm text-slate-600 dark:text-zinc-300">
            <li class="flex items-center gap-2">
              <i data-lucide="check" class="h-4 w-4 text-emerald-500"></i>
              Up to 50 clients
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="check" class="h-4 w-4 text-emerald-500"></i>
              10 classes / month
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="check" class="h-4 w-4 text-emerald-500"></i>
              Community support
            </li>
          </ul>
          <button class="mt-5 w-full h-9 rounded-md border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900">Start</button>
        </div>
        <div class="rounded-lg border border-slate-200 dark:border-zinc-800 p-4">
          <div class="text-sm text-slate-600 dark:text-zinc-300">Pro</div>
          <div class="mt-2 text-3xl font-semibold">$19<span class="text-base font-normal text-slate-500 dark:text-zinc-400">/mo</span></div>
          <ul class="mt-3 space-y-2 text-sm text-slate-600 dark:text-zinc-300">
            <li class="flex items-center gap-2">
              <i data-lucide="check" class="h-4 w-4 text-emerald-500"></i>
              Unlimited clients
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="check" class="h-4 w-4 text-emerald-500"></i>
              Unlimited classes
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="check" class="h-4 w-4 text-emerald-500"></i>
              Priority support
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="check" class="h-4 w-4 text-emerald-500"></i>
              Payments & credits
            </li>
          </ul>
          <button class="mt-5 w-full h-9 rounded-md bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90">Upgrade</button>
        </div>
      </div>
    </div>
  </section>
</template>