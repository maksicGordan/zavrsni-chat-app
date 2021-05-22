import React from "react";

export default class Input extends React.Component {
    constructor (props) {
        super(props);
      
        this.state = {
            text:''
        }
    }

    onChange(e) {
        this.setState({text: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({text: ''});
        this.props.onSendMessage(this.state.text);
    }

    render() {
        return (
            <div className='Input'>
            <form onSubmit={e => this.onSubmit(e)}>
                <input
                onChange={e => this.onChange(e)}
                value={this.state.text}
                type='text'
                placeholder='Text'
                />
                <button>Send</button>
            </form>
            </div>
    );
    }

}
