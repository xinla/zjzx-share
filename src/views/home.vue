<template>
  <div class="home">
  	<div @click='$Tool.goPage({name:"detail"})'>detail</div>
  	<div @click='$Tool.goPage({name:"login"})'>login</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home'
}
</script>
