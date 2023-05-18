import classNames from "classnames";

function Flex(props) {
    return <div className={`flex ${props.className}`}>{props.children}</div>
}

function Row(props) {
    const config = {
        'flex-row': true,
        'items-center': props.center,
        'justify-between': props.center,
    }
    const classes = classNames(config);

    return <Flex className={`${props.className} ${classes} `}>{props.children}</Flex>
}

function Column(props) {
    const config = {
        'flex-column': true,
        'items-center': true,
        'justify-between': true,
    }
    const classes = classNames(config);
    return <Flex className={`${classes} ${props.classNames}` }>{props.children}</Flex>
}

export {
    Flex,
    Row,
    Column,
}
