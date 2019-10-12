import React, { CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import Dustbin from './Dustbin.js';

const style= {
    width: 200,
    height: 50,
    lineHeight: '50px',
    background: 'pink',
    margin: '30px auto'
}

const Box = () => {
    // 使用 useDrag
    const [data, drager] = useDrag({
        item: { type: 'Bo' }
    })
    console.log(data)
    return (
        // 将第二个参数赋值给 ref
        <>
        <Dustbin />
        <div ref={ drager } style={ style }>可拖拽组件 Box</div>
        <div ref={ drager } style={ style }>可拖拽组件 Box2</div>
        </>
    )
}

export default Box;


