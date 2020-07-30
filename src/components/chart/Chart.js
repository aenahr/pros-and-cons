import React from 'react';
import "./Chart.css";
import { FormControl, Button, Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { MdClose, MdEdit, MdAdd, MdSave, MdCancel } from 'react-icons/md';
import Switch from "react-switch";
import ChartItem from "../../models/ChartItem";
const grid = 8;

const prosListStyle = isDraggingOver => ({
    background: '#78BC61',
    padding: grid,
    width: 400
});

const consListStyle = isDraggingOver => ({
    background: '#FF6666',
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
    background: isDragging ? '#F8EEA0' : '#EFE9E7',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getNextId = (array) => {
    let arr = array.map(a => a.id);
    return String(Math.max.apply(null, arr.map(Number))+1);
};

export default class Chart extends React.Component {

    isProEmpty;

    constructor(){
        super();
        this.state = {
            title: "",
            bold: false,
            italic: false,
            checked: true,
            inputValue: "",
            pros: [],
            cons: [new ChartItem({id: '6', content: 'herp derp'}), new ChartItem({id: '10', content: 'derp derp'}), new ChartItem({id: '11', content: 'derp herp'})],
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
                    <h1 id="chartTitle" className={(this.state.bold ? 'bold' : '') + " " + (this.state.italic ? 'italic' : '')}>{this.state.title}</h1>
                    <div className="pros-cons-chart"><DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} style={prosListStyle(snapshot.isDraggingOver)}>
                                    {this.state.pros.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                    <Container className="item-container">
                                                        <Row>
                                                            <Col sm="10" className="item-col">
                                                                {item.editing ? <input type="text" value={item.content} /> : <p className="item-content">{item.content}</p>}
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
                                    {this.state.pros.length < 1 && <p className={this.state.pros.length < 1 ? 'center-msg' : ''}><i>no items</i></p>}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="droppable2">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={consListStyle(snapshot.isDraggingOver)}>
                                    {this.state.cons.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
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
                                                            <Col sm="9" className="item-col">
                                                                {item.editing 
                                                                    ? <FormControl type="text" className="input-value" value={item.content} onChange={this.handleEdit} />
                                                                    : <p className="item-content">{item.content}</p>}
                                                            </Col>
                                                            <Col sm="3" className="item-col">
                                                                {item.editing
                                                                    ? <div><MdSave className="icon-button" onClick = {() => this.editCon(index)} /><MdCancel className="icon-button" onClick = {() => this.cancelCon(index)} /></div>
                                                                    : <div><MdEdit className="icon-button" onClick = {() => this.editCon(index)} /><MdClose className="icon-button" onClick = {() => this.removeCon(index)} /></div>
                                                                }
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    {this.state.cons.length < 1 && <p className={this.state.cons.length < 1 ? 'center-msg' : ''}><i>no items</i></p>}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext></div>
                    <div className="input-container">
                        <MdAdd className="icon-button-add" onClick={this.createItem} />
                        <FormControl required type="text" placeholder="enter pro or con..." className="input-value" value={this.state.inputValue} onChange={this.handleText} onKeyPress={this.handleEnterInput} />
                        <Switch onColor="#78BC61" offColor="#FF6666" onChange={this.handleSwitch} checked={this.state.checked} />
                    </div>
                    <Button className="button tertiary">Create Table!</Button>
                </Form>
            </div>
        )
    }

    /** Function that listens if user presses enter - another optional way of creating an item */
    handleEnterInput = (event) => {
        if(event.key === "Enter") this.createItem();
    }

    /** Changes the value if the user's input in pro or con */
    handleText = (event) => { this.setState({ inputValue : event.target.value }); }

    /** Upon user dragging or clicking switch, change to adding as a pro or con */
    handleSwitch = (checked) => { this.setState({ checked }); }

    /** Function that sets the droppable item from a p to an input */
    editCon = (index) => {
        // TODO: set everything on edit to false
        let arr = [...this.state.cons];
        arr[index].editing = true;
        this.setState({cons: arr});
    }

    /** Function that reverts text of item to read-only mode */
    cancelCon = (index) => {
        let arr = [...this.state.cons];
        arr[index].editing = false;
        this.setState({cons: arr});
    }

    /** Function that create a new item to list */
    createItem = () => {
        if(this.state.checked === true){
            this.setState({ pros: [ ...this.state.pros, new ChartItem({id: this.state.nextId, content: this.state.inputValue}) ]});
        }
        else{
            this.setState({ cons: [ ...this.state.cons, new ChartItem({id: this.state.nextId, content: this.state.inputValue}) ]});
        }
        // increment string counter
        let incNum = (+this.state.nextId+1)+"";
        // change to new increment
        this.setState({ nextId : incNum, inputValue: ""});
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
    toggleBold = () => { this.setState({ bold: !this.state.bold}); }

    /** Function that will italicize or un-italicize the title */
    toggleItalic = () => {  this.setState({ italic: !this.state.italic}); }

    /** Function that changes the value of of the chart title as the user types */
    handleTitleChange = (e) => { this.setState({title: e.target.value}); }

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