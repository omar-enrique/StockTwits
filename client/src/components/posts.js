import ReactDOM from 'react-dom';
import React from 'react';
import "../styles/posts.scss";

const Posts = ({messages}) => {
    let cards = messages.map((message, i)=> {
        return (
        <div className="card" key={i}>
            <div className="card-body">
                <div className="message">
                    <img src={message.user.avatar_url} alt={message.user.username} />
                    <div>
                        <span className="username">{message.user.username}</span> <span>(Source: {message.source.url})</span>
                        <span className="message-body">{message.body}</span>
                        {/* {(message.entities.chart) ? <img src={message.entities.chart.thumb} /> : null } */}
                    </div>
                </div>
            </div>
        </div>);
    })

    return(
        <div>
            {cards.length ? cards : <div>No Messages Found</div>}
        </div>
    );
}

export default Posts;