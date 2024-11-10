import React, { useState } from 'react';

//A discution board for customers to start a thread and talk about their fav phones and what not

const DiscussionBoard = () => {
  // State for threads and form visibility
  const [threads, setThreads] = useState([]);
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState({});

  // Form states
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [replyContent, setReplyContent] = useState('');

  // Create new thread
  const handleCreateThread = () => {
    if (newThreadTitle.trim() && newThreadContent.trim()) {
      const newThread = {
        id: Date.now(),
        title: newThreadTitle,
        content: newThreadContent,
        timestamp: new Date().toLocaleString(),
        replies: [],
        author: 'User' 
      };

      setThreads([newThread, ...threads]);
      setNewThreadTitle('');
      setNewThreadContent('');
      setShowNewThreadForm(false);
    }
  };

  // Add reply to thread
  const handleAddReply = (threadId) => {
    if (replyContent.trim()) {
      const updatedThreads = threads.map(thread => {
        if (thread.id === threadId) {
          return {
            ...thread,
            replies: [...thread.replies, {
              id: Date.now(),
              content: replyContent,
              timestamp: new Date().toLocaleString(),
              author: 'User' 
            }]
          };
        }
        return thread;
      });

      setThreads(updatedThreads);
      setReplyContent('');
      setShowReplyForm({ ...showReplyForm, [threadId]: false });
    }
  };

  return (
    <div className="container-fluid p-4 border-2 border-dark" style={{minHeight: '100vh',	backgroundColor:'cornsilk'}} >
{/*Setting up phone screen */}
<div
  style={{
    width: '580px',             
    height: '187px',           
    padding: '10px',
    backgroundColor: '#333',    
    borderRadius: '40px',       
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.6)', 
    margin: '0 auto',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }}
>
  {/* Side Notch */}
  <div
    style={{
      width: '20px',
      height: '100px',
      backgroundColor: '#222',
      borderRadius: '10px',
      position: 'absolute',
      left: '10px',               
      top: '50%',
      transform: 'translateY(-50%)',
    }}
  ></div>

  {/* Screen with Header */}
  <div
    style={{
      width: '95%',               
      height: '90%',              
      backgroundColor: '#f5f5f5', 
      borderRadius: '30px',       
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
  >{/*Setting up the heading section */}
    <h1
      style={{
        fontSize: '24px',
        color: '#333',            
        padding: '10px 20px',
        backgroundColor: '#4CAF50', 
        borderRadius: '10px',      
        textAlign: 'center',
        width: '90%',              
      }}
    >
      DISCUSSION BOARD
    </h1>
  </div>
</div>




      {/* New Thread Button */}
      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowNewThreadForm(!showNewThreadForm)}
      >
        <i className="bi bi-plus-circle me-2"></i>
        New Thread
      </button>

      {/* New Thread Form */}
      {showNewThreadForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">Create New Thread</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Thread Title"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
              />
              <textarea
                className="form-control mb-2"
                placeholder="Thread Content"
                value={newThreadContent}
                onChange={(e) => setNewThreadContent(e.target.value)}
                rows={4}
              />
              <button className="btn btn-success" onClick={handleCreateThread}>
                Create Thread
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Threads List */}
      <div className="threads-container">
        {threads.map(thread => (
          <div key={thread.id} className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">{thread.title}</h5>
              <small className="text-muted">
                Posted by {thread.author} on {thread.timestamp}
              </small>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">{thread.content}</p>

              {/* Replies */}
              <div className="ms-4">
                {thread.replies.map(reply => (
                  <div key={reply.id} className="card bg-light mb-2">
                    <div className="card-body py-2">
                      <p className="card-text mb-1">{reply.content}</p>
                      <small className="text-muted">
                        {reply.author} - {reply.timestamp}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Button & Form */}
              <div className="mt-3">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setShowReplyForm({
                    ...showReplyForm,
                    [thread.id]: !showReplyForm[thread.id]
                  })}
                >
                  <i className="bi bi-reply me-2"></i>
                  Reply
                </button>

                {showReplyForm[thread.id] && (
                  <div className="mt-3">
                    <textarea
                      className="form-control mb-2"
                      placeholder="Write your reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={3}
                    />
                    <button
                      className="btn btn-success"
                      onClick={() => handleAddReply(thread.id)}
                    >
                      Submit Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionBoard;
