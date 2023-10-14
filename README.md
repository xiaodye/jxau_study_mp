# 江农学习星--技术文档（前端）

## 技术栈

**项目**为微信小程序，使用`uni-app(vue2)`框架+`vuex`+`uview-ui`，`scss`作为css预处理语言，图标采用了`iconfont`多色图标库和组件库自带的图标。

**后台管理系统**采用`Vue3`+`vuex`+`vue-router`+`element-plus`+`scss`技术栈。

**多人协作**采用`git`，远程仓库使用`gitee`。


**小程序后端**：https://gitee.com/chenzouquan/rc_learntime

**HbuilderX 版**：https://gitee.com/xiaodye/jxau_study_mp



## 首页

首页整个页面主体制作`双层Tab`，借助`swiper`组件来实现**全屏选项卡**，有三个**文章**、**视频**、**资源**三个模块，均已实现**分页按需加载**，即下拉加载更多。



子`tab`分为`最热`和`最新`，可以**`根据推荐算法推荐文章`**。



顶部为**搜索框**，可以跳转历史搜索页面，右下角有**写文章**的按钮，可跳转至发布文章页面。

![image-20230326220224661](https://s2.loli.net/2023/03/26/fLE3vwFePYuS2Rb.png)

### 文章模块

文章已实现的功能有：

- 文章浏览量
- 文章点赞、取消点赞
- 评论、点赞评论（取消点赞）
- 评论回复

**发布文章页面**可为用户提供发表文章的功能，一篇文章包括**标题**、**内容**、**图片（可上传多张图片，最多上传三张，默认第一张图片为文章封面）**、**标签（为推荐算法提供支持，最少一个，最多三个）**。用户提交后要经过后台管理员的审核才能正式上线至首页。



**历史搜索页**提供用户搜索文章的功能，拥有历史搜索功能（采用持久化存储到本地`Storage`，可一键清除所有历史记录），下方有十条热门文章推荐，可以跳转到对应的文章详情页。



在搜索框输入关键字即可跳转到搜索页**搜索出相关文章**。

### 视频模块

视频模块提供给用户观看视频的功能，目前暂时不支持用户上传视频。用户获取到视频列表后，将会**自动播放**第一条视频，视频默认静音播放。

### 资源模块

资源模块提供**下载文件并打开**的功能。从后台获取到文件资源列表后，用户可以下载文件至本地，实现的功能：

- 支持下载**进度条**显示，下载过程中已经做了**节流**处理，防止用户重复点击。
- 在后台与本地`Storage`和本地已保存的文件做了一层联系，可以做到用户下载文件后，以后不用二次下载便可以打开之前已下载的文件，即使是关闭小程序后再打开也无需再次下载。
- 如果**文件被删除或损坏**，将能捕获到异常，提示用户重新下载文件。

## 题库

整个页面上方分别有三个模块，对题目难度从`简单`、`中等`、`困难`进行了分类，下方为题目推荐列表，均已实现**分页按需加载**，其中下方题目推荐列表采用`scroll-view`中的**自定义下拉刷新功能**来实现**下拉刷新**。



其中每一项为一个**题组**，**题数不定**，分为**单选题**和**多选题**。

![image-20230326220130450](https://s2.loli.net/2023/03/26/nfKmDy7bX9v8Ll6.png)

### 答题

点击进入答题页面，其中的亮点功能有：

- 支持答题进度条显示，动画切屏，节流（防止用户切换题目过快越界）。
- 支持`单选题`和`多选题`两种题型，根据题目类型切换用户可执行的操作。
- 采用`map`数据结构类型去收集用户答案，用户可以进行**上一题**和**下一题**进行切换更改，不会丢失用户之前已作答的数据。
- **强制**用户答完所有题目（否则无法提交），用户如有遗漏题目，**可以提示用户哪些题目未完成**。

### 答题报告

用户答完所有题目后，提交答题卡至**后端**，后台生成答题报告返回至**前端**，前端拿到数据进行页面传参跳转至**答题报告页**。

答题报告页展示的数据：

- 用户的正确率

- 总题数、答对的题数、答错的题数

- 所有正确答案

  

### 查看解析

点击**查看解析**，可获取到全部题目的解析，其中解析页面的功能亮点有：

- 对用户做答情况进行区分（正确为绿色，错误为红色），增强用户体验。
- 点击可切换到对应的题目，节流、动画切屏。
- **添加错题本、取消添加**

## 登录、注册

用户体系采用`toekn`身份认证模式，进入小程序，将在`onLanch`生命周期检查**本地存储**是否有`token`，没有将会被强制跳转到**登录页面**。如果有`token`，将无需登录**直接进入主页**。如果在使用过程中，**token过期**或**token无效**将会被**响应拦截器**捕获并强制跳转**登录页**。



表单都做了严格的校验，并且做了**节流**，防止用户多次重复提交表单，用户信息将会被存储在`vuex`中统一管理。登录、注册使用`reLaunch`路由跳转，防止用户回退到登录、注册页面。

![image-20230326220952464](https://s2.loli.net/2023/03/26/Az5nGQC4HytYflg.png)

### 登录

支持三种登录方式。**微信一键登录**、**手机号验证码登录**、账号密码登录。如果**手机号未注册**，将会被注册并一键登录。



手机号登录有**倒计时提示**，防止用户**重复发送**，倒计时结束即可重新发送。

微信一键登录可获取微信账号的**昵称**和**头像**，作为用户的默认昵称和头像。



### 注册

支持用户名密码注册，用户名和密码都做了**正则表达式校验**，其中

- **用户名**：4-16位字母,数字,汉字,下划线 **汉字**可以两个
- **密码**：最短6位，最长12位 {6,12}，[a-z]  [A-Z] [0-9] [-_]

不符合规范将不能被提交注册。



如果**用户名已存在**，将会提示用户更换。



## 社区模块

社区模块主要包括：系统通知，收到的赞，回复，私信以及各大学习社区。

- **系统通知**：由系统发送通知给各个用户，了解最新动态。
- **收到的赞**：包括用户的评论，贴子，文章收到的点赞。
- **回复**：包括作者的文章评论和贴子评论的回复。
- **社区**：社区的种类较多，用户可以自己选择进入或加入某社区，进入之后可以查看当前社区中的所有贴子的内容。
- **私信**：其他用户像当前用户联系的方式，在私信中查看消息列表即可了解所有的私信内容，点击一条私信即可进入一个聊天页面，在websocket连接成功之后即可发送消息进行联络。

![image-20230326221050542](https://s2.loli.net/2023/03/26/WPI5BwGHELFtU3A.png)


## 个人中心

个人中心主要功能是查询和完善用户信息，统计学习时长，查看浏览记录，查看，创建和删除收藏夹，查看自己创作的博客文章和贴子，还可以使用错题本进行复习。

- **完善个人信息**：点击头像旁边的“详细信息”选项，进入信息选项页，用户可以根据需要修改自己的信息。
- **统计学习时长**：个人中心会显示记录的在线学习时长，包括单日和每周的学习时间。
- **浏览记录**：主要查看用户浏览过的贴子。
- **收藏夹**：用户可以根据需要创建收藏夹和删除收藏夹。
- **我的博客**：用户可以在此查看自己发表过的所有博客文章。
- **我的贴子**：与“我的博客”模块类似，用户可以在此处查看自己发表过的所有的贴子。
- **错题本**：用户之前练习的过程中添加的错题可以在此查看，若用户已经掌握则可以选择从错题本中移除指定的题目。
- **设置**：主要为用户提供了退出登录的功能。

![image-20230326221136245](https://s2.loli.net/2023/03/26/TZgp4QEkOjFhSJb.png)
