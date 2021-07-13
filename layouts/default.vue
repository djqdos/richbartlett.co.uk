<template>
    <div class="containing-element">
        <Header class="header"  />        
        <Nuxt />
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .containing-element {

        @apply lg:grid grid-cols-1 min-h-screen;
        @apply lg:grid-cols-12        
    }

    .header {
        @apply md:col-span-1;
        @apply lg:col-span-3;
        
        background: var(--accent-color);
    }

    .main {
        @apply col-span-1;
        @apply lg:col-span-9
    }
</style>