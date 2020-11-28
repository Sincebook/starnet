<template>
  <div class="pagination-box">
    <div
      class="arrow left-arrow"
      :class="page == 1 ? 'disabled' : ''"
      @click="prePage"
    ></div>
    <div class="pagination">
      <span
        class="pageNum"
        @click="clickPage(1)"
        :class="page == 1 ? 'active' : ''"
        >1</span
      >
      <span class="pageNum" @click="prePageMore" v-show="showPreMore">...</span>
      <span
        class="pageNum"
        :class="page == index ? 'active' : ''"
        v-for="index in pages"
        :key="index"
        @click="clickPage(index)"
        >{{ index }}</span
      >
      <span class="pageNum" @click="nextPageMore" v-show="showNextMore"
        >...</span
      >
      <span
        v-if="allPages > 1"
        @click="clickPage(allPages)"
        class="pageNum"
        :class="page == allPages ? 'active' : ''"
        >{{ allPages }}</span
      >
    </div>
    <div
      class="arrow right-arrow"
      :class="page == allPages ? 'disabled' : ''"
      @click="nextPage"
    ></div>
  </div>
</template>

<script>
export default {
  props: ['allPages'],
  data() {
    return {
      showPreMore: false, // 是否显示左省略号
      showNextMore: false, // 是否显示右省略号
      page: 1, // 当前页
      foldPage: 5 // 规定最多显示的页数tag
    };
  },
  methods: {
    getList() {
      this.$emit('getProjects', this.page);
    },
    prePage() {
      this.page = this.page - 1;
      this.getList();
    },
    prePageMore() {
      this.page = this.page - 3;
      this.getList();
    },
    nextPage() {
      this.page = this.page + 1;
      this.getList();
    },
    nextPageMore() {
      this.page = this.page + 3;
      this.getList();
    },
    clickPage(num) {
      this.page = num;
      this.getList();
    },
    changePageBtn(id, is) {
      if (id === 0) {
        this.showPreMore = is;
      } else {
        this.showNextMore = is;
      }
    }
  },
  computed: {
    pages() {
      const foldPage = this.foldPage; // 规定最多显示的页数tag
      // console.log(this.page);
      const current = Number(this.page); // 当前页数
      const halfFoldPage = Math.floor((foldPage - 2) / 2);

      if (this.allPages > foldPage) {
        if (current - halfFoldPage > 2) {
          this.changePageBtn(0, true);
        } else {
          this.changePageBtn(0, false);
        }

        if (
          current + halfFoldPage <
          this.allPages - 1
        ) {
          this.changePageBtn(1, true);
        } else {
          this.changePageBtn(1, false);
        }
      }

      let arr = [];

      if (this.allPages - 1 < 5) {
        this.changePageBtn(0, false);
        this.changePageBtn(1, false);
        for (let i = 2; i < this.allPages; i++) {
          arr.push(i);
        }
      } else {
        // 左侧省略号显示
        if (this.showNextMore && !this.showPreMore) {
          for (let i = 2; i < foldPage; i++) {
            arr.push(i);
          }
          // 左侧省略号 和 右侧省略号都显示
        } else if (this.showPreMore && this.showNextMore) {
          for (
            let i = current - halfFoldPage;
            i <= current + halfFoldPage;
            i++
          ) {
            arr.push(i);
          }
          // 右侧省略号
        } else if (!this.showNextMore && this.showPreMore) {
          // 当右侧省略号显示的时候,页码不能大于$last,需要往前多显示差额
          var dis =
            current +
            halfFoldPage -
            this.allPages +
            1;

          for (
            let i = current - halfFoldPage - dis;
            i < this.allPages;
            i++
          ) {
            arr.push(i);
          }
          // 都不显示
        } else {
          for (let i = 2; i < this.allPages; i++) {
            arr.push(i);
          }
        }
      }
      return arr;
    }
  }
};
</script>

<style lang="less" scoped>
.pagination-box {
  margin-bottom: 75px;
  justify-content: center;
  align-items: center;
  display: flex;
  .arrow {
    width: 22px;
    height: 22px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .left-arrow {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAa1JREFUWAnt1r1OwzAQAOBzClJfASEh8SYgeIOqkRCllRA/GzNMsMHOhGBp1QGFVwDEk4BUhHiGDvjIZYhME5/PbbCXenJzF98Xx3YDsGz8DCg+7I4+jJ92tMYBZSaJGh71ui/uu+wZC4Huxtk5aLg2h1eg9k763Ufzmk8/8Uk2c+swFEeASzPPtz8XyIYpiitc80WY+d4gFkMjo1poDXmBnBiAz3Ybz8wn9u2vSG8QYCarrdb2IO18ScesyxPtMinmcL/zXlfE55oTFBJDcBYUGkMg6xqSYPIdsZW/pg8aqKlWO0NSzHE/bRRDD1UBxcRUQLExf0D0r/2j8ZkuWtqE1sx/vCazXnlSa4S+GZjpB8FQzRIEiJX1NIMK8rME0ccVU3FDA7zdj7JNJqeRUAkqvvQSuGBGDYKqvKbYO60CohmKiaoFxURZQbFQLCgGygkKjRKBQqLKc4iKcu20l97k57rznBpm2To3jismBtFAEtR0CreuolzcCyRCodrlCrpi3iA3Cr9dRbn4XCAOpVRyxRV0xcS7zDZQ8WGHcEDxBHGUf8C92nKX15uYgV9xt8ZoYDH70QAAAABJRU5ErkJggg==);
  }
  .left-arrow.disabled {
    cursor: auto;
    pointer-events: none;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAcdJREFUWAnt2L1OwzAQAOBzWqBqqr5AZ5gRAwsPgISYs5CqC0Ji4WEY2ajKkrkLCxsLEhIzsMIDVBT6AzG5SrHcNLbPTRsv9VI3d/F9SmLHCsCm6a8A04fN0dsoao2mlT3MrG39vXaC4MN8ljqjEOjmLtrnMRzKw1cAHs7bwbt8zKbv2STLuXkYjMfgHch5tv2lQCrMrLgX120Rcr41SItJRuacfcoFbPtVmxNMGAZsWIubjzZjZnPJIBMGGHzVwe+H7eNhtojNf9Iso2B8aPTD8GRgUzwv1wgqE4NALahsDIKUs4yCGcNkJbcJIWnLvUJUzFUYFn5mUkj6uwByiUHUHMg1BkHiGcK3dvZFiQmiJesMPjPruE2iRtIRoNGUz7YQclD0S8JgPQECIC/awrmOjgDh5kpZgENjB7ZPr3u9pjJnRQEBwp0e8+BJOW5JqLlZhhjXM20B5BqVC3KJUoJcobQgFygjqGwUCVQmSqxDWFTXLs6CF8o61e3e+7pxTDEyCAeioH68wZGpqC5uBaKgOIeWrqApZg0yohj/NhXVxZcC6VBVDs+6gqYYeZapBsKN3WTMdjH+G/O3y06xzzGqOpvj6RX4B3dO+DHNpvvMAAAAAElFTkSuQmCC);
  }
  .right-arrow {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAdFJREFUWAntls1KAzEQgCe7Cn0FEQR9kqJ9A+ki2B8QrTfP9aQ369mTPwgtFWGLj+DPkygo4jMU6Y6ZQsqa3W6zO7O35rBJJpmZj9lJMgDLlh0Blb28ePVuONqJImzTTs9T/cNG/Xmx1vwdLKCbwWgPAR/j5pVS3U6zfhmX5Rl7eTbbexHgLCFD7F0Pw64td52zgEDhWqqjCC6KQvGAUM3Pl4JQLKBKBU90hL5So0TCAlAsoHYQfK/6flW7/iT/qS0nFOuUGYD7h6et38nkVc83jCzRe3B63Ah6CbklEAEim1JQYkBSUKwcsqINB/u779pgVcsL55RohAzg7SDcjADe9Dx3TpUCRGBFoUoDcoWy375SgVyhfE/VTJUgmtQEYLejVvCxKNEnCE2jVzqQcZTVK8QZx2yQpcBZc0luKuyMj1KBXGAoqU3+ENSKIZPuXWBAv2+dxv/qspRT5gqT9tiKA3Fg6C+JAnFhRIEkYMSApGBEgCRhCIh1D/XDcL1omUHO0xoLaDyGK200d82TBmJkLCBAVTOGEr1jUW/r8YAAf2yD03lBGNJlASnlnU8BYh96m9Ju4NiWzCH7YtSnbDtSqkVePMSBrn9eMj0uF5kR+AM8eb5nFP38YwAAAABJRU5ErkJggg==);
  }
  .right-arrow.disabled {
    cursor: auto;
    pointer-events: none;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAbNJREFUWAnt2L1OwzAQAOCzW/5a1BfoCsyIgYWNBQkhxi5E7YbEwsOwICGWlrBkBSHxACxISMwwwwNULdC/GB3oosgqqeO7sECGXuI49lfn0pwK8L9lr4DKPj37bDuK6h+j0hr2XJybPLUajZfZV/3cgwU6v4hWJgDb6eGVhvvDg8Zjui3Pvs7T2e4bg96w20wMm2eX0brd7nrMAoGOK9Mm4qBYIGPU6zQQtvmiWKCluHanQPUlUSxQs7nTr6jqFSjoSaFYTxkhwvCm1ofeHhhYpjY7uj59IiCcXAolBpJCsXLIvi1BsNsdwPCak1OiK0TAkzCsLcC8V04VAkKYL6owkC9KNIfollE8DgKnnMKKga4pFISTuKCGA7X6ayCaKCvGWiepU/gKuSQ3FnYELhTkgsFXSrrKTJaKhFLRFWNXl4WAfDG4GOIgDkYcxMWIgiQwYiApjAhIEoOgEn74bp3ObdWo8b5E6UoG1g/ju+5uSWIQxQIZA8lbmr4hRdeinvpTZIFAmTcaKB19MTgGC1Q28JCG4D4H83W9PWDe49N2VC/r73pmHJvnoxbv75i88/+9/p+IxM8jYH4iNAAAAABJRU5ErkJggg==);
  }
  .pagination {
    padding: 0 20px;
    display: flex;
    .pageNum {
      cursor: pointer;
      z-index: 2;
      display: inline-block;
      font-size: 16px;
      font-weight: 500;
      color: #222222;
      letter-spacing: 0;
      font-family: Arial-Black;
      padding: 0 14px;
    }
    .active {
      color: #759cb6;
      position: relative;
      pointer-events: none;
    }
  }
}
</style>
