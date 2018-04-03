import { getList } from '@/api/zhuhu-daily';

export default class List {
    constructor($scope) {
        this.$scope = $scope;
        this.newsList = null;
    }

    $onInit() {
        this.getData();
    }

    getData() {
        getList({}).then(data => {
            const idList = [];
            const list = [];
            if (data) {
                // 此处所做的数据处理是为了尽量获取高清的图片
                [...data.top_stories, ...data.stories].forEach(v => {
                    if (!idList.includes(v.id)) {
                        idList.push(v.id);
                        v.image = v.image || v.images[0];
                        list.push(v);
                    }
                });
            }
            // 由于用 axios 代替了 angularJS 内置的 $http ,
            // 所以在回调里面要用手动调用 $apply 来更新视图
            this.$scope.$apply(() => {
                this.newsList = list;
            });
        });
    }
}

List.$inject = ['$scope'];
