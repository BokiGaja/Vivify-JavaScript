class Error {
    constructor() {
        this.errors = {};
        this.has = field => {
           return this.errors.field !== null
        };
        this.any = () => {
            for (let key in this.errors) {
                if (this.errors.hasOwnProperty(key))
                    return false;
            }
            return true;
        };
        this.get = field => this.errors.hasOwnProperty(field) && this.errors.field;
        this.record = error => this.errors.error = error;
        this.clear = field => {
            if (field === null) {
                this.errors = {}
            } else {
                delete this.errors.field;
            }
        };
    }
}

class Form {
    constructor(data) {
        this.originalData = data;
        this.errors = {};
        this.field = data.map(el => el.key);
    }
}