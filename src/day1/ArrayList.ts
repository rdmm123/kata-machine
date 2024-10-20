export default class ArrayList<T> {
    public length: number;
    private array: T[]
    private capacity: number;
    private multiplier: number;

    constructor(length: number) {
        this.length = 0;
        this.multiplier = 2;
        this.capacity = length;
        this.array = new Array(this.capacity)
    }

    private grow(): void {
        console.log("GROW!!")
        const newArray = new Array(this.multiplier * this.capacity);
        this.multiplier++;
        for (let i = 0; i <= this.length; i++) {
            newArray[i] = this.array[i];
        }
        this.array = newArray;
    }

    prepend(item: T): void {
        return this.insertAt(item, 0);
    }
    insertAt(item: T, idx: number): void {
        if (this.length == this.capacity) {
            this.grow();
        }

        for (let i = this.length - 1; i >= idx; i--) {
            this.array[i + 1] = this.array[i];
        }
        this.array[idx] = item;
        this.length++;
    }
    append(item: T): void {
        if (this.length == this.capacity) {
            this.grow();
        }
        this.array[this.length] = item;
        this.length++;
    }
    remove(item: T): T | undefined {
        let i, found = false;
        for (i = 0; i < this.length; i++) {
            if (this.array[i] == item) {
                found = true;
                break;
            }
        }

        if (!found) {
            return undefined;
        }

        return this.removeAt(i);
    }
    get(idx: number): T | undefined {
        return this.array[idx];
    }
    removeAt(idx: number): T | undefined {
        if (idx >= this.length) {
            return undefined;
        }

        // store the value
        const value = this.array[idx];

        // shift the array
        for (let i = idx + 1; i < this.length; i++) {
            this.array[i - 1] = this.array[i];
        }

        // freeing up memory from array
        this.array.pop();

        this.length--;
        return value;
    }
}