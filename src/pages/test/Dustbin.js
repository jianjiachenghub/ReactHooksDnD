import React from 'react'
import { useDrop } from 'react-dnd';
const style = {
    width: 400,
    height: 400,
    margin: '100px auto',
    lineHeight: '60px',
    border: '1px dashed black'
}

const Dustbin = () => {
    // 第一个参数是 collect 方法返回的对象，第二个参数是一个 ref 值，赋值给 drop 元素
    const [collectProps, droper] = useDrop({
        // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
        accept: 'Bo',
        // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
        collect: (minoter) => ({
            isOver: minoter.isOver()
        })
    })
    const bg = collectProps.isOver ? 'deeppink' : 'white';
    const content = collectProps.isOver ? '快松开，放到碗里来' : '将 Box 组件拖动到这里'
    return (
        // 将 droper 赋值给对应元素的 ref
        <div ref={ droper } style={{ ...style, background: bg }}>{ content }</div>
    )
}

export default Dustbin;
