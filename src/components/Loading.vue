<template>
    <div class="bubble-loading"></div>
</template>

<style scoped>
.bubble-loading {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    position: relative;
    animation: bubble-loader 0.6s linear alternate infinite;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
@keyframes bubble-loader {
    0% {
        box-shadow: -20px 40px 0 4px rgba(0, 0, 0, 0.15), 0 40px 0 0 #333,
            20px 40px 0 0 #333;
    }

    50% {
        box-shadow: -20px 40px 0 0 #333, 0 40px 0 4px rgba(0, 0, 0, 0.15),
            20px 40px 0 0 #333;
    }

    100% {
        box-shadow: -20px 40px 0 0 #333, 0 40px 0 0 #333,
            20px 40px 0 4px rgba(0, 0, 0, 0.15);
    }
}
</style>