import React from "react";
import '../Style/style.css';


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
        const trim = this.state.text.trim();
        if(trim.length < 1) {
            return;
        }
        this.setState({text: ''});
        this.props.onSendMessage(trim);
    }

    render() {
        return (
            <div>
            <form onSubmit={e => this.onSubmit(e)}>
                <input
                onChange={e => this.onChange(e)}
                value={this.state.text}
                type='text'
                placeholder='Enter your text'
                />
                <button className='button'>Send</button>
            </form>
            </div>
    );
    }

}
