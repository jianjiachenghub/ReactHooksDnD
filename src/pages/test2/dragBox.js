import React from 'react'
import { useDrag } from 'react-dnd'
import { Menu, Icon ,Button} from 'antd';
const DragBox = ({ name, data }) => {
    const [{ opacity }, drager] = useDrag({
        item: { name, type:'dragBox',data},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })
    return (
       <div ref={ drager }><Button value="large" type="dashed" block>{name}</Button></div>
    )
}
export default DragBox
