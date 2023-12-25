import { Component } from "react";
import { cacheParameters, getCache } from "toolshed";

class TopicBaseComponent extends Component {
    state = { topicKey: "default" };

    updateState(field, value) {
        this.setState({[field]: value});
        // method2: bt soft copy
        //this.setState({ ...this.state, [field]: value });

        // method3: by callback func
        // this.setState((state) => {
        //     state = {...state};  // not copying this, will change the prevState also!
        //     state[field] = value;
        //     return state;
        // });
    }

    saveState() {
        // overload this parameter to change the list of states you want to save
        cacheParameters(this.state.topicKey, this.state);
    }

    componentDidMount() {
        const cache = getCache(this.state.topicKey);
        this.setState({ ...this.state, ...cache }); // you the copy approach (like this)
        // or use the setState via callback function
        window.onbeforeunload = () => {
            this.saveState();
        };
    }

    componentWillUnmount() {
        this.saveState();
    }

    /*
        setBeforeUnloadEvent = windowObject => {
            windowObject.onbeforeunload = () => {
                cacheParameters(this.state.topicKey, this.state);
            }
        }
    */
}

export default TopicBaseComponent;
