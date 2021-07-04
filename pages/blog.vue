<template>
    <section class="blog">
        <div class="page-max">
            <h2 class="main-heading">Blog</h2>
            <div class="blog-container">
                <div class="col-span-9">                    
                    <BlogList :articles="filtered" />
                </div>
                <div class="col-span-3">
                    <div class="filter-container">
                        <div class="filter-item" 
                            v-for="(tag, index) in tags" 
                            :key="index"
                            @click="toggleTag($event)"
                            >
                        {{ tag }}
                        </div>
                    </div>             
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import BlogList from '@/components/BlogList.vue'

export default {
    data() {
        return {
            selectedTags: [],
            tags: this.getTags
        }
    },

    async asyncData( {$content} ) {
        const blogPosts = await $content("blogs")
        .fetch();
        
        return { 
            blogPosts        
        }
    },

    mounted() {        
        this.tags = this.getTags(this.blogPosts);        
    },

    computed: {
        filtered() {
            if(this.selectedTags.length === 0) {
                return this.blogPosts;
            }
            else {
                return this.blogPosts.filter(x => x.tags.every(i => this.selectedTags.includes(i)));
            }
        }
    },
    
    methods: {
        toggleTag(event) {
            event.preventDefault();
            const element = event.target;
            const tag = event.target.textContent.trim();
            //this.filteredBlogPosts = this.blogPosts.filter(x => x.tags.includes(tag));
            if(!this.selectedTags.includes(tag)) {
                element.classList.add("selectedTag");                
                this.selectedTags.push(tag);
            } 
            else {
                element.classList.remove("selectedTag");                
                this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
            }
        },
        getTags(blogPosts) {            
            let tmp = []
            const tags = [...new Set(blogPosts.map(x => x.tags))]
            
            tags.forEach(t => {
                t.forEach(x => {                    
                    tmp.push(x);
                })
            })
            const uniqueTags = [...new Set(tmp)];
            return uniqueTags;
        }        
    },

    components: {
        BlogList
    }
}
</script>

<style scoped>
    .blog {
        @apply pt-20;
        background: linear-gradient(160deg, rgba(14,70,83,0), rgba(14,70,83,1));
        background: linear-gradient(160deg, rgb(255,88,0, 0), rgb(255,88,0,1));
    }

    .blog-container {
        @apply grid grid-cols-12 gap-4; 
    }


    .filter-container {
        @apply flex space-x-2 space-y-2 flex-wrap justify-end items-end;
    }

    .filter-item {
        @apply py-2 px-2 shadow-sm rounded-sm cursor-pointer;
        background-color: red;
    }

    .selectedTag {
        outline: 2px solid var(--tmp);
    }

</style>