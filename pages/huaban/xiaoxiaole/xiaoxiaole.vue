<template>
    <view class="pnz_eliminating_wrap" style="padding:10px 12px">
        <view class="" style="padding: 10px 0 20px 0;font-size: 30px;color:#333;">
            消消乐
        </view>
        <view class="pnz_panel_wrap" @click="clickEvent">
            <view
                v-for="(line_item,line_index) in all_data"
                :key="line_index" class="single_line"
            >
                <view
                    class="single_cell  star_base"
                    :style="[singleCellStyle(single_item)]"
                    :class="[singleCellClass(single_item)]"
                    v-for="(single_item,single_index) in line_item"
                    :key="single_index"
                >
                </view>
            </view>
        </view>

        <view style="text-align: center;font-size: 12px;color: #555;padding:2px 50px;">
            <view style="font-weight: bold">
                规则:

            </view>
            <view>
                1:如果有三个以上同颜色的星星在一条线上，则点击其中一个即可将这三个星星及周边的同颜色星星消除
            </view>
            <view>
                2：如果有色块与相邻的色块互换后可形成三个以上同颜色的星星在一条线上，则先点击一个，再点击另一个可进行互换，然后会自动消除
            </view>
        </view>
    </view>
</template>

<script>

export default {
    name:"pinazi-game-happy-eliminating",
    data() {
        return {
            all_data: [],
            star_total:6,
            panel: {
                // x: 4,
                // y: 4,
                x: 7,
                y: 7
            },
            cell_length: 40, //默认
            current_clicked_item:null,//当前已经选中的棋子
            is_blinking:false
        };
    },
    mounted() {
        this.init()
    },
    methods:{
        init(){
            this.initAllData()
        },
        getDefaultItem(x,y) {
            return {
                x: x,
                y: y,
                star_num: (parseInt(Math.random() * this.star_total) + 1),
                is_deleted:false,
                is_selected:false
            }
        },
        initAllData() {
            this.all_data = []
            //获得数据
            for (var j = 0; j < this.panel.y; j++) {
                var temp_line = []
                for (var i = 0; i < this.panel.x; i++) {
                    temp_line.push(
                        this.getDefaultItem(i,j)
                    );
                }
                this.all_data.push(temp_line)
            }
            //   todo 先清理下所有相同的点
        },
        markMatrixDeletedTag(all_matrix) {
            var temp_matrix = JSON.parse(JSON.stringify(all_matrix));
            for (var y in temp_matrix) {
                for (var x in temp_matrix[y]) {

                }
            }
        },
        singleCellStyle(single_item){
            return {
                width: this.cell_length + "px",
                height:this.cell_length + "px"
            }
        },
        singleCellClass(single_item) {
            var dest_class = "";
            dest_class += "star" +single_item.star_num
            if (single_item.is_selected) {
                dest_class += " selected";
            }
            if (single_item.is_deleted) {
                dest_class += " deleted";
            }
            return dest_class;
        },
        itemSelected(now_item) {
            if (this.current_clicked_item) {
                this.$set(this.current_clicked_item,'is_selected',false);
            }

            this.current_clicked_item = now_item;
            this.$set(now_item,'is_selected',true);
            //    再算出可以到的点
        },
        checkCanEliminateAndClear() {
            this.$set(this.current_clicked_item,'is_selected',false);
            this.current_clicked_item = null;
            this.is_blinking = true;
            setTimeout(() => {
                //查下是否有同样的点
                this.clearMatrixAndAddSupplement(this.all_data);
                this.is_blinking = false;
            },500)
        },

        clickEvent(e) {
            if (this.is_blinking) {
                return false;
            }
            var offset_x = e.detail.x - e.currentTarget.offsetLeft;
            var offset_y = e.detail.y - e.currentTarget.offsetTop;
            // 算出 x的 index
            var x_index = this.getLengthIndex(offset_x)
            var y_index = this.getLengthIndex(offset_y)
            console.log(y_index,x_index)
            var now_item = this.all_data[y_index ][x_index]
            if (!this.current_clicked_item) {
                //不存在，则是第一次点
                this.itemSelected(now_item);
                var res = this.checkIfCanEliminating(now_item, this.all_data);
                if (res) {
                    this.checkCanEliminateAndClear()
                }                // //查下是否有同样的点
                return false;
            }else{
                console.log(" 点过了 -------- ")
                //    已经点过了，如果与上一个是同一个 num 则换点
                if (now_item.star_num === this.current_clicked_item.star_num) {
                    this.itemSelected(now_item);
                    var res = this.checkIfCanEliminating(now_item, this.all_data);
                    if (res) {
                        this.checkCanEliminateAndClear()
                    }
                    return false;
                }
                //    如果不是当前的子的前，后，左，右，则重新选子
                var is_next_to = false;
                [
                    [this.current_clicked_item.x-1,this.current_clicked_item.y],
                    [this.current_clicked_item.x+1,this.current_clicked_item.y],
                    [this.current_clicked_item.x,this.current_clicked_item.y-1],
                    [this.current_clicked_item.x,this.current_clicked_item.y+1],
                ].forEach((v) => {
                    if (now_item.x === v[0] && now_item.y === v[1]) {
                        is_next_to = true;
                    }
                })
                if (!is_next_to) {
                    //    不是紧临，则是 重新再换一个目标
                    this.itemSelected(now_item)
                }else{
                    //    是紧临，则看下四方是否可以有可以消的
                    //换下 x,y,再看下有没有可以消的，如果两个结局有一个有值 ，则换，并把这些换掉
                    var new_matrix = this.getNewMatrix(this.current_clicked_item, now_item,this.all_data);
                    var temp_now_arr = this.checkIfCanEliminating(new_matrix[now_item.y][now_item.x],new_matrix);
                    var temp_from_arr = this.checkIfCanEliminating(new_matrix[this.current_clicked_item.y][this.current_clicked_item.x],new_matrix);
                    if (!temp_now_arr && !temp_from_arr) {
                        //    两个都为空，则不能移动
                        console.log('不能移动')
                        // this.$set(this.current_clicked_item,'is_selected',false);
                        return this.itemSelected(now_item)
                    }else{
                        console.log("要删了");
                        this.$set(this, 'all_data', new_matrix);
                        this.checkCanEliminateAndClear()
                    }
                }
            }
        },
        clearMatrixAndAddSupplement(all_matrix) {
            //    清理盘中所有要删除的格子,并补充
            var temp_matrix = JSON.parse(JSON.stringify(all_matrix));
            for (var x = 0; x <= this.panel.x - 1; x++) {
                //每一个纵列单独查
                var temp_column = [];
                var y = this.panel.y - 1;
                while (y >= 0) {
                    if (!temp_matrix[y][x].is_deleted) {
                        temp_column.push(temp_matrix[y][x]);
                    }
                    y--;
                }
                // temp_column 补齐
                var i = 0;
                while (i <= this.panel.y -1 ) {
                    if (!temp_column[i]) {
                        temp_column[i] =  this.getDefaultItem(x, i)
                    }
                    i++;
                }
                y = this.panel.y - 1;
                while (y >= 0) {
                    if (temp_column[this.panel.y - 1 - y]) {
                        temp_matrix[y][x] = Object.assign({}, temp_column[this.panel.y - 1 - y], {
                            y: y,
                            x: x
                        })
                    } else {
                        //    没有，则是新生成的一个随机的
                        temp_matrix[y][x] = this.getDefaultItem(x, y)
                    }
                    y--;
                }
            }
            this.$set(this, 'all_data', temp_matrix);
            return temp_matrix;
        },
        getNewMatrix(from_obj,to_obj,all_matrix) {
            var new_matrix = JSON.parse(JSON.stringify(all_matrix));
            var temp_to_item = Object.assign({},from_obj,{
                x: to_obj.x,
                y: to_obj.y,
                is_selected: false,
            })
            var temp_from_item = Object.assign({},to_obj,{
                x: from_obj.x,
                y: from_obj.y,
                is_selected: false,
            })
            new_matrix[to_obj.y][to_obj.x] = temp_to_item;
            new_matrix[from_obj.y][from_obj.x] = temp_from_item;
            return new_matrix;
        },
        getItemOrNull(y,x,all_matrix) {
            if (x >= 0 && x <= this.panel.x - 1 && y >= 0 && y <= this.panel.y - 1) {
                //区域内
                return all_matrix[y][x];
            }else{
                return null;
            }
        },
        getNextToSameArr(now_item,all_matrix,is_getting_extra = false) {
            var lx,rx,x,ly,ry,y;
            lx = rx = x = now_item.x;
            ly = ry = y = now_item.y;
            var dest_arr = [];
            var logicFun = (y,x,now_item) => {
                var temp_item = this.getItemOrNull(y, x, all_matrix);
                //有值才查
                if (temp_item && temp_item.star_num === now_item.star_num ) {
                    if (!temp_item.is_deleted) {
                        dest_arr.push(temp_item);
                    }
                }else{
                    return false;
                }
            }
            var break_flag ;
            while (lx > 0) {
                lx--;
                break_flag = logicFun(y, lx, now_item);
                if (break_flag === false) {
                    break;
                }
            }
            while (rx < this.panel.x - 1) {
                rx++;
                break_flag = logicFun(y, rx,now_item);
                if (break_flag === false) {
                    break;
                }
            }
            while (ly < this.panel.y - 1) {
                ly++;
                break_flag = logicFun(ly, x,now_item);
                if (break_flag === false) {
                    break;
                }
            }
            while (ry > 0) {
                ry--;
                break_flag = logicFun(ry, x,now_item);
                if (break_flag === false) {
                    break;
                }
            }
            if (is_getting_extra) {
                //    如果要加入额外的 另外处理
                if (dest_arr.length) {
                    dest_arr.forEach((v) => {
                        all_matrix[v.y][v.x].is_deleted = true;
                    })
                    var temp_arr = []
                    dest_arr.forEach((v) => {
                        var new_arr = this.getNextToSameArr(v,all_matrix,true)
                        temp_arr = temp_arr.concat(new_arr)
                    })
                    dest_arr = temp_arr.concat(dest_arr);
                }
                return dest_arr;
            }else{
                //    首次，则先判断够不够格
                if (dest_arr.length < 2) {
                    return false;
                }else if (dest_arr.length === 2) {
                    if (dest_arr[0].x !== dest_arr[1].x && dest_arr[0].y !== dest_arr[1].y) {
                        //    两个都不一样，不是一条线，返回 false
                        return false;
                    }
                }
                //走到此处就是够格了
                //先把这些 dest_arr 中标记为删除
                dest_arr.forEach((v) => {
                    all_matrix[v.y][v.x].is_deleted = true;
                })
                all_matrix[now_item.y][now_item.x].is_deleted = true;
                var extra_new_arr = []
                //    再查下其他的点四周是否有
                dest_arr.forEach((v) => {
                    var new_arr = this.getNextToSameArr(v,all_matrix,true);
                    extra_new_arr.concat(new_arr);
                })
                dest_arr = dest_arr.concat(extra_new_arr);
                dest_arr.push(all_matrix[now_item.y][now_item.x])
                return dest_arr;
            }
        },
        checkIfCanEliminating(now_item,all_matrix) {
            return this.getNextToSameArr(now_item,all_matrix);
        },
        getLengthIndex(offset_length){
            // 算出 x的 index
            var index = 0;
            if(offset_length > 0)
            {
                index = parseInt(offset_length/this.cell_length);
            }
            return index;
        },
    }
}
</script>

<style lang="scss" scoped>
body{
    cursor: pointer;
}

.pnz_eliminating_wrap {
    // background-color: white;
    text-align: center;
    overflow: auto;
    box-sizing: border-box;

}
.pnz_panel_wrap{
    display: inline-flex;
    border:1px solid #bbb;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    background: #eee;

}
.single_line{
    display: flex;
    justify-content: center;
    box-sizing: border-box;
}
.single_cell{
    border:1px solid #bbb;
    box-sizing: border-box;
}
$length : 30px;
.star_base{
    padding:2px;
    //background: #ddd;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAp9JREFUWEe9lz9oFEEUxr83U8RGBBtjGkGEJAoqxOqQuZ09tBAipNDCVFrGpNFOCxMQbLSLXdRGLWwUBEHM7cydaQSxEEyi+KcI/kFIc4UKMfNkwp2c5543e9lzYbv3vu/33s5+yxI2cVWr1b2+fX19/b3W+kc3UtRNk+9JkuQeEZ2o9z/r6+vThULhe1a9rgDK5fK0EOJSs5lzbqZUKk33HKBare50zj1n5oFmMyL6JIQ4pJT6nAUi8wbSpm8YdrOFTADtpm8AdLOFTAD/mr5p7dNa65nQxxAM0Gn6brcQDBA4/QZHlrOQCmCM6SeiYQBDzrlhIhoCcCR0rfW6J8y8LIRYArDMzEta6y+tGhsAxpiImY/VjbzxnoxmoeVvASx5MCJ6pLW2ZIwZB3A7VCHPOiKa8ABPARzOUziLlgeoAdiapSnH2hXKcrpzNG5ITW0cQmvtHWY+1QODtpKNV/X3a5gkyQ0iOvM/IJpz4o8cMMbMAjjbS4jWkPoriIwxVwGc7wVEWkK2S8LLAC7mCdEuntt+C4wxBkCUBwQzv4njeDBNqy2AtfY6M0/kAUBEi1EU7csKUGFmlQeA14iiSBKRS/0YpZlYa1eZeXteAFLKA0qpl0EACwsLA2trax/zMvc6QojxYrF4NwigUqkcdc49zhOAma/EcXwhCMBae46Zr+UJAOCh1vp4KMBNZj7dAWDVOeeTE0Q0RkT7O9R/0FrvDgLokAE/Acx681Kp9M4LGmO2AJis37vSQJi5Fsfxtk0BENEtIcSsUupFmsn8/PwOKeUkM08RUavZA631WCjAQQBzAEbqDffrEych5yJJkkEiamzEt7ySUp5USi0GATSKkiQZkVJ+LRaLKyHGrTX+X4KZ+2u12uvR0dFvaRq/APP4L923jAwqAAAAAElFTkSuQmCC");
    background-repeat: no-repeat;
    background-position: 50% 50% ;
}
.star_base.selected{
    border:3px solid #444;
    opacity: 0.6;
}
@keyframes blink{
    0%{opacity: 1;}

    100%{opacity: 0;}
}

.star_base.deleted{
    //background: #dddddd;
    //box-shadow: none;
    animation: blink 0.2s linear infinite;
}

.star1{
    box-shadow: 0 0 $length inset #fc4c16;
}

.star2{
    box-shadow: 0 0 $length inset #2b2bf8;
}
.star3{
    box-shadow: 0 0 $length inset #658c05;
}
.star4{
    box-shadow: 0 0 $length inset #7e117c;

}
.star5{
    box-shadow: 0 0 $length inset deeppink;
}
.star6{
    box-shadow: 0 0 $length inset #058494;
}
.star7{
    box-shadow: 0 0 $length inset #bb7b07;
}




</style>
