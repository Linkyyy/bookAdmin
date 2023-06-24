<template>
    <div class="index __flex __cc" >

        <div class="container_main __flex __ccc">
            <img src="../../assets/Logo.png" alt="">
            <h2>欢迎使用图书借阅系统！</h2>
            <div class="container_search">
                <el-dropdown class="dropdown select">
                    <button class="el-dropdown-link ">
                        {{ currentOptionLabel }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="item in options" :key="item.value" @click="handleSelect(item)">{{
                                item.label
                            }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <input type="text" v-model="searchInfo" @keyup.enter="handleSearch">
                <button @click="handleSearch">
                    索引
                </button>
            </div>
        </div>

        <div class="bg_linear">

        </div>

        <div class="container_book __flex __r">


            <div class="layout_rank __flex __c">
                <div class="rank_title">

                    <el-tabs v-model="currentTitle" class="demo-tabs" @tab-click="handleClickTab">
                        <el-tab-pane :label="titles[0]" :name="0">
                            <el-row>

                                <el-col class="layout_rank_item __flex __r" :span="8" v-for="item in hotList" :key="item">


                                    <img :src="item.imgUrl" alt="" @click="handleBook(item.ISBN)">
                                    <div class="item_info">
                                        <p @click="handleBook(item.ISBN)">{{ item.bookName }}</p>
                                        <p> 作者：{{ item.author }} </p>
                                        <p>出版社：{{ item.publish }}</p>
                                    </div>
                                </el-col>

                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane :label="titles[1]" :name="1">
                            <el-row>

                                <el-col class="layout_rank_item __flex __r" :span="8" v-for="item in rankList" :key="item">


                                    <img :src="item.imgUrl" alt="" @click="handleBook(item.ISBN)">
                                    <div class="item_info">
                                        <p @click="handleBook(item.ISBN)">{{ item.bookName }}</p>
                                        <p> 作者：{{ item.author }} </p>
                                        <p>出版社：{{ item.publish }}</p>
                                    </div>
                                </el-col>

                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane :label="titles[2]" :name="2">
                            <el-row>

                                <el-col class="layout_rank_item __flex __r" :span="8" v-for="item in newList" :key="item">


                                    <img :src="item.imgUrl" alt="" @click="handleBook(item.ISBN)">
                                    <div class="item_info">
                                        <p @click="handleBook(item.ISBN)">{{ item.bookName }}</p>
                                        <p> 作者：{{ item.author }} </p>
                                        <p>出版社：{{ item.publish }}</p>
                                    </div>
                                </el-col>

                            </el-row>
                        </el-tab-pane>

                    </el-tabs>



                </div>



            </div>

            <div class="layout_type __flex __c">
                <el-tabs class="demo-tabs">
                    <el-tab-pane label="分类">
                    </el-tab-pane>

                </el-tabs>
                <div class="__flex __c" v-for="item in classificationList" :key="item.value">
                    <span class="classify_big">{{ item.lable }}</span>
                    <div>
                        <span class="classify_sub" v-for="itemSub in item.sub" :key="itemSub"
                            @click="handleSelectClass(itemSub)">
                            {{ itemSub.label }}
                        </span>
                    </div>
                </div>

            </div>


        </div>


    </div>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue'

export default {
    name: 'FrontIndex',

    created() {
        let that = this;
        this.$axios.get('/user/getIndexData').then(function (response) {
            if (response.data.isSuccess) {
                that.hotList = response.data.data.hotList;
                that.rankList = response.data.data.rankList;
                that.newList = response.data.data.newList;
            }
            else {
                ElMessage.error(response.data.message);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    },
    computed: {

    },
    components: {
        ArrowDown
    },
    data() {
        return {
            value: 1,
            currentOptionValue: 1,
            currentOptionLabel: "书名",
            options: [
                {
                    value: 1,
                    label: '书名',
                },
                {
                    value: 2,
                    label: '作者',
                },
                {
                    value: 3,
                    label: '出版社',
                },
                {
                    value: 4,
                    label: 'ISBN',
                },
            ],
            currentTitle: 0,
            titles: ["热门推荐", "借阅排名", "新书速递"],
            hotList: [
                {
                    ISBN: '9787020002207',
                    bookName: '红楼梦',
                    imgUrl: 'https://img2.baidu.com/it/u=2497633310,3314440777&fm=253&fmt=auto&app=138&f=JPEG?w=303&h=438',
                    author: '[清] 曹雪芹 著 / 高鹗',
                    count: 10,//共借出次数
                    total: 5,//馆藏
                    number: 3,//库存
                    type: 'I',
                    time: '1949',
                    publish: '人民文学出版社',
                    desc: '《红楼梦》是一部百科全书式的长篇小说。以宝黛爱情悲剧为主线，以四大家族的荣辱兴衰为背景，描绘出18世纪中国封建社会的方方面面，以及封建专制下新兴资本主义民主思想的萌动。结构宏大、情节委婉、细节精致，人物形象栩栩如生，声口毕现，堪称中国古代小说中的经 典。'
                },
                {
                    ISBN: '9787020002207',
                    bookName: '荒原狼',
                    imgUrl: 'http://cover.duxiu.com/coverNew/CoverNew.dll?iid=6366616967666164656558a0a191a993a697a49f93a49d3137333232383432',
                    author: '（德）赫尔曼·黑塞著；田伟华译',
                    total: 5,//馆藏
                    number: 2,
                    count: 3,
                    type: 'I',
                    time: '2020.01',
                    publish: '人民文学出版社',
                    desc: '《荒原狼》是黑塞创作生涯中的里程碑，通过对个人精神疾病的讲述，展示出现代社会中人性遭到分裂的恶果。无家可归的哈勒尔，像一只狼一样被无情追猎，被精神疾病折磨，在与人的相互交往中走向了人生的两难，陷入了生命的绝境，最终他又从歌德、莫扎特等“不朽者”的崇高思想中得到启发，摆脱绝望，重新回到现实生活。小说幻想色彩浓郁，象征意味深远，被誉为德国的《尤利西斯》。'
                },
                {
                    ISBN: '9787020002207',
                    bookName: '大地之上',
                    imgUrl: 'http://cover.duxiu.com/coverNew/CoverNew.dll?iid=6366616b626a61636b6358a0a191a993a697a49f93a49d3338383234353732',
                    author: '（加）罗欣顿·米斯特里（Rohinton Mistry）著', number: 2,
                    total: 5,//馆藏
                    count: 3,
                    type: 'I',
                    time: '1949',
                    publish: '人民文学出版社',
                    desc: '《大地之上》是罗欣顿·米斯特里备受好评的长篇小说，通过描绘四位主人公（一个艰苦谋生的寡妇，一个无法融入大学生活的青年，一对裁缝伯侄）的经历，串起了印度数十年的风云变幻，写出了大时代背景下小人物的苦难辛酸和他们乐观的生命态度。'
                },
                {
                    ISBN: '9787020002207',
                    bookName: '在唐诗里孤独漫步',
                    imgUrl: 'http://cover.duxiu.com/coverNew/CoverNew.dll?iid=62656068656160676865579fa090a892a596a39e92a39c3639343831343831',
                    author: '夏昆著', number: 2,
                    total: 5,//馆藏
                    count: 3,
                    type: 'I',
                    time: '1949',
                    publish: '人民文学出版社',
                    desc: '本书是对唐诗名篇的赏析，书中解读了王勃、陈子昂、张若虚、王维、孟浩然、王昌龄、李白、杜甫、白居易、刘禹锡、杜牧、李商隐等四十多位诗人的代表作。作者把唐诗放回历史的大背景下去读，以唐诗发展的轨迹为线索，突破传统，结合音乐、电影等审美对唐诗进行知识性解读;又从诗人的命运沉浮、人生际遇及作诗缘起和影响等角度，对诗人进行中肯而不失趣味的介绍，最终撩开时代的面纱，让诗人从悠远的作品中走出来，走进我们的生活。'
                },
                {
                    ISBN: '9787020002207',
                    bookName: '逻辑学入门:清晰思考、理性生活的88个逻辑学常识',
                    imgUrl: 'http://cover.duxiu.com/coverNew/CoverNew.dll?iid=6467626b67686263676859a1a292aa94a798a5a094a59e3330383736383233',
                    author: '格桑著', number: 2,
                    total: 5,//馆藏
                    count: 3,
                    type: 'I',
                    time: '1949',
                    publish: '人民文学出版社',
                    desc: '著名逻辑学家、哲学家、杰出的教育家金岳霖曾说：逻辑是生活中找寻并满足其愿望的实际工具，没有逻辑，我们的生活将十分沉重，以致几乎是不可能的。很多人都认为逻辑学宽广且枯燥深奥，不容易学习更不容易运用。本书作者认为，逻辑在生活中无处不在，逻辑时刻服务于我们的生活，即便很多人对其没有清楚的概念。作者在本书以碎片化的文本形式、简练又充满机智的笔触，帮助读者轻松地了解逻辑学常识和概念，辨别语言陷阱，认识逻辑谬误，体会妙趣横生的思维交锋，跨过无处不在的逻辑陷阱，学会用清晰理性的方式思考问题。'
                },
                {
                    ISBN: '9787020002207',
                    bookName: '哲学简史',
                    imgUrl: 'http://cover.duxiu.com/coverNew/CoverNew.dll?iid=686b6670676a666c68675da5a696ae98ab9ca9a498a9a23530323536323937',
                    author: '伯特兰·罗素著；张小默译', number: 2,
                    total: 5,//馆藏
                    count: 3,
                    type: 'I',
                    time: '1949',
                    publish: '人民文学出版社',
                    desc: '《哲学简史》是英国哲学家、逻辑学家、数学家伯特兰罗素的代表作之一，是在《西方哲学史》的基础上，保留原著架构，并对一些繁复的逻辑论证进行通俗化的基础上编译而成，记述了从西方哲学萌芽的古希腊哲学一直到二十世纪早期期西方哲学的发展历程。书中以各个哲学流派及其代表哲学家为中心记述西方哲学哲学的发展历程，同时也对各个哲学流派产生的历史背景、哲学家的生活时代加以描述，以使读者更好地理解西方哲学的发展历程，并明白作为形而上的哲学的产生与发展，都有其深厚的社会政治经济背景，是它们发展的产物。'
                },
                {
                    ISBN: '9787020002207',
                    bookName: '理想国',
                    imgUrl: 'http://cover.duxiu.com/coverNew/CoverNew.dll?iid=6a6e68696c6e686b6d715fa7a898b09aad9eaba69aaba43939313432393739',
                    author: '古希腊）柏拉图作；何祥迪译', number: 2,
                    total: 5,//馆藏
                    count: 3,
                    type: 'I',
                    time: '1949',
                    publish: '人民文学出版社',
                    desc: '如果有一天，你得到一枚能让人隐身的魔戒，从谋财害命到谋权篡位，坏事做尽而好处尽享-那么，你会选择做个坏人吗 如果有一天，从未干过任何坏事的你，却背上人间最大的恶名，被剥脱尘世的荣誉和利益-那么，你会选择依然做个好人吗 从这一拷问人性的难题出发，古希腊哲学家柏拉图写下了传世经典《理想国》。在这本对话录中，柏拉图笔下的苏格拉底与伙伴一起，在对谈中构建出一个理想城邦，事关政体、教育、人伦、文艺、哲学等一系列重大议题。尽管讨论话题看似包罗万象，但最终都是为了回答这一终极之问：如果好人不易当，我们为何还要做个好人。'
                },
                {
                    ISBN: '9787020002207',
                    bookName: '尼采的视角主义',
                    imgUrl: 'http://cover.duxiu.com/coverNew/CoverNew.dll?iid=656763676b6863666c6d5aa2a393ab95a899a6a195a69f3339383031393034',
                    author: '朱彦明著', number: 2,
                    total: 5,//馆藏
                    count: 3,
                    type: 'I',
                    time: '1949',
                    publish: '人民文学出版社',
                    desc: '本书主体部分共6章。第一章引出尼采的视角主义；第二、三、四章构成了本书稿的研究重点，即尼采的视角主义的主要内涵、基本实质以及他对道德的估价方式的批判；第五章是对尼采的视角主义的总结性的内容，即他的重估一切价值和对生命的酒神状态的肯定；第六章是尼采的视角主义的扩展性的内容，把他的视角主义拉向20世纪的论域中进行讨论和评价。'
                },
                {
                    ISBN: '9787020002207',
                    bookName: '中国通史',
                    imgUrl: 'http://cover.duxiu.com/coverNew/CoverNew.dll?iid=62656068686660616167579fa090a892a596a39e92a39c3431303334303731',
                    author: '吕思勉', number: 2,
                    total: 5,//馆藏
                    count: 3,
                    type: 'I',
                    time: '1949',
                    publish: '人民文学出版社',
                    desc: '《中国通史》是吕思勉先生的史学成名作，也是我国历史上第一部用白话文写成的中国通史。全书分为上下两册，上册是中国文化史，借鉴古代史书的典制体，按章节分为婚姻、族制、政体、阶级、财产、官制、选举等十八个专题，内容之广泛，完全与今“大文化”涵义相合；下册是中国政治史，从民族起源开始，叙述历朝历代史事直至民国开创。浓缩中国五千年历史于一书。《中国通史》渗透着吕思勉用新方法、新思想来整理旧国故的精神，全书“以丰富的史识与流畅的笔调来写通史，方为通史写作开一新的纪元”。'
                },

            ],
            rankList:[],
            newList:[],
            classificationList: [
                {
                    value: 1,
                    lable: '马列主义',
                    sub: [
                        {
                            value: 'A',
                            label: '马克思主义、列宁主义、毛泽东思想、邓小平理论'
                        }
                    ]
                },
                {
                    value: 2,
                    lable: '哲学',
                    sub: [
                        {
                            value: 'B',
                            label: '哲学、宗教'
                        }
                    ]
                },
                {
                    value: 3,
                    lable: '社会科学',
                    sub: [
                        {
                            value: 'C',
                            label: '社会科学总论'
                        },
                        {
                            value: 'D',
                            label: '政治、法律'
                        },
                        {
                            value: 'E',
                            label: '军事'
                        },
                        {
                            value: 'F',
                            label: '经济'
                        },
                        {
                            value: 'G',
                            label: '文化、科学、教育、体育'
                        },
                        {
                            value: 'H',
                            label: '语言、文字'
                        },
                        {
                            value: 'I',
                            label: '文学'
                        },
                        {
                            value: 'J',
                            label: '艺术'
                        },
                        {
                            value: 'K',
                            label: '历史、地理'
                        },
                    ]
                },
                {
                    value: 4,
                    lable: '自然科学',
                    sub: [
                        {
                            value: 'N',
                            label: '自然科学总论'
                        },
                        {
                            value: 'O',
                            label: '数理科学和化学'
                        },
                        {
                            value: 'Q',
                            label: '生物科学'
                        },
                        {
                            value: 'R',
                            label: '医药、卫生'
                        },
                        {
                            value: 'S',
                            label: '农业科学'
                        },
                        {
                            value: 'U',
                            label: '交通运输'
                        },
                        {
                            value: 'V',
                            label: '航空、航天'
                        },
                        {
                            value: 'X',
                            label: '环境科学、劳动保护科学（安全科学）'
                        },
                    ]
                },
                {
                    value: 5,
                    lable: '综合性图书',
                    sub: [
                        {
                            value: 'Z',
                            label: '综合性图书'
                        }
                    ]
                },
            ],
        }
    },
    methods: {
        handleClickTab() {
            console.log(this.currentTitle);
        },
        handleSelect(item) {
            this.currentOptionLabel = item.label;
            this.currentOptionValue = item.value;
        },
        handleClickTitle(value) {
            this.currentTitle = value;
        },
        handleSearch() {
            let type = this.currentOptionValue;
            let lable = this.options[type - 1].label;
            let text = this.searchInfo;
            this.$router.push({
                path: '/search', query: {
                    type,
                    lable,
                    text
                },
            });

        },
        handleSelectClass(item) {
            let type = 5;
            let lable = item.value;
            let text = item.value;
            this.$router.push({
                path: '/search', query: {
                    type,
                    lable,
                    text
                },
            });
        },
        handleBook(ISBN) {
            let { href } = this.$router.resolve({ path: '/book', query: {ISBN} });
            window.open(href, '_blank');
            // this.$router.push({path:'/book',query:book});
        }
    }
}
</script>
<style scoped lang="less">
.index {
    flex: 1;


    .container_main {
        background-color: #F6F6F1;
        height: 90vh;
        width: 100%;

        img {
            width: 100px;
            height: 100px;
        }

        .container_search {
            background-color: white;
            position: relative;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            border-radius: 20px;
            width: 600px;
            height: 40px;


            box-sizing: content-box;

            &:hover {
                box-shadow: 0 2px 12px 0 #a4d0ff;
                transition: ease-out;
                transition-duration: 1s;
            }

            .select {
                height: 40px;
                width: 80px;
                position: absolute;
                left: 20px;

                button {
                    color: gray;
                    background-color: transparent;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    cursor: pointer;

                }
            }

            input {
                left: 110px;
                position: absolute;
                width: 390px;
                height: 40px;
                border: none;
                outline: none;
                font-size: 17px;
                text-align: center;
                background-color: transparent;
            }

            button {
                position: absolute;
                right: 5px;
                top: 2px;
                height: 36px;
                width: 80px;
                border-radius: 20px;
                border: none;
                background-color: #5EADFF;
                color: white;
                cursor: pointer;
                outline: none;

            }
        }
    }

    .bg_linear {
        width: 100%;
        height: 15vh;
        background: linear-gradient(to bottom, #F6F6F1, white);


    }

    .container_book {
        padding: 50px;

        // .selectTab{
        //     font-size: 30px;
        //     color: red;
        // }

        .layout_rank {
            flex: 3;

            .rank_title {

                span {
                    cursor: pointer;
                    margin: 0 5px;
                    font-size: small;
                }

                .span_select {
                    font-size: larger;
                    font-weight: bold;
                }
            }

            .layout_rank_item {

                padding: 15px;

                img {
                    cursor: pointer;
                    width: 80px;
                    height: 120px;
                }

                .item_info {
                    margin-left: 20px;

                    p:nth-child(1) {
                        cursor: pointer;
                        font-weight: bold;
                        color: #3377AA;

                        &:hover {
                            color: #C01111;
                        }
                    }

                    :not(p:nth-child(1)) {
                        margin: 10px 0;
                        font-size: small;
                    }
                }
            }
        }

        .layout_type {

            flex: 1;
            margin-left: 10px;

            .classify_big {

                margin: 17px 0 10px 0;
                font-size: medium;

            }

            .classify_sub {

                cursor: pointer;
                color: #3377AA;
                font-size: smaller;
                line-height: 24px;
                margin: 0 10px;

                &:nth-child(1) {
                    margin: 5px 0;
                }

                &:hover {
                    color: #C01111;
                }
            }


        }
    }



}
</style>