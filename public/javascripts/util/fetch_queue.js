import regeneratorRuntime from 'regenerator-runtime';

class FetchQueue {
    constructor() {
        this.queue = [];
        this.paused = false;
        this.start = this.start.bind(this);
        this.resume = this.resume.bind(this);
        this.pause = this.pause.bind(this);
        this.dequeue = this.dequeue.bind(this);
        this.enqueue = this.enqueue.bind(this);
    }

    start() {
        setInterval(this.dequeue, 100);
    }

    resume() {
        this.paused = false;
    }

    pause() {
        this.paused = true;
    }

    enqueue(funk) {
        this.queue.push(funk);
    }

    dequeue() {
        if (!this.paused && this.queue.length > 0) {
            const funk = this.queue.shift();
            this.paused = true;
            (async () => {
                funk();
            })().then(
                () => this.paused = false
            );
        }
    }
}

export default FetchQueue;