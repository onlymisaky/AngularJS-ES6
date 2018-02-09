export default class HelloWorld {
    constructor() {
        this.msg = 'Hello World！'
        this.time = Date.parse(this.getTime());
    }

    $onInit() {
    }

    $onChanges(changesObj) {
    }

    $doCheck() {
    }

    $onDestroy() {
    }

    $postLink() {
    }

    getTime() {
        return new Date();
    }

}
