<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartInfo, index) in cartInfoList"
          :key="index"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @click="updateCheckedById(cartInfo.skuId, cartInfo.isChecked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">&nbsp;</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{ changeTwoDecimal(cartInfo.skuPrice) }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('minus', -1, cartInfo)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('input', $event.target.value * 1, cartInfo)"
            />
            <a class="plus" @click="handler('add', 1, cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{
              changeTwoDecimal(cartInfo.skuPrice * cartInfo.skuNum)
            }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cartInfo.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length !== 0"
          @click="updateAllCheckedById"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ changeTwoDecimal(this.totalPrice) }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { changeTwoDecimal } from "@/utils/changeTwoDecimal";
import throttle from "lodash/throttle"; //引入throttle 节流函数

export default {
  name: "ShopCart",
  mounted() {
        this.getData();
  },
  methods: {
    getData() {
      //获取服务器购物车数据
      this.$store.dispatch("getCartList");
    },
    //数字强制转换为两位小数
    changeTwoDecimal(x) {
      return changeTwoDecimal(x);
    },
    //修改购物车数量 加上节流 防止数量变成负数
    handler: throttle(function (type, disNum, cartInfo) {
      // console.log(type, disNum, cartInfo);
      let skuNum = 0;
      let skuId = cartInfo.skuId;
      if (type === "minus") {
        if (cartInfo.skuNum > 1) {
          //防止减到负数
          skuNum = disNum;
        }
      } else if (type === "add") {
        skuNum = disNum;
      } else if (type === "input") {
        //输入的数非法或者小于1 则不变化
        if (isNaN(disNum) || disNum < 1) {
          skuNum = 0;
        } else {
          //小数取整
          skuNum = parseInt(disNum) - cartInfo.skuNum;
        }
      }
      //调用接口修改服务器数据
      this.$store.dispatch("addOrUpdateShopCart", {
        skuId: skuId,
        skuNum: skuNum,
        code: (code) => {
          if (code === 200) {
            this.getData(); //重新获取数据
          }
        },
      });
    }, 500),
    //删除购物车数据
    deleteCartById(skuId) {
      this.$store.dispatch("deleteCartById", {
        skuId: skuId,
        code: (code) => {
          if (code === 200) {
            // console.log('删除成功')
            this.getData(); //重新获取数据
          } else {
            alert("删除失败");
          }
        },
      });
    },
    //修改商品的选中状态
    updateCheckedById(skuId, isChecked) {
      let checked = 1;
      if (isChecked === 1) {
        checked = 0;
      }
      this.$store.dispatch("updateCheckedById", {
        skuId: skuId,
        isChecked: checked,
        code: (result) => {
          if (result.code === 200) {
            // console.log(result.message);
            this.getData(); //重新获取数据
          } else {
            console.log(result.message);
          }
        },
      });
    },
    //全选或者全不选
    updateAllCheckedById() {
      //调用仓库中的updateAllChecked方法
      this.$store.dispatch("updateAllChecked", this.isAllChecked).then((res) => {
        console.log(res);
          this.getData(); //重新获取数据
      }).catch((res) => {
        console.log(res);
      })
  
      
    },
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候右侧函数会立即执行一次
      // 注入一个参数state(大仓库中的数据)
      cartInfoList: (state) => {
        return state.shopcart.cartInfoList;
      },
    }),
    //计算产品的总价
    totalPrice() {
      let price = 0;
      //for循环先判断哪些被勾选
      for (let i = 0; i < this.cartInfoList.length; i++) {
        if (this.cartInfoList[i].isChecked === 1) {
          // 计算金额
          price += this.cartInfoList[i].cartPrice * this.cartInfoList[i].skuNum;
        }
      }
      return price;
    },
    //判断产品是否都勾选
    isAllChecked() {
      //遍历数组里面元素 只要全部元素满足 isChecked === 1 返回true  有一个不符合就为false
      return this.cartInfoList.every((item) => item.isChecked === 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 45%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 250px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
            padding-right: 10px;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
