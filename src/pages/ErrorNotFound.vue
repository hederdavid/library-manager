<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="not-found-code">404</div>

      <div class="text-h2 not-found-message">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found-code {
  font-size: 30vh;
}

.not-found-message {
  opacity: 0.4;
}
</style>
