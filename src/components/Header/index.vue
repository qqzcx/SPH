<template>
    <div>
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p>
                            <span>请</span>
                            <router-link to="./login">登录</router-link>
                            <router-link to="./register" class="register">免费注册</router-link>
                        </p>
                    </div>
                    <div class="typeList">
                        <a href="###">我的订单</a>
                        <a  @click="goShopCart">我的购物车</a>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <!-- <router-link class="logo" to="./home">
                        <img src="./images/logo.png" alt="">
                    </router-link> -->
                    <div @click="goHome"><img src="./images/logo.png"></img></div>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model.trim="keyword" />
    
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                    </form>
                </div>
            </div>
        </header>
    </div>
</template>
<script>
export default {
    name: 'Header',
    data() {
            return {
                keyword: '',
            }
        },
    methods: {
        //搜索按钮回调函数
        goSearch() {
            //路由传递参数:
            //第一种:字符串形式
            // this.$router.push('/search/'+ this.keyword + '?k='+this.keyword)
            //第二种:模板字符串
            // this.$router.push(`/search/${this.keyword }?k=${this.keyword}`)
            //第三种:对象
        
            //如果有query参数也要带进去 先整合
            // console.log(this.$route.query)
            const location = {
                name:'search',
                // 使用对象形式不能使用path传递params参数,必须命名name
                // path:'/search',  
                params:{keyword:this.keyword || undefined},
                query:this.$route.query
            }
            this.$router.push(location) 
        },
        goHome(){
            this.$router.push({path:'/home'})
        },
          //去购物车结算
        goShopCart() {
            this.$router.push({path:'/shopcart'})
    }
    },
     watch: {
         $route() {
            //监听search组件中删除关键字面包屑里的路由变化 清空搜索框的keyword
             if (this.$route.params.keyword === undefined || this.$route.params.keyword === '') {
                this.keyword = ''
        }
    
    },
  },
}

</script>

<style lang="less" scoped>
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>
