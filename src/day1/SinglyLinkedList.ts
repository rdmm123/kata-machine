import { createUniqueName } from "typescript";

export default class SinglyLinkedList<T> {
    public length: number;
    private head: Node<T> | null
    private tail: Node<T> | null

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    prepend(item: T): void {
        const newNode = new Node(item);
        newNode.next = this.head;
        this.head = newNode;

        if (this.length == 0) {
            this.tail = newNode;
        }

        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (this.head == null) {
            this.head = new Node<typeof item>(undefined);
        }

        if (idx == this.length - 1 && this.tail) {
            const toInsert = new Node(item);
            this.tail.next = toInsert;
            this.tail = toInsert;
            return;
        }

        let currentNode = this.head;
        const toInsert = new Node(item);

        // insert at head
        if (idx == 0) {
            toInsert.next = this.head;
            this.head = toInsert;
        }


        for (let i = 0; i < idx - 1; i++) {
            const nextNode =  currentNode?.next;

            if (!nextNode) {
                const newNode = new Node<typeof item>(undefined)
                currentNode.next = newNode;
                currentNode = newNode;
                continue;
            }

            currentNode = nextNode;
        }

        if (currentNode.next) {
            toInsert.next = currentNode.next;
        } else {
            this.tail = toInsert;
        }

        currentNode.next = toInsert;
        this.length++;
    }

    append(item: T): void {
        const newNode = new Node(item);
        if (this.tail){
            this.tail.next = newNode;
        }
        this.tail = newNode;

        if (this.length == 0) {
            this.head = newNode;
        }

        this.length++;
    }
    remove(item: T): T | undefined {
        if (this.length == 0) {
            return undefined;
        }

        let currentNode: Node<T> | null = this.head!;
        let previousNode: Node<T> | null = null;

        while (currentNode) {
            if (currentNode.value == item) {
                break;
            }

            previousNode = currentNode;
            currentNode = currentNode.next;
        }

        // Value not found in the list
        if (!currentNode) {
            return undefined;
        }

        if (!previousNode) { // Value is first node = head
            this.head = this.head?.next ? this.head.next : null;

        } else if (!currentNode.next) { // Value is last node = tail
            previousNode.next = null;
            this.tail = currentNode;
        } else {
            previousNode.next = currentNode.next;
        }

        this.length--;
        return currentNode.value
    }

    get(idx: number): T | undefined {
        if (this.head == null) {
            return undefined;
        }

        if (this.length < idx + 1) {
            return undefined;
        }

        if (idx == this.length - 1) {
            return this.tail?.value;
        }

        let currentNode = this.head;

        for (let i = 0; i < idx; i++) {
            const nextNode =  currentNode?.next!;
            currentNode = nextNode;
        }

        return currentNode.value;
    }

    removeAt(idx: number): T | undefined {
        if (this.length < idx + 1) {
            return undefined;
        }

        if (idx == 0) {
            const value = this.head?.value;
            this.head = this.head?.next ? this.head.next : null;
            this.length--;
            return value;
        }

        let currentNode: Node<T> | null = this.head!;
        let previousNode: Node<T> | null = null;

        for (let i = 0; i < idx; i++) {
            previousNode = currentNode;
            currentNode = currentNode?.next!;
        }

        if (currentNode.next && previousNode) {
            previousNode.next = currentNode.next;
        }

        this.length--;
        return currentNode.value;
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