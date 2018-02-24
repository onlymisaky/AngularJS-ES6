尝试用`ES6/ES7`+`webpack`为`angularJS`写一个seed。

```bash
npm run i # 安装依赖
npm run dev # 开发模式，暂时不可用
npm run build # 打包
```

## 开发日记

### 1、目录结构

项目的目录结构决定了整个项目的风格，下面是整体的目录结构图：

```
angularjs-es6
├── build
├── config
├── src
│   ├── api
│   ├── assets
│   │   └── styles
│   ├── components
│   │   ├── hello-world
│   │   │   ├── hello-world.component.js
│   │   │   ├── hello-world.controller.js
│   │   │   ├── hello-world.html
│   │   │   └── hello-world.module.js
│   │   └── components.module.js
│   ├── directives
│   ├── pages
│   │   ├── index
│   │   │   ├── index.component.js
│   │   │   ├── index.controller.js
│   │   │   ├── index.html
│   │   │   ├── index.router.js
│   │   │   └── index.module.js
│   ├── router
│   ├── utils
│   ├── index.html
│   └── index.js
├── static
└── package.json
```

这个结构是在综合了多个项目和个人的经验构建出来的，现在你可能不是很明白为什么要这样设计，不要着急，你只要先总体的看一下它的结构，对它有一个大概的感知即可，继续往下读，你会明白为什么这样设计。

### 2、去除不必要的

从上面的目录结构你也许能猜出一些目录的作用，比如`components`里面肯定是放组件的，`directives`里面是放指令的，但是好像还少了一些，比如`filter`、`service`这些，它们是angularJS众多概念中比较常见的，但不见得是好用的，所以我并没有将它们归入其中，不必担心我们也找到了替代方案。

#### filter

`filter`是极为消耗性能的，在`$digest`过程中，filter会执行很多次，至少两次，在很多关于angularJS的讨论中，都不推荐使用它。

其实`filter`的作用就是处理数据，当你你需要处理数据的时候，你可以写一些专门处理数据的函数，然后在控制器中调用它，而视图只负责显示数据。

所以切记不要在视图中使用`filter`。

#### service

自定义服务主要分为以下五种:
1. provider
2. service
3. factory
4. constant
5. value

首先要了解， `service`、`factory`、`value`都是`provider`二次封装而来，功能相似只是写法不同，另外`provider`可以在`config`中注入，`constant`则是angularJS为方便我们定义常量而设计，在没有模块化的环境下确实很好用，但是在ES6中，我们可以利用`const`关键字配合模块化轻松实现它。

在开发中,自定义服务的作用主要有两点:
1. 工具方法
2. 共享数据

第一点完全不需要去考虑，我们可以像处理`filter`那样去做。第二点是要稍微花点功夫去解决的。

为什么`service`可以共享数据，因为angularJS将它设计成了`单例模式`，而且它和`controller`不同，`service`在关闭的时候才能销毁，`controller`不用的时候就会被销毁。

这不禁让我想到了vue的`vuex`,我们是不是也可以利用`service`来实现一个`angularx`呢？或者我们单独实现一个`x`,来管理状态。

当然，还是不要去造太多的轮子了，这里我们可以直接使用[ng-redux](https://github.com/angular-redux/ng-redux)。

---

如果确实有使用`service`和`filter`的场景或需求，也可以在项目中新建对应的文件夹。

### 3、控制器的写法

angularJS 1.2版本开始提供了一个`controllerAs`语法，让`controller`成为了一个纯净的`ViewModel`（视图模型，以下简称`vm`），而且angularJS是通过`new`关键字把它当成构造函数来调用的，所以我们可以用ES6提供的语法糖`class`来创建控制器。

```javascript
// a.controller.js
class A {
    constructor($http) {
        this.$http = $http;
        this.name = '';
    }
    $onInit() {
        this.getName();
    }
    getName() {
        this.$http.get('/getName').then(response => {
            this.name = response.data;
        });
    }
}

A.$inject = ['$http'];
```

### 4、component、module

这一部分是最重要的，也是我调研时间最久的。

我先考虑到的只有`component`，但是随着思路的延伸不得不思考一下`modeule`。

先看一下我最初的写法：

假设我们要创建一个`a组件`，实现`a组件`需要三个文件:
1. a.html (组件的视图模板)
2. a.controller.js (组件的控制器，上面控制器的内容完全相同)     
3. index.js (组件的声明和导出)

```javascript
import template from './a.html';
import controller from './a.controller';
export default {
    controller,
    template
}; 
```

思路很明显，并不是先创建组件，而是把组件的声明写好，然后导出，需要用到的时候再创建，这和`vue`的[局部注册](https://cn.vuejs.org/v2/guide/components.html#%E5%B1%80%E9%83%A8%E6%B3%A8%E5%86%8C)很像，但是有一个问题，假如在`a组件`中我们需要用到`b组件`,那该怎么写呢？

```html
<!-- a.html -->
<div>
    你好{{ $ctrl.name }}
    <b></b>
</div>
```

上面的写法要想不报错，必须满足一个条件，那就是系统中已经有`b组件`了，所以我们就要`在a组件所在的module中注册b组件`，或者`a组件所在的module依赖b组件所在的module`，但是上面声明组件的写法就注定这两种都不好实现，原因如下：

1. a组件只是一个声明，不是angularJS的module，无法注册组件
2. 在创建a组件的时候，并不知道他要依赖于其它的哪些组件

出现这样棘手的问题，要完全归咎于angularJS蹩脚的模块机制，因为angularJS的`module`和ES6的`module`是不一样的，并且脱离了文件系统，不能动态注入，它能为我们提供具体的依赖关系。

---

为解决这个问题，我曾想过将整个项目设计成以只有一个`module`，将这个`moudel`定义在最外层的`app.js`中：
```javascript
// app.js
import angular from 'angular';

export default angular.module('app', []);
```

```javascript
// a/index.js
import app from '../../app';

import './../b';

import template from './a.html';
import controller from './a.controller';

const ddo = {
    controller,
    template
};

app.component('a', ddo);
```
这样做不仅解决上面的问题，还可以更方便的管理第三方的依赖，假设我们的项目需要用到[ui-router](https://ui-router.github.io/ng1/)和[ui-bootstrap](https://angular-ui.github.io/bootstrap/)只要在`app.js`中注入即可：

```javascript
import angular from 'angular';

import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';

export default angular.module('app', [uiRouter, uiBootstrap]);
```

这样做看似是完美的，但是这是由外入内的模块化，然后再通过`router`由内到外的组织起来，容易让人摸不着头脑，而且代码中会充斥着很多`import 'xxxx';`这样的代码段，这无疑给维护的人来带来了不小的麻烦，因为他不知道为什么要`import`，也不知道`import`的内容用在了哪，这种没有指明依赖关系的模块化让代码变得不可控。

---

又或许可以参照`vue`的方式来改造一下：

```javascript
// a/index.js
import b './../b';

import template from './a.html';
import controller from './a.controller';

export default {
    controller,
    template,
    components: { b }
};
```

在创建`a组件`的时候通过对`a.components`判断，来为其创建好所依赖的组件，这一步操作应该是在路由中来完成的，因为路由是这个组件的最终呈现载体，除了路由不会在出现对它的更深层次嵌套了。到这里你可能会和我一样想到另外一个问题：嵌套过多会不会影响性能？答案是肯定的，因为你要循环查找`a.components.components.components`，然后在循环创建查找到组件，其实一般情况不会消耗太多型性能，但是这种做法破坏了angularJS的书写形式，不应该被提倡，如果有一天angularJS的api更新了（目前来看发生的可能性为0），恰好影响到了我们之前的写法，这样升级的成本就会变得很高。

---

上面的两种做法都有一个相同点，那就是在整个系统中，我们指定义了一个`module`，而在我所有调研的项目中，几乎都是清一色的使用了多`module`的方式，既一个组件就是一个`module`,这种做法优点和缺点都和明显。

优点：

1. 更小的粒度方便编写单元测试。
2. 更贴近模块化方式和思维。
3. 易于维护和扩展，代码在可控范围内。
4. 更轻松的升级过渡到Angular（Angular2.x、Angular4.x、Angular5.x）
5. ...

缺点：

1. 代码量相较多（每一个模块都有引入angular）
2. 管理第三方依赖成本较高（其实和第一点一样的）
3. 框架的痕迹太重
4. 模块数量过多时必然会造成模块名称过长或者模块名称冲突

最终我还是选择了第三种方案，因为它和上面两个方面相比有一个显著的优势，那就是可维护性，具体代码可参阅[hello-world组件](./src/components/hello-world/hello-world.module.js)。


### 5、directive

有了`component`的实践后，`directive`就更加简单了。

首先要知道`component`是由`directive`封装而来的，在1.5版本之前，`directive`又当组件用，又用来操作dom，但是有了`component`之后，该解放它了。

所里这里`directive`的任务就是`操作dom`,当你必须要操作dom的时候，你可以用它。

为了让代码更好维护，我们还可以对`directive`的声明加一些约定，比如`restrict`只能是`A`，没有`template`(`templateUrl`)、`controller`、`controllerAs`属性等等，这些约定可以是口头约定，也可以再打包的时候校验一下。

同时一个`directive`也是一个`module`：

```javascript
import angular from 'angular';

const ddo = {
    restrict: 'A',
    scope: {},
    link(scope, element, attrs) { }
}

export default angular
    .module('app.directives.slider')
    .directive('slider', () => ddo)
    .name;
```

### 6、router

[ui-router](https://ui-router.github.io/ng1/)绝对是angularJS的标配了，它最大的优势就是解决了路由的嵌套。

`ui-router`还支持[Route to component](https://ui-router.github.io/ng1/tutorial/hellosolarsystem)，所以这里所有的页面都是组件，但是和前面所提到的组件不同的是，这些组件都是有状态的`路由组件`，因此为它们单独开了一个`pages`目录，这些组件的会在`module`文件中注册好路由，具体代码请参阅[index页面](./src/pages/index/index.module.js)。

### 7、项目构建

项目构建当然使用标题中的[webpack](https://webpack.js.org/)，我觉的webpack配置是一门玄学，所以我顺便又把它再学了一遍，希望早日出现一个替代它的工具:smirk::smirk::smirk:。

这一步写的比较烂，后面会逐步优化构建脚本。

## 参考 
- [AngularJS styleguide (ES2015)](https://github.com/toddmotto/angularjs-styleguide)
- [Angular 1.x和ES6的结合](https://github.com/xufei/blog/issues/29)
- [Angular1.x + ES6 开发风格指南](https://github.com/kuitos/kuitos.github.io/issues/34)
- [Angular沉思录（三）Angular中的模块机制](https://github.com/xufei/blog/issues/17)
- [基于ui-router的非侵入式angular按需加载方案](https://github.com/kuitos/kuitos.github.io/issues/31)


## 其它
[angular-1-5-components-app](https://github.com/toddmotto/angular-1-5-components-app)
