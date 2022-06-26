import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    blogs: [{
        id: 1,
        title: "Blog 1",
        content: "Donec ac orci elementum, imperdiet risus eu, blandit eros. Vivamus vel nulla commodo, tristique lacus eget, ultricies diam. Aliquam vitae lorem leo. ",
        date: new Date(),
    }],
    comments: [{
        id: 1,
        name: "Rashiq Rahman",
        content: "Donec ac orci imperdiet risus eu, blandit eros. Vivamus vel nulla commodo, ",
        date: new Date(),
        blog_id: 1,
        comment_id: null,
        type: 'comment',
    },
    {
        id: 2,
        name: "HomeLander",
        content: "Donec ac orci imperdiet risus eu ",
        date: new Date(),
        blog_id: 1,
        comment_id: 1,
        type: 'reply',
    },],
    selectedBlog: null,
}

export const blogSlice = createSlice({
    name: 'blogs',
    initialState: localStorage.getItem('globalState') ? JSON.parse(localStorage.getItem('globalState')) : initialState,
    reducers: {
        createBlog: (state, action) => {
            state.blogs.push(action.payload);
            localStorage.setItem('globalState',JSON.stringify(state));
        },
        selectBlog: (state, action) => {
            state.selectedBlog = { ...action.payload };
            localStorage.setItem('globalState',JSON.stringify(state));
        },
        addComment: (state, action) => {
            state.comments.push(action.payload);
            localStorage.setItem('globalState',JSON.stringify(state));
        }
    }
})

export const { createBlog, selectBlog, addComment } = blogSlice.actions;

export default blogSlice.reducer;