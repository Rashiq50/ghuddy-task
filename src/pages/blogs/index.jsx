import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createBlog, selectBlog } from '../../features/blogs/blogSlice';
import './index.css';
function BlogsIndex() {
    const { blogs } = useSelector((state) => state.blogs);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const addPost = () => {
        if (title.length > 0 && content.length > 0) {            
            dispatch(createBlog({
                id: Math.floor(Math.random() * 9999),
                title,
                content,
                date: new Date(),
                comments: [
                    {
                        replies: [],
                    }
                ],
            }));
        }
        else{
            alert("Please fill up all the fields!")
        }
    }

    const dispatchSelectBlog = (blog)=>{
        dispatch(selectBlog(blog));
        setTitle("");
        setContent("");
    }

    return (
        <div className='pt-5'>
            <div className='d-flex align-items-center'>
                <h2 className='text-center'>Blogs</h2>
                <div style={{ flex: '1 1 auto' }}></div>
                <button className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#addPostModal">Add new post</button>
            </div>
            <hr />
            <div className='row justify-content-start'>
                {blogs.map((blog) => (
                    <div key={blog.id} className="col-md-3 col-sm-4 py-2">
                        <Link onClick={()=>dispatchSelectBlog(blog)} to={`/blogs/${blog.id}`}>
                            <div className='card shadow blogIndexCard'>
                                <div className="card-body position-relative p-0 overflow-hidden">
                                    <img className='blogIndexImage' src={`https://picsum.photos/300?random=${blog.id}`} />
                                    <div className='cardIndexContent'>
                                        <div>
                                            <h4 className="card-title"> { (blog.title.length > 30) ? blog.title.slice(0,30) + '...' : blog.title} </h4>
                                            <p className="card-text"> { (blog.content.length > 200) ? blog.content.slice(0,200)+'...' : blog.content} </p>
                                        </div>
                                        <div style={{ flex: '1 1 auto' }}></div>
                                        <h6> {new Date(blog.date).toDateString()} </h6>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>


            <div className="modal fade" id="addPostModal" tabIndex="-1" aria-labelledby="addPostModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content p-2">
                        <div className='text-end'>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h4>Create post</h4>
                            <hr />
                            <div>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Post Title</label>
                                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="form-control" id="title" placeholder="Enter the title" />
                                </div>
                                <div className="mb-3">
                                    <label for="content" className="form-label">Post content</label>
                                    <textarea value={content} onChange={e => setContent(e.target.value)} type="text" className="form-control" id="content" placeholder="Write something..." />
                                </div>
                            </div>
                            <hr />
                            <div className='w-100 text-center'>
                                <button onClick={addPost} className='btn btn-primary'>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogsIndex;