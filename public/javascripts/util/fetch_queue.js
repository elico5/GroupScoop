import regeneratorRuntime from 'regenerator-runtime';
import Queue from 'queue-fifo';

class FetchQueue {
    constructor() {
        this.queue = new Queue();
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

    enqueue(func) {
        this.queue.enqueue(func);
    }

    dequeue() {
        if (!this.paused && !this.queue.isEmpty()) {
            const func = this.queue.dequeue();
            this.paused = true;
            (async () => {
                func();
            })().then(
                () => this.paused = false
            );
        }
    }
}

export default FetchQueue;