<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left" @click="toggleList">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight': totalCount>0}">
                        <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{ totalCount }}</div>
                </div>
                <div class="price" :class="{'highlight': totalPrice>0}">￥{{ totalPrice }}</div>
                <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">
                    {{ payDesc }}
                </div>
            </div>
            <div class="ball-container">
                <transition-group name="drop">
                    <div v-for="ball in balls" :key="ball" v-show="ball.show"></div>
                </transition-group>
            </div>
            <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="list-content">
                    <ul>
                        <li class="food" v-for="food in selectFoods">
                            <span class="name">{{ food.name }}</span>
                            <div class="price">
                                <span>￥{{ food.price * food.count }}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--<transition name="fade">-->
        <!--<div class="list-mask" v-show="listShow"></div>-->
    <!--</transition>-->
</template>

<script>
    import cartcontrol from '../cartControl/cartControl';
    import BScroll from 'better-scroll';

    export default {
        props: {
            selectFoods: {
                type: Array,
                default () {
                    return [];
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                balls: [
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    }
                ],
                fold: true
            };
        },
        computed: {
            totalPrice () {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
                return total;
            },
            totalCount () {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            },
            payDesc () {
                if (this.totalPrice === 0) {
                    return '￥' + this.minPrice + '元起送';
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return '还差￥' + diff + '元起送';
                } else {
                    return '去结算';
                }
            },
            payClass () {
                if (this.totalPrice < this.minPrice) {
                    return 'not-enough';
                } else {
                    return 'enough';
                }
            },
            listShow () {
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            }
        },
        methods: {
            toggleList () {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            empty () {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            }
        },
        components: {
            cartcontrol
        }
    };
</script>

<style lang="scss">
    @import "../../common/scss/mixin";

    .shopcart {
        position: fixed;
        z-index: 50;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 48px;
        background: #999;
        .content {
            display: flex;
            background: #141d27;
            font-size: 0;
            color: rgba(255, 255, 255, .4);
            .content-left {
                flex: 1;
                .logo-wrapper {
                    display: inline-block;
                    position: relative;
                    top: -10px;
                    margin: 0 12px;
                    padding: 6px;
                    width: 56px;
                    height: 56px;
                    box-sizing: border-box;
                    vertical-align: top;
                    border-radius: 50%;
                    background: #141d27;
                    .logo {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: #2b343c;
                        text-align: center;
                        &.highlight {
                            background: rgb(0, 160, 220);
                        }
                        .icon-shopping_cart {
                            line-height: 44px;
                            font-size: 24px;
                            color: #80858a;
                            &.highlight {
                                color: #fff;
                            }
                        }
                    }
                    .num {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 24px;
                        height: 16px;
                        line-height: 16px;
                        text-align: center;
                        border-radius: 16px;
                        font-size: 9px;
                        font-weight: 700;
                        color: #fff;
                        background: rgb(240, 20, 20);
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
                    }
                }
                .price {
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 12px;
                    line-height: 24px;
                    padding-right: 12px;
                    border-right: 1px solid rgba(255, 255, 255, .1);
                    font-size: 16px;
                    font-weight: 700;
                    box-sizing: border-box;
                    &.highlight {
                        color: #fff;
                    }
                }
                .desc {
                    display: inline-block;
                    vertical-align: top;
                    line-height: 24px;
                    margin: 12px 0 0 12px;
                    font-size: 10px;
                }
            }
            .content-right {
                flex: 0 0 105px;
                width: 105px;
                .pay {
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 700;
                    background: #2b333b;
                    &.not-enough {
                        background: #2b333b;
                    }
                    &.enough {
                        background: #00b43c;
                        color: #fff;
                    }
                }
            }
        }
        .ball-container {
            .ball {
                position: fixed;
                left: 32px;
                bottom: 22px;
                z-index: 200;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: rgb(0, 160, 220);
                /*&.drop-enter-active, &.drop-leave-active {*/
                /*transition: all .4s ease;*/
                /*}*/
                /*&.drop-enter, &.drop-leave-active {*/
                /*opacity: 0;*/
                /*transform: translateY(30px);*/
                /*}*/
            }
        }
        .shopcart-list {
            position: absolute;
            left: 0;
            /*top: 0;*/
            bottom: 45px;
            z-index: -1;
            width: 100%;
            transition: all .3s ease;
            .list-header {
                height: 40px;
                line-height: 40px;
                padding: 0 18px;
                background: #f3f5f7;
                border-bottom: 1px solid rgba(7, 17, 27, .1);
                .title {
                    float: left;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .empty {
                    float: right;
                    font-size: 12px;
                    color: rgb(0, 160, 220);
                }
            }
            .list-content {
                padding: 0 18px;
                max-height: 217px;
                overflow: hidden;
                background: #fff;
                .food {
                    position: relative;
                    padding: 12px 0;
                    box-sizing: border-box;
                    @include border-1px(rgba(7, 17, 27, .1));
                    .name {
                        line-height: 24px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .price {
                        position: absolute;
                        right: 90px;
                        bottom: 12px;
                        line-height: 24px;
                        font-size: 14px;
                        font-weight: 700;
                        color: rgb(240, 20, 20);
                    }
                    .cartcontrol-wrapper {
                        position: absolute;
                        right: 0;
                        bottom: 6px;
                    }
                }
            }
        }
    }

    /*.list-mask {*/
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*z-index: 40;*/
    /*}*/
</style>
