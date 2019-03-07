class PostOffice  {
    constructor(queue) {
        this.queue = queue;
        this.lettersInBox = true;
        this.sendLetter = async () => {
                let letter = {};
                if (!this.queue.isEmpty()) {
                    letter = this.queue.letterList[this.queue.letterList.length-1];
                    this.queue.daqueue();
                } else {
                    console.log("There are no letters");
                    return this.lettersInBox = false;
                }
                let promise = new Promise((resolve, reject) => {
                    Math.random()*10 > 1  ? resolve(
                        Customer.letterRecieved(letter.firstName, letter.reciever, letter.content)
                    ) : reject (new Error("Letter was not sent"))
                }, 3000)
        };
        this.startSending = async () => {

                setInterval(() => {
                    if (this.lettersInBox) {
                        try {
                            return this.sendLetter();
                        } catch (error) {
                            throw new Error(error)
                        }
                    } else {
                        return;
                    }
                    }, 5000)
            }
        }
}

class Queue {
    constructor() {
        this.letterList = [];
    }
    // Adds an element to the queue
    enqueue(element) {
        if (`${element.firstName} ${element.lastName}` !== element.reciever) {
            this.letterList.push(element);
        } else {
            console.log("You cant send letter to yourself")
        }
    }
    isEmpty() {
        return this.letterList.length === 0;
    }
    // Removes an element from the queue
    daqueue() {
        if (this.isEmpty()) {
            return console.log("No letters to send");
        }
        return this.letterList.pop();
    }
    // Returns the front element of the queue
    front() {
        this.isEmpty() && console.log('No elements in Queue');
        return this.letterList[0];
    }
}

class Customer {
    constructor(firstName, lastName) {
        if (new.target === Customer) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this.firstName = firstName;
        this.lastName = lastName;
    }

    static letterRecieved(sender, reciever, content) {
        console.log(`Dear ${reciever} you have new mail from: ${sender}. Content of letter: ${content}`)
    }


}

class Letter extends Customer{
    constructor(firstName, lastName, reciever, content) {
        super(firstName, lastName);
        this.reciever = reciever;
        this.content = content
    }
}

const firstLetter = new Letter('Mika', 'Mikic', 'Mika Mikic', 'Djes buraz?');
const secondLetter = new Letter('Djura', 'Djura', 'Mile Kitic', 'Sta ima?');
const thirdLetter = new Letter('Jova', 'Jovic', 'Zika Peric', 'Kako si?');

let queue = new Queue();
let postOffice = new PostOffice(queue);
queue.enqueue(firstLetter);
queue.enqueue(secondLetter);
queue.enqueue(thirdLetter);
postOffice.startSending();