export default class Queue<T> {
    public length: number;
    private head: Node<T> | null
    private tail: Node<T> | null

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    enqueue(item: T): void {
        const newNode = new Node(item);

        if (this.tail) {
            this.tail.next = newNode;
        }

        // first node
        if (this.head == null) {
            this.head = newNode;
        }

        this.tail = newNode;
        this.length++;
    }
    deque(): T | undefined {
        if (this.head == null) {
            return undefined;
        }
        const head = this.head;

        this.head = this.head.next;
        head.next = null;

        this.length--;
        return head.value;
    }

    peek(): T | undefined {
        if (this.head == null) {
            return undefined;
        }
        return this.head.value;
    }
}

class Node<T> {
    public value: T | undefined
    public next: Node<T> | null

    constructor(value: T | undefined) {
        this.value = value;
        this.next = null;
    }
}