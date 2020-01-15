<template>
  <div class="box">
    <div class="q1">巨魔战将</div>
    <div class="q2">
      <img src="./123456.gif" alt />
    </div>
    <ul class="lt">
      <li>无</li>
      <li>论</li>
      <li>遇</li>
      <li>到</li>
      <li>什</li>
      <li>么</li>
      <li>困</li>
      <li>难</li>
    </ul>
    <ul class="lt1">
      <li>都</li>
      <li>不</li>
      <li>要</li>
      <li>怕</li>
    </ul>
    <ul class="rt">
      <li>微</li>
      <li>笑</li>
      <li>着</li>
      <li>面</li>
      <li>对</li>
      <li>它</li>
    </ul>
    <ul class="rt1">
      <li>消</li>
      <li>除</li>
      <li>恐</li>
      <li>惧</li>
      <li>的</li>
      <li>最</li>
      <li>好</li>
      <li>办</li>
      <li>法</li>
    </ul>
    <ul class="rt2">
      <li>就</li>
      <li>是</li>
      <li>面</li>
      <li>对</li>
      <li>恐</li>
      <li>惧</li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.q1 {
  font-size: 100px;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
}
.q2 {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  position: relative;
  .lt {
    position: absolute;
    top: 20px;
    left: 0;
    li {
      font-size: 50px;
      list-style: none;
    }
  }
  .lt1 {
    position: absolute;
    top: 120px;
    left: 170px;
    li {
      font-size: 50px;
      list-style: none;
    }
  }
  .rt {
    position: absolute;
    top: 80px;
    right: 270px;
    li {
      font-size: 50px;
      list-style: none;
    }
  }
  .rt1 {
    position: absolute;
    top: 20px;
    right: 170px;
    li {
      font-size: 50px;
      list-style: none;
    }
  }
  .rt2 {
    position: absolute;
    top: 80px;
    right: 70px;
    li {
      font-size: 50px;
      list-style: none;
    }
  }
}
</style>
