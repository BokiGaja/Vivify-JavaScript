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
            let promise = new Promise((resolve, reject) => {
                Math.random()*10 > 1  ? resolve(
                    Customer.letterRecieved(letter.firstName, letter.reciever, letter.content)
                ) : reject (new Error("Letter was not sent"))
            }, 3000)
        };
        this.startSending = async () => {
            setInterval(() => {
                try {
                    return this.sendLetter();
                } catch (error) {
                    throw new Error(error)
                }
            }, 5000)
        }
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

const firstLetter = new Letter('Mika', 'Mikic', 'Djole Peric', 'Djes buraz?');
const secondLetter = new Letter('Djura', 'Djura', 'Mile Kitic', 'Sta ima?');
const thirdLetter = new Letter('Jova', 'Jovic', 'Zika Peric', 'Kako si?');
let postOffice = new PostOffice();
postOffice.letterList = [firstLetter, secondLetter, thirdLetter];
postOffice.startSending();