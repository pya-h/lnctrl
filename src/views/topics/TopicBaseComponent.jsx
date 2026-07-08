import { Component } from "react";
import { cacheParameters, getCache } from "toolshed";

class TopicBaseComponent extends Component {
    state = { topicKey: "default" };

    updateState(field, value) {
        this.setState({ [field]: value });
    }

    saveState() {
        const { topicKey } = this.state;
        if (!topicKey || topicKey === "default") return;
        if (Array.isArray(this.persistKeys)) {
            const data = {};
            for (const key of this.persistKeys) data[key] = this.state[key];
            cacheParameters(topicKey, data);
        } else {
            cacheParameters(topicKey, this.state);
        }
    }

    componentDidMount() {
        const cache = getCache(this.state.topicKey);
        if (cache) this.setState(cache);
        window.onbeforeunload = () => this.saveState();
    }

    componentWillUnmount() {
        this.saveState();
        window.onbeforeunload = null;
    }
}

export default TopicBaseComponent;
