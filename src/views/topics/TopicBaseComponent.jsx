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

    reviveState(cache) {
        // Must be overrided for certain states (e.g. Complex/TransferFunction instances) loaded from the cache.
        return cache;
    }

    componentDidMount() {
        const cache = getCache(this.state.topicKey);
        if (cache) this.setState(this.reviveState(cache));
        // a per-instance handler so a late unmount can only remove its own listener,
        // never clobber the one a freshly-mounted topic just installed
        this._saveOnUnload = () => this.saveState();
        window.addEventListener("beforeunload", this._saveOnUnload);
    }

    componentWillUnmount() {
        this.saveState();
        window.removeEventListener("beforeunload", this._saveOnUnload);
    }
}

export default TopicBaseComponent;
