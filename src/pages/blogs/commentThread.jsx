
function CommentThread({ parent, setReplyStatus, setCommentToReply, }) {
    return (
        <div className=''>
            <div className="card p-3 my-3 w-100">
                <div className='d-flex align-items-center py-2'>
                    <div className='commentThumb'>
                        <img src={`https://picsum.photos/200?random=${parent?.id}`} />
                    </div>
                    <div className='ms-3'>
                        <h4 className='fw-bold'>
                            {parent.name} <span> <button onClick={()=>{setReplyStatus(true);setCommentToReply(parent)}} className='btn btn-sm btn-link'>Reply</button> </span>
                        </h4>
                        <h5> {new Date(parent.date).toLocaleString()} </h5>
                    </div>
                </div>
                <div className='p-2 rounded bg-light h6'>
                    {parent.content}
                </div>
            </div>
            <div className='d-flex flex-column align-items-end'>
                {parent.replies?.map((reply) => (
                    <div key={reply.id} style={{ width: '90%', minWidth: '400px' }}>
                        <CommentThread parent={reply} setCommentToReply={setCommentToReply} setReplyStatus={setReplyStatus} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentThread;