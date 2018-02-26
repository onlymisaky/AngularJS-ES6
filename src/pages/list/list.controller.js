import { getList } from './../../api/zhuhu-daily';

export default class List {
    constructor() {
        this.list = null;
    }

    $onInit() {
        this.getList();
    }

    getData() {
        return getList({}).then(response => {
            if (response.status === 200) {
                this.list = response.data;
            }
        });
    }

}
