<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3><i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！</h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="skuInfo.skuDefaultImg" />
          </div>
          <div class="right-info">
            <p class="title">{{ skuInfo.skuName }}</p>
            <p class="attr">
              <span v-for="attr in spuSaleAttrValueList" :key="attr.id"
                >{{ attr.saleAttrName }}:{{ attr.saleAttrValueName }} |
              </span>
              数量:{{ this.skuNum }}
            </p>
          </div>
        </div>
        <div class="right-gocart">
          <a class="sui-btn btn-xlarge" @click="goDetail">查看商品详情</a>
          <a class="sui-btn btn-xlarge" @click="goShopCart">去购物车结算 > </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: "AddCartSuccess",
  mounted() {
    // console.log(this.skuId);
    // console.log(this.skuInfo);
    // console.log(this.spuSaleAttrList);
    console.log(this.spuSaleAttrValueList);
  },
  methods: {
    //查看商品详情
    goDetail() {
    this.$router.push({name:'detail',query:{skuid:this.skuId}})
    },
   //去购物车结算
    goShopCart() {
    this.$router.push({name:'shopcart'})
   }
  },
  computed: {
    skuId() {
      return this.skuInfo.id;
    },
    skuNum() {
      return this.$route.query.skuNum;
    },
    skuInfo() {
      return JSON.parse(sessionStorage.getItem("SKUINFO"));
    },
    spuSaleAttrList() {
      return JSON.parse(sessionStorage.getItem("SPUSALAATTRLIST"));
    },
    //计算detail页面选择的属性值
    spuSaleAttrValueList() {
      let arr = [];
      for (let i = 0; i < this.spuSaleAttrList.length; i++) {
        // console.log(this.spuSaleAttrList[i].spuSaleAttrValueList);
        for (
          let j = 0;
          j < this.spuSaleAttrList[i].spuSaleAttrValueList.length;
          j++
        ) {
          // console.log(this.spuSaleAttrList[i].spuSaleAttrValueList[j]);
          if (
            this.spuSaleAttrList[i].spuSaleAttrValueList[j].isChecked === "1"
          ) {
            arr.push(this.spuSaleAttrList[i].spuSaleAttrValueList[j]);
          }
        }
      }
      return arr;
    },
  },
};
</script>

<style lang="less" scoped>
.cart-complete-wrap {
  background-color: #f4f4f4;

  .cart-complete {
    width: 1200px;
    margin: 0 auto;

    h3 {
      font-weight: 400;
      font-size: 16px;
      color: #6aaf04;
      padding-top: 15px;
      padding-bottom: 15px;
      margin: 0;

      .icon-pc-right {
        background-color: #fff;
        border: 2px solid #6aaf04;
        padding: 3px;
        margin-right: 8px;
        border-radius: 15px;
      }
    }

    .goods {
      overflow: hidden;
      padding: 10px 0;

      .left-good {
        float: left;

        .left-pic {
          border: 1px solid #dfdfdf;
          width: 60px;
          float: left;
          img {
            width: 60px;
            height: 60px;
          }
        }

        .right-info {
          color: #444;
          float: left;
          margin-left: 10px;

          .title {
            width: 100%;
            line-height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
          }

          .attr {
            color: #aaa;
          }
        }
      }

      .right-gocart {
        float: right;

        a {
          padding: 7px 36px;
          font-size: 15px;
          line-height: 22px;
          color: #333;
          background-color: #eee;
          text-decoration: none;
          box-sizing: border-box;
          border: 1px solid #e1e1e1;
        }

        a:hover {
          background-color: #f7f7f7;
          border: 1px solid #eaeaea;
        }

        a:active {
          background-color: #e1e1e1;
          border: 1px solid #d5d5d5;
        }

        .btn-danger {
          background-color: #e1251b;
          color: #fff;
        }

        .btn-danger:hover {
          background-color: #e1251b;
        }
      }
    }
  }
}
</style>
