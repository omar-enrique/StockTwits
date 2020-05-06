import ReactDOM from 'react-dom';
import React from 'react';
import "../styles/posts.scss";

function Posts(props) {
    let cards = [];

    for(let i in props.messages) {
        cards.push(
            <div key={i}>
                {props.messages[i].body}
            </div>
        )
    }

    return(
        <div>
            {cards.length ? cards : <div>No Messages Found</div>}
        </div>
    );
}

export default Posts;