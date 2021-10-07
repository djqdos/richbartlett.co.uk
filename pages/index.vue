<template>
    <main class="main">
        <div class="container">
            <div class="hero">
                <div v-html="$md.render(content.body)" class="home-content">

                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        const content = await $content("home")
        .fetch();

        return {
            content
        }
    },
}
</script>

<style scoped>
    main {
        background-color: rgba(255, 255, 255, .5);
    }

    .test {
        color: white;
        font-size: 3em;
        padding: 1em;
        background-color: red;
    }
</style>
