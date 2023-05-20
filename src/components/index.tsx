import React, { useEffect, useRef, useState } from "react";
import { AppList } from "./app_list";
import { Card } from './card';

import { default as NXTImage } from 'next/image';

function Text(props) {
    const element = props.as || 'p';
    const color = props.color || '#87868C';
    const className = `text-[${color}] line-clamp-${props.maxLines}`;
    return React.createElement(
        element,
        {
            className: `${props.className} ${className}`,
        },
        // {dApp.description.split('\\n').map(e => <p>{e}</p>)}
        props.children.split('\\n').map(e => <p>{e}</p>)
    );
}



function ExpandAbleText(props) {
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const maxLines = isExpanded ? undefined : props.maxLines;
    const label = isExpanded ? "Read Less" : "Read More";
    return (
        <>
            <Text className="lg:text-white text-[14px] leading-[21px] font-[500]" maxLines={maxLines}>{props.children}</Text>
            <button onClick={() => setExpanded(!isExpanded)}>{label}</button>
        </>
    )
}


function Button(props) {
    const Elm = props.as || "button";
    return <Elm {...props} className={"py-[10px] px-[14px] rounded-[32px] bg-gradient-to-b from-[#8A46FF] to-[#6E38CC] font-[600] text-[16px] hover:from-[#fff] hover:to-[#ddd] hover:text-black" + ' ' + props.className}>
        <div className="text-[12px] font-[500] leading-[15.6px] flex items-center justify-center">{props.children}</div>
        {/*<svg className="inline-block ml-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
        {/*    <path d="M7 17L17 7M17 7V17M17 7H7" stroke="#E2E1E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />*/}
        {/*</svg>*/}
    </Elm>
}




function RImage(props) {
    const imgRef = useRef(null);
    const [src, setSrc] = useState(props.placeholder || '/assets/images/icon_placeholder.png');
    useEffect(() => {
        const img : any= imgRef.current;
        // console.log(img.src, src)
        if (img && img.src !== src) {
            img.src = props.src;
            // img.onerror = () => setSrc('/assets/images/icon_placeholder.png')
            img.onload = (evt) => {
                setSrc(props.src)
            };
        }
    }, [src]);
    return <NXTImage  {...props} ref={imgRef} src={src} />
}

export * from './layout';
export {
    Text,
    Button,
    ExpandAbleText
};
export {
    RImage,
    AppList,
    Card
};
