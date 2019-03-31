<template>
  <div class="about">
    <h3>What is TaskBurner?</h3>
    <p>TaskBurner is a simple, intuitive and effective way to manage your class load.</p>
    <p>
      Create a new project for each class or semester assignment, then add the tasks and steps for each thing you
      need to do. Then use TaskBurners organizational features to help you manage your semester and nail all of your
      assignments.
    </p>
    <div class="h-center">
      <div class="non-flexible big-logo"></div>
    </div>
    <p>
      Currently it is just static and holds bogus tasks for my CS 260, Math 313 and English 316 classes - however it
      will be developed further.
    </p>
    <p>Stay tuned!</p>
  </div>
</template>
<style scoped>
.h-center {
  display: flex;
  justify-content: center;
}

.non-flexible {
  flex: 0 0 auto;
}

.big-logo {
  height: 400px;
  width: 400px;
  background-image: url("/img/blaze_sm.png");
  background-size: 340px;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  border: var(--primary-color) solid 15px;
  border-radius: 50%;
  margin: 40px;
}
</style>
