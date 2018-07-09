import React from 'React';
import Addoption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };
    handleDeleteOptions = () => {
        this.setState(() => {
            return {
                options: []
            }
        });
    };
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    };
    clearSelected = () => {
        this.setState(() => ({ selectedOption: undefined }))
    }
    handlePick = () => {
        const randomDecision = Math.floor(Math.random() * this.state.options.length);
        const optionDecided = this.state.options[randomDecision];
        this.setState(() => ({ selectedOption: optionDecided }));
    };
    handleAddOption = (option) => {
        if (!option) {
            return 'Enter value to add to item'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'option already exit'
        }
        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            }
        });
        //this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
    };
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            //do nothing
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    render() {
        const subtitle = 'Let Decide For You!';
        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    hasOPtion={this.state.options.length > 0}
                    handlePick={this.handlePick} />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <Addoption handleAddOption={this.handleAddOption} />
                <OptionModal selectedOption={this.state.selectedOption} clearSelected={this.clearSelected} />
            </div>
        );
    }
}
