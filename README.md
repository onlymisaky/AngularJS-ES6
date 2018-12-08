一个用 `AngularJS` + `es6/es7` + `webpack` 构建的种子项目。

该项目只有两个页面，目的是为了展示如何使用主流的方式开发 `AngularJS` 应用。

<a href="http://onlymisaky.gitee.io/angularjs-es6"  target="_blank">在线地址</a>

## 截图

![首页](https://s1.ax1x.com/2018/04/03/CpmYex.png)

![列表页](https://s1.ax1x.com/2018/04/03/Cpmtw6.png)

## 用法 

1. 下载到本地
```bash
git clone https://github.com/onlymisaky/angularjs-es6-seed.git
```

2. 切换到项目目录
```bash
cd angularjs-es6-seed
```

3. 安装依赖，这一步很慢，耐心等待即可，如长时间没有安装好，请尝试用 [cnpm](https://npm.taobao.org/) 安装
```bash
npm i --registry=http://r.cnpmjs.org/
```
4. 启动服务
```bash
npm run dev
```
5. 打包
```bash
npm run build
```
6. 如果在执行 **第4** 或 **第5** 步的过程中提示 *node-sass* 错误，请使用下面的命令重新 build node-sass ，build 完成后再次使用   **第4** 或 **第5** 的命令即可
```bash
npm rebuild node-sass
```

**提示**

原则上，不建议用 [cnpm](https://npm.taobao.org/) 安装依赖，因为用 cnpm 安装依赖后，再用 vscode 打开项目会导致 cpu 狂飙至 100% ，这个锅应该是 cnpm 的。 详情可以查看这两个 issues : 

[When using cnpm/pnpm, rg uses lots of CPU #35659](https://github.com/Microsoft/vscode/issues/35659) 

[Use search.followSymlinks for all searches #37000](https://github.com/Microsoft/vscode/issues/37000)

如果由于网络问题，不得不使用 cnpm ，恰巧你的开发工具可是 vscode ,那么请用下面两种方式解决：

第一种方式 : 在 `cnpm i` 完成后，打开 vscode 将**设置**中的 **search.followSymlinks** 修改为 **false** 。

第二种方式 : 在 cnpm 命令后面添加参数，即使用 `cnpm i --by=npm` 来安装。

另外也不推荐用 taobao 的源安装，他的速度还没 cnpm 的快。

## 开发日记

### 1、目录结构

项目的目录结构决定了整个项目的风格，下面是整体的目录结构图：

![项目结构](https://s1.ax1x.com/2018/12/09/F80RVH.png)

这个结构是在参考的了 Angular 项目结构的基础上结合个人的经验构建出来的，现在你可能不是很明白为什么要这样设计，不要着急，你只要先总体的看一下它的结构，对它有一个大概的了解即可，继续往下读，你会明白为什么这样设计。

### 2、模块设计

这里采用了多模块设计，angularjs 的 module 一直饱受病诟，它希望开发者通过 angular.module 来对项目进行更合理的划分，但是这个 module 实在是太弱了。首先它是脱离了文件系统的，而 es6 的 module 则是完全基于文件来设计的，一个 .js 文件就是一个 esModule ，所以当这两个结合到一块的时候，还是有些怪异的。其次 angular.module 顶多算是一个不可检测的命名空间，何为不可检测？就是当你拿到这个 module 的时候，你不知道这个 module 下面到底有哪些东西，另外当你想在 moduleA 下面注册 MyService 的时候，可能 moduleA 依赖了 moduleB ，而 moduleB 可能已经注册了一个功能不一样的 MyService ，这些你明白什么叫不可检测了吧。造成这个原因主要是因为在 angularjs 诞生的时候，还有 esModule 的概念。

既然 angular.module 这么弱，为什么还要用它呢，干脆在整个项目中只用一个 module，这样不就可以最小化上面的那些问题了吗。的确可以这样，但是这样一来，我们打包出的文件体积就太大了，也许你想到了用按需加载的方式来切分代码，但是在 angularjs 中，只有 module 可以动态加载，而且 component 等等都是在项目启动的时候就已经创建好了，如果你想动态的加载一个 component ，你只能去动态的加载注册这个 component 的 module 。所以这个 module 虽然不好用，但是又不得不用。

在整个项目中，首先定义了个三个 module ：

1. 根模块：`angular.module('app')` 
2. 通用模块：`angular.module('app.common')` 用于注册一些通用的 service、component等
3. 路由模块：`angular.module('app.router')` 配置路由和路由钩子

这三个 module 是在首次启动的时候就创建好了，所以在这个三个 module 中注册的 service、component等都是可以在整个项目中直接使用的，其次是每一个页面可以定义为一个 module ，这里建议将每一个顶级的路由对应的所有代码都放在一个 module 中，然在 router module 中根据需求直接 require 这个 module 或者使用 oclazyload 动态加载。如果项目加大，可以具体到每一个组路由定义为一个 module 。

### 3、干掉filter

`filter` 也是一个饱受争议的设计，虽然它很有用也很好用，但是极为消耗性能的，在 `$digest` 过程中，filter会执行很至少两次，在很多关于angularJS的讨论中，都不推荐使用它。

其实 filter 的作用就是转换数据，当你需要处理数据的时候，你可以写一些专门处理数据的函数，然后在 controller 或者 service 中调用它，而视图只负责显示数据。

### 4、新的写法

#### service

在 angularjs 中，注册一个自定义服务有三种写法：`provider`、`factory`、`service` ，我们都知道 factory 和 service 都是基于 provider 封装的。而 service 的写法是最适合用 es6 的 class 来写：

```javascript
export class UserService {

  static $inject = ['$http'];

  constructor($http) {
    this.$http = $http;
  }

  getUser(userId) {
    return this.$http
      .get(`/user/${userId}`)
      .then(response => {
        if (response.status === 200) {
          return response.data;
        }
      });
  }
}
```

#### controller

AngularJS 1.2 版本开始提供了一个 `controllerAs` 语法，让 `controller` 成为了一个纯净的 `ViewModel` ，而且 AngularJS 是通过 `new` 关键字把它当成构造函数来调用的，所以 controller 的写法和 service 完全一样：

```javascript
class UserController {

  static $inject = ['$stateParams', 'UserService'];

  user;

  constructor($stateParams, UserService) {
    this.UserService = UserService;
    this.userId = $stateParams.id;
  }

  $onInit() {
    this.UserService
      .getUser(this.userId)
      .then(user => this.user = user);
  }
}
```

#### 更安全的注册

什么叫更安全的注册呢，我们以上面的 UserService 为例，虽然我们我们创建的类名为 UserService ，但在将 UserService 导入到 module 的是时候，我们可以注册为 XxxService ：

```javascript
import { UserService } from './user.service';
angular
  .module('user')
  .service('XxxService', UserService);
```

这样一来就全乱了套了，那样才能避免这样的情况呢？angularjs 的 .service 、 .component、 .directive 等方法除了可以用 `userModule.service('UserService', UserService)` 的写法注册，还可以用对象的方式注册 `userModule.service({UserService: UserService})` 。利用对象方式的写法，我们可以 es6 的属性的简洁表示法来注册 `userModule.service({UserService})` ，通过这种学法来注册 service、component、directive 这样就可以避免上述情况发生了。

### 5、router

[ui-router](https://ui-router.github.io/ng1/) 绝对是 AngularJS 的标配了，它最大的优势就是解决了路由的嵌套。

 `ui-router` 还支持 [Route to component](https://ui-router.github.io/ng1/tutorial/hellosolarsystem) ，所以项目里所有的页面都是组件。

### 6、按需加载

前面提到，在 angularjs 中按需加载的最小单位是 ngModule ，所以如果需要按需加载的话，将按需加载的代码用一个新的 angular.module 包装一下，然后通过 [oclazyload](git://github.com/ocombe/ocLazyLoad.git) 来加载 ngModule 。这里建议在路由层面做按需加载，具体代码可以查看 [routes.js](https://github.com/onlymisaky/angularjs-es6-seed/blob/master/src/router/routes.js) 。

### 7、未解决的问题

#### css Module
其实我已经有相应的解决方案了，我们可以在控制器中引入样式，然后将样式挂在 `vm` 上，然后在 `view` 中使用，具体的写法如下
```javascript
import styles from './a.css';
class User {
  constructor() {
    this.styles = styles;
  }
}
```
```html
<div class="{{ ::$ctrl.styles['text-center'] }}"></div>
```
```css
.text-center {
  text-align: center;
}
```
在我看来这种实现方式是在是太惨不忍睹了，所以暂时用 **id选择器** 方式解决。

## 参考 
- [AngularJS styleguide (ES2015)](https://github.com/toddmotto/angularjs-styleguide)
- [Angular 1.x和ES6的结合](https://github.com/xufei/blog/issues/29)
- [Angular1.x + es6 开发风格指南](https://github.com/kuitos/kuitos.github.io/issues/34)
- [Angular沉思录（三）Angular中的模块机制](https://github.com/xufei/blog/issues/17)
- [基于ui-router的非侵入式angular按需加载方案](https://github.com/kuitos/kuitos.github.io/issues/31)
- [Lazy load AngularJS with Webpack](https://michalzalecki.com/lazy-load-angularjs-with-webpack/)
- [angular-1-5-components-app](https://github.com/toddmotto/angular-1-5-components-app)
