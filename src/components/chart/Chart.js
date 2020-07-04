import React from 'react';
import "./Chart.css";
import { FormControl, Button, Form, InputGroup } from 'react-bootstrap';

export default class Chart extends React.Component {

    constructor(){
        super();
        this.state = {
            title: "",
            bold: false,
            italic: false,
        }

        this.toggleBold = this.toggleBold.bind(this);
        this.toggleItalic = this.toggleItalic.bind(this);

    }

    
    render() {
        return(
            <div id="chart">
                <h1 id="chartTitle" className={(this.state.bold ? 'bold' : '') + " " + (this.state.italic ? 'italic' : '')}>{this.state.title}</h1>
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
                    <Button className="button tertiary">Create Table</Button>
                </Form>
            </div>
        )
    }

    /** Function that will bold or un-bold the title */
    toggleBold(){
        this.setState({ bold: !this.state.bold});
    }

    /** Function that will italicize or un-italicize the title */
    toggleItalic(){
        this.setState({ italic: !this.state.italic});
    }

    /** Function that changes the value of of the chart title as the user types */
    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
    }
}