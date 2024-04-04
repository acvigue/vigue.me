<template>
  <NavBar />
  <div class="min-w-screen min-h-screen z-0 bg-champagne">
    <div id="smooth-wrapper">
      <div id="smooth-content" class="bg-champagne pt-20 pb-8">
        <slot />
        <Footer />
      </div>
    </div>
  </div>

  <MouseFollower />
</template>
