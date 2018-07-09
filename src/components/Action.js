import React from 'React';

const Action = (props) => (
    <div>
        <button
            onClick={props.handlePick}
            disabled={!props.hasOPtion}>What Should I Do?</button>
    </div>
);
export default Action;