<template>
    <main class="main">
        <div class="blog">        
                <h2 class="main-heading">{{ content.title }}</h2>
                <div v-html="$md.render(content.body)"></div>                        
        </div>
    </main>
</template>

<script>

import "prismjs/components/prism-javascript"

import "prismjs/components/prism-csharp"

export default {
    async asyncData({ $content, params }) {
        const content = await $content("blogs", params.slug)
        .fetch();

        return {
            content
        }
    },

    mounted() {
        const pres = document.querySelectorAll("pre");
        pres.forEach(item => {
            item.classList.add("line-numbers");
            // item.classList.add("language-html");
            //  item.classList.add("language-csharp");
        })        

        
    },    
}
</script>

<style scoped>
    
</style>