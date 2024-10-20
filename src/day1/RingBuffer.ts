export default class RingBuffer<T> {
    public length: number;
    private head?: number;
    private tail?: number;
    private capacity: number;
    private freeSpace: number;

    private array: T[];
    constructor() {
        this.capacity = 5;
        this.freeSpace = 2;
        this.array = new Array(this.capacity);
        this.length = 0;
    }

    private grow(): void {
        const newCapacity = this.capacity + 2 * this.freeSpace
        const newArray = new Array(newCapacity);
        for (let i = 0; i < this.capacity; i++) {
            newArray[i + this.freeSpace] = this.array[(i + this.head!) % this.capacity];
        }
        this.array = newArray;
        this.capacity = newCapacity;
        this.head = this.freeSpace;
        this.tail = this.capacity - this.freeSpace - 1;
    }

    push(item: T): void {
        if (this.length == this.capacity) {
            this.grow()
        }

        this.length++;
        if (this.head == undefined || this.tail == undefined) {
            this.head = this.tail = this.freeSpace;
        } else {
            this.tail = (this.tail + 1) % this.capacity;
        }

        this.array[this.tail] = item;
    }

    get(idx: number): T | undefined {
        if (!this.head) {
            return undefined;
        }
        return this.array[idx + this.head];
    }

    pop(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;
        const value = this.array[this.head];

        if (this.length == 0) {
            this.head = this.tail = undefined;
        } else {
            this.head = (this.head + 1) % this.capacity;
        }
        return value
    }
}