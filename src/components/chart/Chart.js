import React from 'react';
import "./Chart.css";
import { FormControl, Button, Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { MdClose, MdEdit } from 'react-icons/md';

const grid = 8;

const prosListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#5C95FF' : '#78BC61',
    padding: grid,
    width: 400
});

const consListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#5C95FF' : '#FF6666',
    padding: grid,
    width: 400
});

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: '0.25em',
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '#EFE9E7',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getNextId = (array) => {
    let arr = array.map(a => a.id);
    return String(Math.max.apply(null, arr.map(Number))+1);
};

export default class Chart extends React.Component {

    constructor(){
        super();
        this.state = {
            title: "",
            bold: false,
            italic: false,
            pros: [
                {
                    id: "1",
                    content: 'this is it'
                },
                {
                    id: "2",
                    content: 'here we go'
                },
                {
                    id: "3",
                    content: 'hello world'
                },
                {
                    id: "4",
                    content: 'goodbye world'
                },
                {
                    id: "5",
                    content: 'it really b like dat sometimes'
                },
            ],
            cons: [
                {
                    id: "100",
                    content: 'beckles'
                },
                {
                    id: "7",
                    content: 'beckle is love'
                },
                {
                    id: "8",
                    content: 'beckle is life'
                },
                {
                    id: "19",
                    content: 'beckle is bae beckle is bae beckle is bae beckle is bae beckle is bae beckle is bae beckle is baebeckle is bae beckle is baebeckle is baebeckle is bae'
                },
                {
                    id: "10",
                    content: 'beckl beckles'
                },
            ],
            idList: {
                droppable: "pros",
                droppable2: "cons"
            }
        };
    }

    componentDidMount() {
        // get next unique id
        this.state.nextId = getNextId(this.state.pros.concat(this.state.cons));
    }

    
    render() {
        return(
            <div id="chart">
                <h1 id="chartTitle" className={(this.state.bold ? 'bold' : '') + " " + (this.state.italic ? 'italic' : '')}>{this.state.title}</h1>
                <div className="pros-cons-chart"><DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={prosListStyle(snapshot.isDraggingOver)}>
                                {this.state.pros.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                <Container className="item-container">
                                                    <Row>
                                                        <Col sm="10" className="item-col">
                                                            <p className="item-content">{item.content}</p>
                                                        </Col>
                                                        <Col sm="2" className="item-col">
                                                            <MdEdit className="icon-button" onClick = {() => this.editItem(index)} />
                                                            <MdClose className="icon-button" onClick = {() => this.removePro(index)} />
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={consListStyle(snapshot.isDraggingOver)}>
                                {this.state.cons.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                <Container className="item-container">
                                                    <Row>
                                                        <Col sm="10" className="item-col">
                                                            <p className="item-content">{item.content}</p>
                                                        </Col>
                                                        <Col sm="2" className="item-col">
                                                            <MdEdit className="icon-button" onClick = {() => this.editItem(index)} />
                                                            <MdClose className="icon-button" onClick = {() => this.removeCon(index)} />
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext></div>
                <Form>
                    <InputGroup>
                        <InputGroup.Append className="inputLabel">
                            <InputGroup.Text>Chart Title</InputGroup.Text>
                        </InputGroup.Append>
                        <FormControl required type="text" placeholder="enter title" className="input" value={this.state.value} onChange={this.handleTitleChange} />
                        <Form.Control.Feedback type="invalid">Please add a title for your chart.</Form.Control.Feedback>
                        <Form.Check className="checkbox" checked={this.state.bold} onChange={this.toggleBold} label={"bold"} />
                        <Form.Check className="checkbox" checked={this.state.italic} onChange={this.toggleItalic} label={"italicize"} />
                    </InputGroup>
                    <Button onClick={this.createItem} className="button tertiary">Create Table!</Button>
                </Form>
            </div>
        )
    }

    /** Function that create a new item to list */
    createItem = () => {
        this.setState({ pros: [...this.state.pros, {id: this.state.nextId, content: "hehe"}] });
        // increment string counter
        let incNum = (+this.state.nextId+1)+"";
        // change to new increment
        this.setState({ nextId : incNum});
    }

    /** Function that remove an item from cons list */
    removeCon = (index) => {
        let arr = [...this.state.cons];
        arr.splice(index,1);
        this.setState({cons : arr});
    }

    /** Function that remove an item from pros list */
    removePro = (index) => {
        let arr = [...this.state.pros];
        arr.splice(index,1);
        this.setState({pros : arr});
    }

    /** Function that will bold or un-bold the title */
    toggleBold = () => {
        this.setState({ bold: !this.state.bold});
    }

    /** Function that will italicize or un-italicize the title */
    toggleItalic = () => {
        this.setState({ italic: !this.state.italic});
    }

    /** Function that changes the value of of the chart title as the user types */
    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
    }

    /** Function that finds the targeted list name  */
    getList = id => this.state[this.state.idList[id]];

    /** Function that moves chart items and reorders or moves them to another chart */
    onDragEnd = result => {
        
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { cons: items };
            } else{
                state = { pros: items};
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                pros: result.droppable,
                cons: result.droppable2
            });
        }
    };
}