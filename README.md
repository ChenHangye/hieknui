# hieknui

## 安装说明
```npm
bower install hieknui
```

## 一、基础使用说明

[Demo][demo-url]
 
#### 1、基本使用方法

* 在页面`<head>`里引入以下文件:

```html
<link href="<pathTo>/hieknui.min.css" rel="stylesheet">
<script src="<pathTo>/hieknui.min.js"></script>
```

#### 2、使用其他内置主题色

新建less文件，并引入以下代码生成新的css
```less
@import "dist/hieknui.less";
@primary: 'purple'
```
目前仅提供：seagreen(默认)、blue、red、black、purple、yellow


#### 3、使用暗色主题（实验性质）

新建less文件，并引入以下代码生成新的css
```less
@import "dist/hieknui.less";
@import "dist/theme/dark";
```

#### 4、使用less变量
在需要使用define的less文件中引入以下代码
```less
@import "dist/define";
```

## 二、控件使用说明

#### 1、图标字体使用
* 在页面`<head>`里额外引入以下文件:

```html
<link href="<pathTo>/iconfont.css" rel="stylesheet">
```
* 在需要使用的位置插入以下内容：

```html
<i class="icon hufont ic-account-balance-wallet"></i>
```
[Icon Demo][demo-url-icon]

#### 2、标签页使用

* 在需要使用的位置插入以下内容：

```html
<ul class="hu-tabs tabs-primary">
    <li class="active"><a href="#tab-1">标签页1</a></li>
    <li class=""><a href="#tab-2">标签页2</a></li>
    <li class=""><a href="#tab-3">标签页3</a></li>
</ul>
<div class="hu-tab-content">
    <div class="tab-pane active" id="tab-1">
        标签页1的内容
    </div>
    <div class="tab-pane" id="tab-2">
        标签页2的内容
    </div>
    <div class="tab-pane" id="tab-3">
        标签页3的内容
    </div>
</div>
```
[Tab Demo][demo-url-tab]

#### 3、按钮使用

* 在需要使用的位置插入以下内容：

```html
<button class="hu-btn btn-primary">btn-primary</button>
```
* 其他形式参照以下

[Button Demo][demo-url-btn]

#### 4、单选框使用

* 在需要使用的位置插入以下内容：

```html
<label for="id111" class="hu-radio">
    <input type="radio" id="id111" name="radio" checked>
    <span>radio-checked</span>
</label>
```
* 其他形式参照以下

[Radio Demo][demo-url-radio]

#### 5、多选框使用

* 在需要使用的位置插入以下内容：

```html
<label for="id222" class="hu-checkbox">
    <input type="checkbox" id="id222" checked>
    <span>checkbox-checked</span>
</label>
```
* 其他形式参照以下

[Checkbox Demo][demo-url-checkbox]

#### 6、文本框使用

* 在需要使用的位置插入以下内容：

```html
<input type="text" class="hu-input input-primary" placeholder="input-primary">
```
* 其他形式参照以下

[Input Demo][demo-url-input]

#### 7、加载使用

* 在需要使用的位置插入以下内容：

```html
<div class="hu-spin-container">
    <div class="hu-spin"></div>
</div>
```
* 其他形式参照以下

[Spin Demo][demo-url-spin]

#### 8、卡片使用

* 在需要使用的位置插入以下内容：

```html
<div class="hu-card">
    <div class="hu-card-body">
        这是基本卡片
    </div>
</div>
```
* 其他形式参照以下

[Card Demo][demo-url-card]

#### 9、栅格使用

* 在需要使用的位置插入以下内容：

```html
<div class="hu-row hu-gutter-16">
    <div class="hu-col-lg-6 hu-col-md-12">
        <div>hu-col-lg-6 hu-col-md-12</div>
    </div>
    <div class="hu-col-lg-6 hu-col-md-12">
        <div>hu-col-lg-6 hu-col-md-12</div>
    </div>
    <div class="hu-col-lg-6 hu-col-md-12">
        <di>hu-col-lg-6 hu-col-md-12</div>
    </div>
    <div class="hu-col-lg-6 hu-col-md-12">
        <div>hu-col-lg-6 hu-col-md-12</div>
    </div>
</div>
```
* 其他形式参照以下

[Layout Demo][demo-url-layout]

#### 11、分页使用

* 在需要使用的位置插入以下内容：

```js
new huPagination({
     selector: '#page-1',
     total: 100,
     current: 1,
     callback: function (event,pageNo,data) {
         console.log(pageNo);
     }
 });
```
* 其他形式参照以下

[Pagination Demo][demo-url-pagination]

#### 12、标签使用

* 在需要使用的位置插入以下内容：

```html
<div class="hu-tag">tag</div>
```
* 其他形式参照以下

[Tag Demo][demo-url-tag]

#### 13、开关使用

* 在需要使用的位置插入以下内容：

```html
<label class="hu-switch" for="switch5">
    <input type="checkbox" id="switch5" checked>
    <span></span>
    <i></i>
</label>
```
* 其他形式参照以下

[Switch Demo][demo-url-switch]

#### 14、下拉菜单使用

* 在需要使用的位置插入以下内容：

```html
<div class="hu-dropdown dropdown-md">
    <span>dropdown-md</span>
    <ul class="hu-dropdown-items dropdown-md">
        <li>dropdown-xs</li>
        <li>dropdown-sm</li>
        <li class="active">dropdown-md</li>
        <li>dropdown-lg</li>
    </ul>
</div>
```
* 其他形式参照以下

[Dropdown Demo][demo-url-dropdown]

#### 15、回到顶部使用

* 在需要使用的位置插入以下内容：

```html
<div class="hu-backtop"></div>
```
* 其他形式参照以下

[Backtop Demo][demo-url-backtop]

#### 16、下拉选项使用

* 在需要使用的位置插入以下内容：

```html
<div class="hu-select select-md">
    <span>select-md</span>
    <ul class="hu-select-items select-md">
        <li hu-data-value="1">select-xs</li>
        <li hu-data-value="2">select-sm</li>
        <li class="active" hu-data-value="3">select-md</li>
        <li hu-data-value="4">select-lg</li>
    </ul>
</div>
```
* 其他形式参照以下

[Select Demo][demo-url-select]

#### 17、表格使用

* 在需要使用的位置插入以下内容：

```html
<table class="hu-table" width="100%">
    <thead>
        <tr>
            <th>标题</th>
            <th class="center">发布时间</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>我是标题我是标题我是标题我是标题我是标题</td>
            <td class="center">2017.08.12</td>
            <td>
                <a href="javascript:;">删除</a>
                <a href="javascript:;">编辑</a>
            </td>
        </tr>
        <tr>
            <td>我是标题我是标题我是标题我是标题我是标题</td>
            <td class="center">2017.08.12</td>
            <td>
                <a href="javascript:;">删除</a>
                <a href="javascript:;">编辑</a>
            </td>
        </tr>
        <tr>
            <td>我是标题我是标题我是标题我是标题我是标题</td>
            <td class="center">2017.08.12</td>
            <td>
                <a href="javascript:;">删除</a>
                <a href="javascript:;">编辑</a>
            </td>
        </tr>
    </tbody>
</table>
```
* 其他形式参照以下

[Table Demo][demo-url-table]

[demo-url]: https://jiangrun002.github.io/hieknui/docs/demo.html
[demo-url-btn]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-1
[demo-url-radio]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-2
[demo-url-checkbox]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-3
[demo-url-input]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-4
[demo-url-spin]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-5
[demo-url-card]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-6
[demo-url-layout]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-7
[demo-url-pagination]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-8
[demo-url-tag]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-9
[demo-url-switch]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-10
[demo-url-dropdown]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-11
[demo-url-backtop]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-12
[demo-url-select]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-13
[demo-url-table]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-14
[demo-url-icon]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-15
[demo-url-tab]: https://jiangrun002.github.io/hieknui/docs/demo.html#tab-16