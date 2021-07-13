<template>
    <main class="main">
        <div class="blog">        
                <h2 class="main-heading">{{ content.title }}</h2>
                <div v-html="$md.render(content.body)"></div>        
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        const content = await $content("blogs", params.slug)
        .fetch();

        console.log("content = ", content);

        return {
            content
        }
    }
}
</script>

<style scoped>
    
</style>