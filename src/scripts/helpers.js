export class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(type, callback) {
        this.events[type] = this.events[type] || [];
        this.events[type].push(callback);
    }

    emit(type, ...arg) {
        if (this.events[type]) {
            this.events[type].forEach(callback => callback(arg));
        }
    }
}

export function get(url) {
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState != 4) return;

            if (xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.responseText);
            }
        };

        xhr.send();
        
    });
}

export function post(url, data) {
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                resolve();
            } else {
                reject(xhr.responseText);
            }
        };

        xhr.send(data);
    });
}