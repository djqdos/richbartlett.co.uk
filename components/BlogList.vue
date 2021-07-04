<template>
    <div>
        <div v-for="(article, index) in articles" :key="index" class="blog-item">
            {{ article.title }}
        </div>
    </div>
</template>

<script>
export default {
    name: "BlogList",
    props: ['articles']
}
</script>

<style scoped>
    .blog-item {
        padding-bottom: 30px;
    }
</style>