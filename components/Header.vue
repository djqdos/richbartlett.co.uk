<template>
    <header>
        <div class="header-inner">
            <div class="logo">
                <nuxt-link to="/">
                    <img src="~assets/img/rb.jpg" alt="Richard Bartlett" />
                </nuxt-link>
                <div class="title">Richard Bartlett</div>
                <div class="subtitle">Web Developer</div>
            </div>

            <nav>
                <nuxt-link to="/portfolio">Portfolio</nuxt-link>
                <nuxt-link to="/blog">Blog</nuxt-link>                
                <nuxt-link to="/contact">Contact</nuxt-link>                
            </nav>
           
        </div>
        <div class="certs">                                
            <img :src="cert.logo" :alt="cert.title" :title="cert.title" v-for="cert in certs" :key="cert.title" />                
        </div> 
    </header>    
</template>

<script>
export default {
    data() {
        return {
            certs: []
        }
    },

    async fetch() {
        this.certs = await this.$content("certifications").fetch();        
    }
}
</script>

<style scoped>
    header {
        --text-color: white;
        @apply block opacity-80 w-full;
        @apply lg:min-h-screen lg:sticky lg:top-0 lg:h-screen;
    }

    .header-inner {        
        @apply p-4;        
        @apply lg:sticky lg:top-0 lg:p-4 lg:h-screen;
    }    

    .logo {
        @apply text-center;
        @apply lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-full;
    }

    .logo img {
        @apply hidden;
        @apply lg:block h-48 w-48 ring-2 ring-white rounded-full mb-5 mt-5; 
    }


    .title {
        --text-color: white;
        color: var(--text-color);
        @apply text-3xl uppercase font-bold text-center;
    }

    .subtitle {
        --text-color: white;
        color: var(--text-color);
        @apply text-xl uppercase font-bold text-center;;
    }


    nav {        
        @apply flex items-center justify-around mt-4;
        @apply lg:block lg:p-4;
    }

    nav a {
        @apply lg:block lg:text-xl lg:p-4 uppercase;
    }


    .certs {
        @apply hidden;
        @apply lg:flex lg:flex-1 lg:justify-center lg:absolute lg:bottom-5 lg:w-full lg:p-2; 
    }

    .certs img {
        @apply inline-block w-24 p-2;

    }
</style>