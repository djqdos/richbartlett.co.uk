<template>
    <main class="main">
        <section class="blog">

                <h2 class="main-heading">Blog</h2>
                <div class="blog-container">
                    
                    <div class="grouped" v-for="(group, index) in sortedGroup" :key="index">
                        <div class="year">
                            <div class="w-full">{{group.key}}</div>
                        </div>
                        <div class="content">
                            <div class="article" v-for="(item, index) in group.data" :key="index">
                                <nuxt-link :to="`/blog/${item.slug}`">
                                    <h2>{{ item.title }}</h2>
                                </nuxt-link>
                                <p class="text-sm">{{ item.excerpt }}</p>                            
                            </div>                                        
                        </div>
                    </div>


                </div>
        </section>
    </main>
</template>

<script>
import BlogList from '@/components/BlogList.vue'

export default {

    async asyncData( {$content} ) {
        const blogPosts = await $content("blogs")
        .fetch();
            
        let grouped = blogPosts.reduce((groups, item) => {
            const year = new Date(item.date).getFullYear();               
            const group = (groups[year] || []);
            group.push(item);
            groups[year] = group;            
            return groups;
        }, {});   
        
        let sortedGroup = [];
        Object.keys(grouped)
              .sort()
              .reverse()
              .forEach(key => {
                  sortedGroup.push({
                      'key': key,
                      'data': grouped[key].sort((a,b) => a.date < b.date)
                  })
              });        

        return { 
            blogPosts,
            grouped ,
            sortedGroup       
        }
    },  

}
</script>



<style scoped>
    .blog {        
        /* background: linear-gradient(160deg, rgba(14,70,83,0), rgba(14,70,83,1));        
        background: linear-gradient(160deg, rgb(255,88,0, 0), rgb(255,88,0,1)); */
    }

    .grouped {
        @apply flex;
    }

    .year {        
        border-right: 1px solid;    

        @apply pb-8 border-r-gray-400;
    }

    .year > div {
        @apply pr-10 relative text-base italic;
    }

    .year > div::after {
        content: '';
        height: 10px;
        width: 10px;
        background-color: var(--accent-color);
        border-radius: 50%;
        position: absolute;
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
    }

    .content {
        @apply ml-10 mb-5;
    }

    .article {
        @apply mb-4;
    }


    a {
        @apply text-gray-900 font-bold;
    }

    a:hover {        
        --accent-color: hsl(var(--accent-hue), var(--accent-sat), var(--accent-light));
        color: var(--accent-color);
    }

</style>