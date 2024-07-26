<script>
import { defineComponent, h } from "vue";

// export default {
//   props: ["icon"],
//   render() {
//     return h(this.icon);
//   },
// };
// </script>
// 上述用vue2写的,下属改用vue3
<script setup>
   
   let props = defineProps({
    icon :{
      type:Object
    }
   })

   let component = defineComponent({
    render(){
      return h(props.icon)
    }
   })
</script> 


