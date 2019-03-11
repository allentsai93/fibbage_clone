import React from 'react';

const Answers = (props) => (
    <div>
        {props.answers.splice(-1,1).map((ans, i) => 
            (<div key={i}>
                <input onClick={props.onSubmit} type={'submit'} value={ans} placeholder={ans}/>
            </div> )
        )}
    </div>
)

export default Answers;