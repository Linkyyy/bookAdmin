import { createStore } from 'vuex'

export default createStore({
  state: {
    isAdminLogin: false,
    isLoading: false,
    myName:'',
    sNumber: {

    },
    myBookList: [
      {
          ISBN: '9787020002207',
          bookName: '荒原狼',
          imgUrl: 'http://cover.duxiu.com/coverNew/CoverNew.dll?iid=6366616967666164656558a0a191a993a697a49f93a49d3137333232383432',
          author: '（德）赫尔曼·黑塞著；田伟华译',
          count: 3,
          number: 2,
          duration: 1,
          type: '1996-12',
          time: '2020.01',
          publish: '人民文学出版社',
          desc: '《荒原狼》是黑塞创作生涯中的里程碑，通过对个人精神疾病的讲述，展示出现代社会中人性遭到分裂的恶果。无家可归的哈勒尔，像一只狼一样被无情追猎，被精神疾病折磨，在与人的相互交往中走向了人生的两难，陷入了生命的绝境，最终他又从歌德、莫扎特等“不朽者”的崇高思想中得到启发，摆脱绝望，重新回到现实生活。小说幻想色彩浓郁，象征意味深远，被誉为德国的《尤利西斯》。'
      },

  ],
    breadcrumbList: [],
    activeIndex: '1',
    activeIndexUser: '0',
  },
  getters: {
    getIsLoading: (state) => state.isLoading,
  },
  mutations: {
    setIsLoading: (state, isLoading) => state.isLoading = isLoading,
    setBreadcrumbList: (state, setBreadcrumbList) => state.setBreadcrumbList = setBreadcrumbList,
    setSNumber: (state, sNumber) => state.sNumber = sNumber,
    setMyBookList:(state, myBookList) => state.myBookList = myBookList,
  },
  actions: {
  },
  modules: {
  }
})
