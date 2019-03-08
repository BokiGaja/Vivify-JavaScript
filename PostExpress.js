class PostOffice  {

    constructor(queue) {
        this.queue = queue;
    }

    sendLetter = async () => {
        let letter = {};
        if (!this.queue.isEmpty()) {
            letter = this.queue.daqueue();
        } else {
            console.log("There are no letters");
            return;
        }

        new Promise((resolve, reject) => {
            Math.random() * 10 > 1  ? resolve(
                letter.sendLetter()
            ) : reject (new Error("Letter was not sent"))
        })
    };

    startSending = () => {
        setInterval(async () => {
            await this.sendLetter()
        }, 10000);
    }
}



class Queue {
    constructor() {
        this.letterList = [];
    }
    // Adds an element to the queue
    enqueue(letter) {
        this.letterList.push(letter);
    }

    isEmpty() {
        return this.letterList.length === 0;
    }
    // Removes an element from the queue
    daqueue() {
        if (this.isEmpty()) {
            return console.log("No letters to send");
        }
        return this.letterList.shift();
    }
    // Returns the front element of the queue
    front() {
        if (this.isEmpty()) {
            console.log('No elements in Queue')
        } else {
            return this.letterList[0]
        }
    }
}

class Person {
    constructor(firstName, lastName) {
        if (new.target === Person) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Customer extends Person {
    constructor(firstName, lastName) {
        super(firstName, lastName)
    }

    receiveLetter(letter) {
        const receiverFullName = `${letter.reciever.firstName} ${letter.reciever.lastName}`
        const senderFullName = `${letter.sender.firstName} ${letter.sender.lastName}`
        console.log(`${receiverFullName} you have new mail from: ${senderFullName}. Content of letter: ${letter.content}`)
    }
}

class Letter {
    constructor(sender, reciever, content) {
        this.sender = sender;
        this.reciever = reciever;
        this.content = content
    }

    sendLetter() {
        if (this.sender !== this.reciever) {
            setTimeout(() => {
                this.reciever.receiveLetter(this);
            }, 3000)
        } else {
            console.log("You cant send letter to yourself")
        }
    }

}

const person1 = new Customer('Mika', 'Mikic');
const person2 = new Customer('Zika', 'Zikic');
const person3 = new Customer('Pera', 'Peric');
const person4 = new Customer('Boza', 'Bozic');
const person5 = new Customer('Cone', 'Conic');
const firstLetter = new Letter(person1, person2, 'Djes buraz?');
const secondLetter = new Letter(person4, person3, 'Sta ima?');
const thirdLetter = new Letter(person5, person3, 'Kako si?');

let queue = new Queue();
queue.enqueue(firstLetter);
queue.enqueue(secondLetter);
queue.enqueue(thirdLetter);
let postOffice = new PostOffice(queue);
postOffice.startSending();