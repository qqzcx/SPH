<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseenter="enterShow" @mouseleave="leaveShow">
                <h2 class="all" >全部商品分类</h2>
                <div class="sort" v-show="show">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(c1, index) in categoryList.slice(0, 16)" :key="c1.categoryId"
                            :class="{ cur: currentIndex === index }">
                            <!-- :class="{cur:currentIndex === index 判断鼠标经过某一一级菜单 改变背景颜色 -->
                            <h3 @mouseenter="changeIndex(index)" @mouseleave="(currentIndex = -1)">
                                <a :data-caredoryName="c1.categoryName" :data-caregory1Id="c1.categoryId">{{
                                        c1.categoryName
                                }}</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-caredoryName="c2.categoryName" :data-caregory2Id="c2.categoryId">{{
                                                    c2.categoryName
                                            }}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-caredoryName="c3.categoryName"
                                                    :data-caregory3Id="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import throttle from 'lodash/throttle'; //引入throttle 节流函数

export default {
    name: 'TypeNav',
    data() {
        return {
            //存储用户鼠标经过某一级分类的index值
            currentIndex: -1,
            //控制三级联动菜单是否展示下拉 默认展示
            show: true,
        }
    },
    //组件挂载完毕，向服务器发送请求获取数据
    mounted() {
        //如果不在home组件上 则隐藏三级联动菜单下拉 show = false
        if (this.$route.path !== '/home') {
            this.show = false
        }
    },
    methods: {
        //鼠标经过修改响应式数据currentIndex
        // throttle节流
        changeIndex: throttle(function (index) {
            //index 鼠标移到某一一级元素的index值
            this.currentIndex = index
            // console.log('进入了'+index);
        }, 50),
        goSearch(e) {
            // goSearch写在父盒子上利用事件的委派传递到子元素的a标签上 提升性能
            // 父盒子里有很多元素 给a标签添加自定义属性 :data-caredoryName 来进行区分
            // 通过e.target获取节点 通过e.target.dataset获取自定义属性 进行判断
            const attribute = e.target.dataset //获取所有自定义属性
            const { caredoryname, caregory1id, caregory2id, caregory3id } = attribute //解构赋值
            if (caredoryname) {  //区分自定义属性caredoryname的a标签
                //整理路由跳转的参数
                // 跳转路径
                const location = { name: 'search' }
                // query参数
                const query = { categoryName: caredoryname }

                if (caregory1id) {  //区分一级 二级 三级 菜单
                    query.category1Id = caregory1id
                    // console.log('一级菜单');
                } else if (caregory2id) {
                    query.category2Id = caregory2id
                    // console.log('二级菜单');
                } else if (caregory3id) {
                    query.category3Id = caregory3id
                    // console.log('三级菜单');
                }
                //整理完参数 
                // console.log(location)
                //路由跳转
                //要先进行判断 如果有params参数也要带进去
                // if(this.$route.params.keyword){
                //     // console.log('params有参数')
                //     location.params = this.$route.params 
                //     location.query = query
                //     this.$router.push(location)
                // } else {
                    // console.log('params无参数')
                    location.query = query
                    this.$router.push(location)
                // }

               
            }
        },
        //当鼠标移入时 让商品列表进行展示
        enterShow() {
            if (this.$route.path !== '/home') {
                this.show = true
            }
        },
        //当鼠标移出时 让商品列表进行隐藏
        leaveShow() {
            if (this.$route.path !== '/home') {
                this.show = false
            }
        }
    },
    computed: {
        ...mapState({
            //右侧需要的是一个函数，当使用这个计算属性的时候右侧函数会立即执行一次
            // 注入一个参数state(大仓库中的数据)
            categoryList: (state) => {
                return state.home.categoryList
            }
        })
    },
}
</script>
<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .cur {
                    background-color: skyblue;
                }

                .item {
                    h3 {
                        line-height: 29px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }
    }
}
</style>
