class PostOffice  {
    constructor() {
        this.letterList = [];
        this.sendLetter = async () => {
            let letter = {};
            if (this.letterList.length>0) {
                letter = this.letterList[this.letterList.length-1];
                this.letterList.splice(-1,1);
            } else {
                return;
            }
            const customer = new Customer(letter.reciever);
            let promise = new Promise((resolve, reject) => {
                Math.random()*10 > 1 ? resolve(
                    customer.letterRecieved(letter.firstName, letter.content)
                ) : reject (new Error("Letter was not sent"))
            }, 3000)
        };
        this.startSending = async () => {
            setInterval(() => {
                try {
                    let letterSent = this.sendLetter();
                } catch (error) {
                    throw new Error("Letter was not sent")
                }
            }, 5000)
        }
    }
}

class Customer {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    letterRecieved(sender, content) {
        console.log(`Dear ${this.firstName} you have new mail from: ${sender}. Content of letter: ${content}`)
    }


}

class Letter extends Customer{
    constructor(firstName, lastName, reciever, content) {
        super(firstName, lastName);
        this.reciever = reciever;
        this.content = content
    }
}

const firstLetter = new Letter('Mika', 'Mikic', 'Pera Peric', 'Djes buraz?');
const secondLetter = new Letter('Djura', 'Djura', 'Pera Peric', 'Sta ima?');
const thirdLetter = new Letter('Jova', 'Jovic', 'Pera Peric', 'Kako si?');
let postOffice = new PostOffice();
postOffice.letterList = [firstLetter, secondLetter, thirdLetter];
postOffice.startSending();