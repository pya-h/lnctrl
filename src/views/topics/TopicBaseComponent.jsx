import { Component } from "react";
import { cacheParameters, getCache } from "toolshed";

class TopicBaseComponent extends Component {
    state = { topicKey: "default" }

    componentDidMount() {
        const cache = getCache(this.state.topicKey);
        this.setState(cache);
        window.onbeforeunload = () => {
            cacheParameters(this.state.topicKey, this.state);
        }
    }
/*
    setBeforeUnloadEvent = windowObject => {
        windowObject.onbeforeunload = () => {
            cacheParameters(this.state.topicKey, this.state);
        }
    }
*/
    componentWillUnmount() {
        cacheParameters(this.state.topicKey, this.state);
    }

}

export default TopicBaseComponent;
