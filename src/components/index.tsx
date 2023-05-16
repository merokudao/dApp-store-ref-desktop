import React, {useState} from "react";

function Text(props) {
    const element = props.as || 'p';
    const color = props.color || '#87868C';
    const className = `text-[${color}] line-clamp-${props.maxLines}`;
    return React.createElement(
        element,
        {
            className:`${props.className} ${className}`,
        },
        props.children
    );
}



function ExpandAbleText(props) {
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const maxLines = isExpanded ? undefined : props.maxLines;
    return (
        <>
            <Text className="text-[14px] leading-[21px] font-[500]" maxLines={maxLines}>{props.children}</Text>
            <button onClick={() => setExpanded(!isExpanded)}>Read More</button>
        </>
    )
}


function Button(props) {
    return <button className="py-[10px] px-[14px] rounded-[32px] bg-gradient-to-b from-[#8A46FF] to-[#6E38CC] font-[600] text-[16px]">
        <div className="text-[12px] font-[500] leading-[15.6px]">{props.children}</div>
        {/*<svg className="inline-block ml-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
        {/*    <path d="M7 17L17 7M17 7V17M17 7H7" stroke="#E2E1E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />*/}
        {/*</svg>*/}
    </button>
}


export {
    Text,
    Button,
    ExpandAbleText
}
export * from './layout';

import Image from 'next/image';
export {
    Image
};