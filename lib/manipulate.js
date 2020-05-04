export default class Manipulate {
    get val() {
        return JSON.parse(localStorage.getItem(this.collid));
    }
    set val(payload) {
        localStorage.setItem(this.collid, JSON.stringify(payload));
    }
    get exists() {
        return localStorage.getItem(this.collid) ? true : false;
    }
}
