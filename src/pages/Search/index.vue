<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li
              class="with-x"
              v-if="
                searchParams.categoryName !== '' &&
                searchParams.categoryName !== undefined
              "
            >
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li
              class="with-x"
              v-if="
                searchParams.keyword !== '' &&
                searchParams.keyword !== undefined
              "
            >
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li
              class="with-x"
              v-if="
                searchParams.trademark !== '' &&
                searchParams.trademark !== undefined
              "
            >
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 属性面包屑-->

            <li
              class="with-x"
              v-for="(item, index) in searchParams.props"
              :key="index"
            >
              {{ item.split(":")[2] }}:{{ item.split(":")[1]
              }}<i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @attr="attr" @trademark="trademark" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: this.searchParams.order.includes('1') }"
                  @click="zonghe"
                >
                  <a href="#">{{ zh }}</a>
                </li>
                <li
                  :class="{ active: this.searchParams.order.includes('2') }"
                  @click="jiage"
                >
                  <a href="#">{{ jg }}</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a @click="goDetail(good.id)"
                      ><img :src="good.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a @click="goDetail(good.id)" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div> -->
          <div class="page">
            <el-pagination
              background
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="total"
              @current-change="current"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      //传给服务器的params参数
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
      zh: "综合↑",
      jg: "价格",
    };
  },
  methods: {
    //向服务器发送请求 通知Vuex把获取的floor数据存放到仓库当中
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //删除分类面包屑
    removeCategoryName() {
      this.searchParams.categoryName = "";
      //修改浏览器路径 骚操作：路由自己跳转自己 修改query参数 保留params参数
      this.$router.push({ name: "search", params: this.$route.params });
      //由于watch监听路由变化 自动整理数据并再次发送请求
    },
    //删除关键字面包屑
    removeKeyword() {
      this.searchParams.keyword = "";
      //修改浏览器路径 骚操作：路由自己跳转自己 修改params参数 保留query参数
      this.$router.push({ name: "search", query: this.$route.query });
      //由于watch监听路由变化 自动整理数据并再次发送请求
    },
    //删除品牌面包屑
    removeTrademark() {
      this.searchParams.trademark = "";
      //再次发送请求
      this.getData();
    },
    //删除属性面包屑
    removeProps(index) {
      this.searchParams.props.splice(index, 1);
      //再次发送请求
      this.getData();
      // this.searchParams.trademark = "";
      // //再次发送请求
      // this.getData();
    },
    //自定义trademark事件获取子组件SearchSelector中的trademark参数
    trademark(value) {
      //整理添加字段
      this.searchParams.trademark = `${value.tmId}:${value.tmName}`;
      //再次发送请求
      this.getData();
    },
    //自定义attr事件获取子组件SearchSelector中的attr参数
    attr(id, name, value) {
      //整理添加字段
      let str = `${id}:${value}:${name}`;

      //数组去重 方法一
      let flag = true;
      // 判断this.searchParams.props数组长度 如果为0则直接添加 否则判断添加或者替换
      if (this.searchParams.props.length === 0) {
        this.searchParams.props.push(str);
        flag = false;
      } else {
        for (let i = 0; i < this.searchParams.props.length; i++) {
          // console.log(this.searchParams.props[i].split(":")[0]);
          if (this.searchParams.props[i].split(":")[0] == id) {
            //如果id相等 则替换
            this.$set(this.searchParams.props, i, str);
            // this.searchParams.props[i] = str;
            flag = false;
          }
        }
      }
      if (flag) {
        this.searchParams.props.push(str);
      }
      //数组去重 方法二 includes方法
      // 1.数组 字符串也同理
      // includes 可以判断一个数组中是否包含某一个元素，并返回true 或者false
      // ['a','b','c'].includes('a')
      // true

      //再次发送请求
      this.getData();
    },
    //综合排序
    zonghe() {
      if (
        this.searchParams.order.includes("desc") ||
        this.searchParams.order === ""
      ) {
        this.searchParams.order = "1:asc";
        this.zh = "综合↑";
        this.jg = "价格";
        this.getData();
      } else {
        this.searchParams.order = "1:desc";
        this.zh = "综合↓";
        this.jg = "价格";
        this.getData();
      }
    },
    jiage() {
      if (
        this.searchParams.order.includes("desc") ||
        this.searchParams.order === ""
      ) {
        this.searchParams.order = "2:asc";
        this.jg = "价格↑";
        this.zh = "综合";
        this.getData();
      } else {
        this.searchParams.order = "2:desc";
        this.jg = "价格↓";
        this.zh = "综合";
        this.getData();
      }
    },
    //分页器页数改变
    current(pageNo) {
      console.log("current", pageNo);
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
    //跳转商品详情
    goDetail(id) {
      // console.log(id);
      this.$router.push({ name: 'detail', params: { skuid: id } })
    },
  },
  beforeMount() {
    // 把route里的query和parmas参数赋值到searchParams
    // 方法一 直接赋值
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.params.keyword;
    // 方法二 Object.assign(a,b,c):ES6新增语法 将b c对象合并到a
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    //向服务器发送请求 通知Vuex把获取的floor数据存放到仓库当中
    this.getData();
    // console.log(this.searchParams);
  },
  computed: {
    //mapGetters里面的写法：传递的数组 因为getters计算没有分模块
    ...mapGetters([
      "goodsList",
      "attrsList",
      "trademarkList",
      "pageNo",
      "pageSize",
      "total",
      "totalPages",
    ]),
  },
  watch: {
    //监听路由变化 再次整理数据并发送请求
    $route() {
      // 清空一下searchParams的cartegoryId
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      //整理数据
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //发送请求
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .zcx {
          display: inline-block;
        }

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    // margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      // .page {
      //   width: 733px;
      //   height: 66px;
      //   overflow: hidden;
      //   float: right;

      //   .sui-pagination {
      //     margin: 18px 0;

      //     ul {
      //       margin-left: 0;
      //       margin-bottom: 0;
      //       vertical-align: middle;
      //       width: 490px;
      //       float: left;

      //       li {
      //         line-height: 18px;
      //         display: inline-block;

      //         a {
      //           position: relative;
      //           float: left;
      //           line-height: 18px;
      //           text-decoration: none;
      //           background-color: #fff;
      //           border: 1px solid #e0e9ee;
      //           margin-left: -1px;
      //           font-size: 14px;
      //           padding: 9px 18px;
      //           color: #333;
      //         }

      //         &.active {
      //           a {
      //             background-color: #fff;
      //             color: #e1251b;
      //             border-color: #fff;
      //             cursor: default;
      //           }
      //         }

      //         &.prev {
      //           a {
      //             background-color: #fafafa;
      //           }
      //         }

      //         &.disabled {
      //           a {
      //             color: #999;
      //             cursor: default;
      //           }
      //         }

      //         &.dotted {
      //           span {
      //             margin-left: -1px;
      //             position: relative;
      //             float: left;
      //             line-height: 18px;
      //             text-decoration: none;
      //             background-color: #fff;
      //             font-size: 14px;
      //             border: 0;
      //             padding: 9px 18px;
      //             color: #333;
      //           }
      //         }

      //         &.next {
      //           a {
      //             background-color: #fafafa;
      //           }
      //         }
      //       }
      //     }

      //     div {
      //       color: #333;
      //       font-size: 14px;
      //       float: right;
      //       width: 241px;
      //     }
      //   }
      // }
      .page {
        text-align: center;
      }
    }
  }
}
</style>
