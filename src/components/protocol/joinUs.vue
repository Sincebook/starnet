<template>
  <div>
    <div class="body clearfix">
      <ul>
        <li>
          <h4>工作地址</h4>
          <p>郑州市金水区文化路97号16号楼大学生创新创业基地</p>
        </li>
        <li>
          <h4>联系方式</h4>
          <p>
            电话：186 3873 2919 <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; 130 3034 2526
          </p>
          <p>
            邮箱：186 3873 2919 <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; 130 3034 2526
          </p>
        </li>
        <li>
          <h4>公司简介</h4>
          <p>
            河南森思软件科技有限公司，成立于2018年，是一家从事于各类软件定制开发的互联网公司。公司累计开发大小软件20余项，服务人群10万余人，合作公司30余家。
          </p>
        </li>
        <li>
          <h4>管理团队</h4>
          <p>
            CEO: 邓奎 <br />
            CTO:雒新元 <br />
            Web Developer:符家榕 <br />
            Account: 张杰
          </p>
        </li>
        <li>
          <h4>关注我们</h4>
          <p>郑州市金水区文化路97号16号楼大学生创新创业基地</p>
        </li>
        <li>
          <h4>法律信息</h4>
          <p>郑州市金水区文化路97号16号楼大学生创新创业基地</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang='less' scoped>
.clearfix:after,
.clearfix:before {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1;
}

.body {
  padding: 50px 50px;
}

.body h4 {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 1em;
}

.body p {
  line-height: 25px;
}

li {
  list-style: none;
}

.body ul li {
  float: left;
  width: 250px;
  /* height: 250px; */
  background-color: white;
  margin: 20px;
}

.body ul li h4 {
  font-size: 1.2em;
  margin: 25px 0 20px 0;
  font-weight: 400;
}

.body ul li p {
  font-size: 1em;
  line-height: 30px;
}

.body ul li:nth-child(3n) {
  margin-right: 0px;
}
</style>
