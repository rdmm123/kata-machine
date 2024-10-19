export default class Stack<T> {
    public length: number;
    private tail?: Node<T>
    private head?: Node<T>

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        const newNode = {value: item} as Node<T>;
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    }

    pop(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        const head = this.head;
        this.head = this.head.next;
        this.length--;
        return head?.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}

type Node<T> = {
    value: T,
    next?: Node<T>
}