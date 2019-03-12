import React from 'react';

const Question = (props) => (
    <div>
        <h2 dangerouslySetInnerHTML={{__html: props.question}}></h2>
    </div>
);

export default Question;