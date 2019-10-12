import React from 'react'
import { useDrop } from 'react-dnd'
import CreactForm from "./CreactForm"
const style = {
    minHeight: 780,
    height: '100%',
    border: '1px dashed black'
}
const Dustbin = ({onDrop,data}) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'dragBox',
        drop: onDrop,
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })


    const getForm = (data)=>{
        if (Object.keys(data).length !== 0) {
            const {data:{properties}} = data
            return <CreactForm data={properties}/>
        }
    }
    return (
        <div ref={drop} style={{ ...style}}>
            {getForm(data)}
        </div>
    )
}
export default Dustbin
