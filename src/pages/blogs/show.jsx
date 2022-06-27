import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment } from '../../features/blogs/blogSlice';
import CommentThread from './commentThread';
import './show.css';

function BlogDetails() {
    const { selectedBlog } = useSelector((state) => state.blogs);
    const { comments } = useSelector((state) => state.blogs);

    const commentForThisBlog = comments.filter(el => (el.blog_id === selectedBlog.id)).sort((a, b) => { return new Date(b.date) - new Date(a.date); }).map((element) => { return { ...element, status: 'unmapped' } });

    const commentsAndRepliesMapper = () => {
        const finalData = [];
        for (let i = 0; i < commentForThisBlog.length; i++) {
            const parent = commentForThisBlog[i];
            const replies = [];
            for (let j = 0; j < commentForThisBlog.length; j++) {
                const element = commentForThisBlog[j];
                if (element.id != parent.id && element.status === 'unmapped') {
                    if (element.comment_id === parent.id) {
                        replies.push(element);
                        element.status = "mapped";
                    }
                }
                parent.replies = replies;
            }
            finalData.push(parent);
        }
        return [...finalData.filter(el => el.status != 'mapped')];
    }

    const finalData = commentsAndRepliesMapper();

    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('comment');
    const [commentToReply, setCommentToReply] = useState(null);
    const [replyStatus, setReplyStatus] = useState(false);

    const dispatch = useDispatch();

    const postComment = () => {
        if (name.length > 0 && content.length > 0) {
            dispatch(addComment({
                id: Math.floor(Math.random() * 9999),
                name,
                content,
                type,
                comment_id: commentToReply?.id || null,
                blog_id: selectedBlog.id,
                date: new Date()
            }));
            setReplyStatus(false);
            setCommentToReply(null);
            setType('comment');
            setName("");
            setContent("");
        }
        else {
            alert("Please fill up all the fields!")
        }
    }

    return (
        <div className='pt-5'>
            <div className='d-flex py-2'>
                <Link className='text-decoration-none' to="/">
                    <div >Blogs / </div>
                </Link>
                <div>
                    {selectedBlog.title}
                </div>
            </div>
            <div>
                <div className='blogDetailImageHolder mb-2'>
                    <img className='blogIndexImage' src={`https://picsum.photos/700?random=${selectedBlog?.id}`} />
                </div>

                <h1> {selectedBlog?.title} </h1>

                <div className='py-2'>
                    {selectedBlog?.content}
                </div>
            </div>
            <hr />
            <div className='card p-4'>
                <h3> Enter your comment</h3>
                <div className='card  p-4'>
                    {replyStatus &&
                        <div className='d-flex py-1 align-items-center'>
                            <div className=''>
                                Reply to:
                                <span className='text-dark fw-bold'> {commentToReply?.name} </span>
                            </div>
                            <button onClick={() => { setReplyStatus(false); setCommentToReply(null); setType('comment') }} className='btn btn-sm mx-2 btn-link'> Cancel </button>
                        </div>
                    }
                    <div>
                        <div className="mb-3">
                            <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="title" placeholder="Your name" />
                        </div>
                        <div className="mb-3">
                            <textarea value={content} onChange={e => setContent(e.target.value)} type="text" className="form-control" id="content" placeholder="Write something..." />
                        </div>
                        <div className='w-100 text-end'>
                            <button onClick={postComment} className='btn btn-warning'>Comment</button>
                        </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <h3> {commentForThisBlog?.length}  Comments</h3>
                    <div className='mt-3 ' >
                        {finalData?.map((comment) => (
                            <CommentThread key={comment.id} parent={comment} setCommentToReply={setCommentToReply} setReplyStatus={setReplyStatus} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetails;