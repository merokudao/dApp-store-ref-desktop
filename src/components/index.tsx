import React, {useState} from "react";

function Text(props) {
    const element = props.as || 'p';
    const color = props.color || 'blue';
    const className = `text-[${color}] line-clamp-${props.maxLines}`;
    return React.createElement(
        element,
        {
            className:`${props.classNames} ${className}`,
        },
        props.children
    );
}



function ExpandAbleText(props) {
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const maxLines = isExpanded ? undefined : props.maxLines;
    return (
        <>
            <Text maxLines={maxLines}>{props.children}</Text>
            <button onClick={() => setExpanded(!isExpanded)}>Read More</button>
        </>
    )
}


export {
    Text,
    ExpandAbleText
}
export * from './layout';

import Image from 'next/image';
export {
    Image
};