<template>
    <section class="hero">
        <div class="page-max">
            <h1 class="main-heading">HELLO</h1>
            <div class="flex flex-1 justify-center items-center" v-if="selectedWork">
                <div class="hero-grid">                            
                        <div class="left">                    
                            <div class="screenshot">
                                <div class="innerLeft">
                                    <img :src="selectedWork.image" :alt="selectedWork.title"/>                                                
                                </div>              
                            </div>      
                        </div>

                        <div class="right">
                            <div class="inner">
                                <h2>{{ selectedWork.title }}</h2>

                                <ul class="tags">
                                    <li v-for="tag in selectedWork.tags" :key="tag">
                                        {{ tag }}
                                    </li>
                                </ul>

                                <div class="body" v-html="$md.render(selectedWork.body)" />

                                <a :href="selectedWork.url" class="visit">Visit Site</a>
                            </div>
                        </div>

                        <div class="works">
                            <div v-for="(work, index) in works" :key="index" class="works-item">
                                <img :src="work.image" :alt="work.title" @click="showWork(index)"/>
                            </div>
                        </div>
                </div>
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
            colors: [
                '14,70,83',
                '1,117,192',
                '150,155,158',
                '96,51,81',
                '1,117,192',
                '215,28,40',
                '1,117,192',
                '255,88,0',
            ]        
        }
    },

    async created() {         
        let bp;        
        bp = await this.$nuxt.context.$content("work")
             .fetch();                  
        this.works = bp;
        this.selectedWork = bp[0];    
    },

    mounted() {
        setTimeout(() => {                
            this.anim();
        }, 400);    
    },

    methods: {
        showWork(index) {
            this.selectedWork = this.works[index];
            this.anim(index);
        },
        anim(index) {
            const anime = this.$anime;
            const duration = 400;
            const translateLength = 500;            
            const selectedCol = this.colors[index];

            anime({
                targets: 'h2',
                translateX: [translateLength, 0],
                opacity: [0, 1],                
                duration: duration,
                easing: 'linear'
            });

            anime({
                targets: '.tags',
                opacity: [0, 1],
                translateX: [translateLength, 0],
                duration: duration,
                //delay: 150,
                easing: 'linear'
            });  
            anime({
                targets: '.body',
                opacity: [0, 1],
                translateX: [translateLength, 0],
                duration: duration,
                //delay: 450,
                easing: 'linear'
            });       

            anime({
                targets: '.visit',
                opacity: [0, 1],
                translateX: [translateLength, 0],
                duration: duration,
                //delay: 600,
                easing: 'linear'
            });   

            anime({
                targets: '.screenshot',
                opacity: [0, 1],
                translateX: [-translateLength, 0],
                duration: duration,
                delay: 0,
                easing: 'linear'
            });     

            if(selectedCol) {
                console.log("selectedCol = ", selectedCol);
                anime({
                    targets: '.hero',                
                    duration: 10,
                    delay: 0,
                    easing: 'linear',
                    begin: function(anim) {
                        const el = document.querySelector(".hero");
                        el.style.backgroundImage = `linear-gradient(160deg, rgba(0,0,0,0), rgba(0,0,0,1))`;
                    },
                    complete: function(anim) {
                        const el = document.querySelector(".hero");
                        const c = `linear-gradient(160deg, rgba(${selectedCol}, 0), rgba(${selectedCol}, 1))`;
                        console.log("c = ", c);
                        el.style.backgroundImage = c;
                        el.style.opacity = 1;                        
                        console.log("end col = ", el.style.backgroundImage);
                    }                
                });     
            }                        
        }
    }
}
</script>

<style scoped>
    .hero {
        @apply h-screen pt-20;        
        background: linear-gradient(to bottom, rgba(76,76,76,1) 0%,rgba(89,89,89,1) 12%,rgba(102,102,102,1) 25%,rgba(71,71,71,1) 39%,rgba(44,44,44,1) 50%,rgba(0,0,0,1) 51%,rgba(17,17,17,1) 60%,rgba(43,43,43,1) 76%,rgba(28,28,28,1) 91%,rgba(19,19,19,1) 100%); 
        /* background: linear-gradient(160deg, rgba(14,70,83,0), rgba(14,70,83,1)); */
        /* background: linear-gradient(160deg, rgba(255,88,0, 0), rgba(255,88,0, 1)); */
        background: linear-gradient(160deg, rgba(1,117,192, 0), rgba(1,117,192, 1));
        background: linear-gradient(160deg, rgba(96,51,81, 0), rgba(96,51,81, 1));
        
        
    }

    .hero-grid {
        @apply grid grid-cols-12 gap-4 mt-20;;
    }

    .left {
        @apply flex flex-grow items-center justify-center col-span-8        
    }

    .right {
        @apply col-span-4;
    }

    .screenshot {
        @apply opacity-0;
        perspective: 400px;
        perspective-origin: left;
        
    }

    .innerLeft {
        @apply rounded relative;        
        border: 2px solid white;
        transition: all 300ms ease-in-out;                
        transform: rotateY(10deg) scale(0.9);
        transform-style: preserve-3d;
        box-shadow: 
            0px 3px 0px 2px white, 
            -1px 5px 0px 0px white, 
            -20px 17px 20px 0px black;    
        
    }

    .innerLeft img {
        @apply w-full object-fill;
    }

    .title {
        @apply absolute text-3xl;
        bottom: 8px;
        left: 40px;
        z-index: 10;        
        font-weight: bold;
    }

    .title::after {
        position: absolute;
        left: 0;
        bottom: 20%;
        /* transform: translateY(-20%); */
        z-index: -1;
        content: '';
        height: 10px;
        background-color: red;
        width: 100%;
    }

    h2 {
        @apply pb-4 mb-4;
        opacity: 0;
    }

    .tags {
        @apply list-none pb-3;
        opacity: 0;
    }

    .tags li {
        @apply inline-block mr-4 mb-4 p-3;
        background-color: var(--accent-color);
        border-radius: 10px;
    }

    .body {
        opacity: 0;
    }

    .visit {
        @apply inline-block mr-4 mb-4 p-3;
        background-color: var(--accent-color);
        border-radius: 10px;
        opacity: 0;
    }

    .works {
        @apply mt-20 col-span-8;
    }

    .works-item {
        @apply inline-block p-4 cursor-pointer;
    }

    .works img {                
        width: 80px;
        height: 80px;
    }

</style>