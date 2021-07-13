<template>
    <section class="hero">
            <h1 class="main-heading">Portfolio</h1>
            
            <div class="grouped" v-for="(work, index) in works" :key="index">
                <div class="title">
                    <div class="w-full">{{work.title}}</div>
                </div>
                <div class="content-block">
                    <div class="content">                        
                        <img :src="work.image" :alt="work.title" />
                        <div v-html="$md.render(work.body)"></div>
                    </div>
                    <span class="text-xs">Technologies</span>
                    <ul>
                        <li class="tag" v-for="(tag, index) in work.tags" :key="index">
                            {{ tag }}
                        </li>
                    </ul>
                </div>
            </div>            
    </section>    
</template>

<script>
export default {
    name: "SampleWork",
    data() {
        return {
            works: [],
            selectedWork: null,      
        }
    },

    async created() {         
        let bp;        
        bp = await this.$nuxt.context.$content("work")
            .where({ showonsite: { $eq: true} }) 
            .fetch();                  
        this.works = bp;
        this.selectedWork = bp[0];    
    },


}
</script>

<style scoped>

    .grouped {
        @apply md:flex;
    }

    .title {                
        @apply font-bold mx-auto;
        @apply md:pb-8 md:border-r-gray-400 md:w-40 md:font-normal md:border-r-[1px];
    }

    .title > div {
        @apply flex items-center justify-center text-xl mb-2;
        @apply md:pr-10 md:relative md:text-base italic md:justify-start md:items-start;
    }

    .title > div::after {
        @apply md:absolute md:h-[10px] md:w-[10px] md:right-[-6px] md:top-[5px] md:rounded-full;
        content: '';
        background-color: var(--accent-color);                
    }
    .content-block {
        @apply mb-20;
        @apply md:ml-10 md:mb-5 pb-4 w-full;        
        border-bottom: 1px solid grey;
    }

    .content-block ul {
        @apply mt-2;
    }

    .content-block li {
        @apply inline-block p-1 mr-2 text-xs;
        background-color: var(--accent-color);
        --text-color: white;
        color: var(--text-color);        
    }

    .content {
        @apply mb-6;
    }

    .content-block .content ul {
        background-color: green;
        list-style: disc !important; 
    }

    .content-block .content ul li {                
        @apply inline-block p-1 mr-2 text-xs;
        background-color: var(--accent-color);
        --text-color: white;
        color: var(--text-color);   
    }    

    .content img {
        @apply w-full mb-5;
        @apply md:float-right md:w-1/2 md:p-2;        
    }
</style>