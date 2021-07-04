export const state = () => ({
    blogPosts: []
});

export const mutations = {
    setBlogPosts(state, blogposts) {
        state.blogPosts = blogposts;
    }
}

