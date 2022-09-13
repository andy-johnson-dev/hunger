<template>
  <n-carousel autoplay style="width: 100%; height: 300px">
    <img class="carousel-img" src="../assets/images/fork_logo.png" />
    <img class="carousel-img" src="../assets/images/fork_logo.png" />
    <img class="carousel-img" src="../assets/images/fork_logo.png" />
    <img class="carousel-img" src="../assets/images/fork_logo.png" />
    <template #dots="{ total, currentIndex, to }">
      <ul class="custom-dots">
        <li
          v-for="index of total"
          :key="index"
          :class="{ ['is-active']: currentIndex === index - 1 }"
          @click="to(index - 1)"
        />
      </ul>
    </template>
  </n-carousel>
</template>

<script>
import { NCarousel } from "naive-ui";
export default {
  components: { NCarousel },
};
</script>

<style scoped>
.frame-box {
  max-height: 10vh;
  max-width: 20vw;
}
.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.3);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background-color: rgba(200, 200, 200, 0.6);
}
</style>