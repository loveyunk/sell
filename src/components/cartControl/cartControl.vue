<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart"></div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
        <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        props: {
            food: {
                type: Object,
                count: 0
            }
        },
        created () {
//            console.log(this.food);
        },
        methods: {
            addCart (event) {
//                if (!event._constructed) {
//                    return;
//                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
            },
            decreaseCart (event) {
               if (this.food.count) {
                   this.food.count--;
               }
            }
        }
    };
</script>

<style lang="scss">
    .cartcontrol {
        font-size: 0;
        .cart-decrease {
            display: inline-block;
            padding: 6px;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 260);
            transform: translate3D(0, 0, 0) rotate(0);
            &.move-enter-active, &.move-leave-active {
                transition: all .4s linear;
            }
            &.move-enter, &.move-leave-active {
                opacity: 0;
                transform: translate3D(40px,0,0) rotate(360deg);
            }
        }
        .cart-count {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            padding-top: 6px;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            color: rgb(147, 153, 159);
        }
        .cart-add {
            display: inline-block;
            padding: 6px;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 260);
        }
    }
</style>
