import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

// Reorder the list items
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    console.log("removed 1 =>", result);
    result.splice(endIndex, 0, removed);
    console.log("removed 2 =>", result);

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "5px 20px",
    borderRradius: 5,
    margin: `0 0 10px 0`,
    background: isDragging ? "#77e2e0" : "#33c9c7",
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? "#a1ffc5" : "#daffff",
    padding: 10,
    width: "100%"
});

function VerticalDragList(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(props.list);
    }, [props]);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const list_reorder = reorder(
            list,
            result.source.index,
            result.destination.index
        );
        setList(list_reorder);
    }

    const moveTo = (index, flag) => {
        const list_reorder = reorder(
            list,
            index,
            flag ? index - 1 : index + 1
        );
        setList(list_reorder);
        console.log(list_reorder);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {list.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div className="form-control">
                                                <ContactPhoneIcon style={{ color: "#DC004E", fontSize: 55, width: 60, height: 60 }}/>
                                            </div>
                                            <div className="infor form-control">
                                                <p>{item.name}</p>
                                                <span>{item.phoneNumber}</span>
                                            </div>
                                            <div className="form-control">
                                                <button className="icon-btn" onClick={() => moveTo(index, true)}>
                                                    <ArrowUpwardIcon style={{ width: 16, height: 16 }}/>
                                                </button>
                                                <button className="icon-btn" onClick={() => moveTo(index, false)}>
                                                    <ArrowDownwardIcon style={{ width: 16, height: 16 }}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default VerticalDragList;