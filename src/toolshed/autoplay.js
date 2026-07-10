// Drives a single numeric sandbox parameter from `from` to `to` in fixed `step`
// increments, pushing one new value every `interval` ms so the sandbox animates
// itself. It is framework-agnostic: all it touches is the setter it is handed.

const MIN_INTERVAL = 40; // ms — below this React can't repaint in time and the tab stutters
const MAX_FRAMES = 5000; // guard so a tiny step can't spawn a practically endless run

const round = (v) => Math.round(v * 1e6) / 1e6;

export default class AutoPlay {
    static get MIN_INTERVAL() {
        return MIN_INTERVAL;
    }

    // returns an error message when the settings can't produce a safe run, else null
    static validate({ from, to, step, interval }) {
        const fields = { from, to, step, interval };
        for (const value of Object.values(fields))
            if (value === "" || value === null || value === undefined || Number.isNaN(+value))
                return "Please fill every field with a valid number.";
        from = +from;
        to = +to;
        step = +step;
        interval = +interval;
        if (interval < MIN_INTERVAL)
            return `Interval must be at least ${MIN_INTERVAL} ms so the animation stays smooth.`;
        if (step === 0) return "Step can't be zero.";
        if (from === to) return "Start and end values must differ.";
        if (Math.sign(to - from) !== Math.sign(step))
            return "Step sign must move the value from start toward end.";
        if (Math.abs((to - from) / step) > MAX_FRAMES)
            return "Too many steps for one run; use a larger step.";
        return null;
    }

    constructor({ setValue, from, to, step, interval, onStop }) {
        this.setValue = setValue;
        this.from = +from;
        this.to = +to;
        this.step = +step;
        this.interval = +interval;
        this.onStop = onStop;
        this.timer = null;
        this.frame = 0;
    }

    get running() {
        return this.timer !== null;
    }

    play() {
        if (this.running) return;
        this.frame = 0;
        this.setValue(round(this.from));
        this.timer = setInterval(() => {
            this.frame += 1;
            // rebuild the value from the frame index rather than accumulating, so
            // floating-point error never drifts the parameter off its track
            const value = this.from + this.frame * this.step;
            const finished = this.step > 0 ? value >= this.to : value <= this.to;
            this.setValue(round(finished ? this.to : value));
            if (finished) this.stop();
        }, this.interval);
    }

    // `notify` is turned off when a caller stops the run during teardown, so it
    // won't push state into a component that is already unmounting
    stop(notify = true) {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (notify && this.onStop) this.onStop();
    }
}
