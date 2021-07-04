<template>
    <header>
        <div class="logo">
            Logo
        </div>

        <nav>
            <nuxt-link to="/blog">Blog</nuxt-link>
            <a href="#">Item 1</a>
            <a href="#">Item 1</a>
            <a href="#">Item 1</a>
            <a href="#">Item 1</a>
        </nav>
    </header>    
</template>

<script>
export default {
    
}
</script>

<style scoped>
    header {
        @apply absolute w-full flex justify-between top-0 left-0 p-6;
    }
</style>