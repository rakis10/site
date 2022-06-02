<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">Pridanie </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <label> Meno</label>
              <input v-model="meno" name="nm"> <br>
              <label> Pocet</label>
              <input v-model="pocet" name="pct"> <br>
              <label> Hrubka</label>
              <select  name="hr" v-model="hr" @change="onChangeHr($event)" >
                <option  v-for="item in hrubky"
                         :value="item._id"
                >{{item.name}}</option>
              </select> <br>
              <label> Dlzka</label>
              <select name="dl" v-model="dl" @change="onChangeDl($event)">
                <option  v-for="item in dlzky"
                         :value="item._id"
                >{{item.name}}</option>
              </select>


            </slot>


          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                  class="modal-close-button"
                  @click="$emit('close')"
              >Close</button>
              <button
                  class="modal-default-button"
                  @click="this.close()"
              >OK</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "modalPridajZasobu",
  computed: mapGetters(["zasoby_list", "hrubky", "dlzky", "user"]),
  data(){
    return {
      hr: "",
      dl: ""
    }

  },
  methods: {
    ...mapActions(["getZasoby", "getHrubka", "getDlzky", "getProfile", "pridajZasobu"]),
    onChangeDl: function(e){
      this.dl  =e.target.value

    },
    onChangeHr: function(e){
      this.hr  =e.target.value

    },
    close(){

      let zasoba = {
        name: this.meno,
        typDlzka: this.dl,
        typHrubka : this.hr,
        pocet: parseInt(this.pocet)
      };

      console.log(zasoba)
      this.pridajZasobu(zasoba).then(res => {
        if (res.data.success) {
          // this.$router.push("login");
          this.$emit('close')
        }else{
          // TODO toaster o neuspesnomm
        }
      });


    }

  }, props: {
    show: Boolean,
    meno: String,
    pocet: Number
  },

  created() {
    this.getDlzky();
    this.getHrubka();

    this.getProfile();
  },

}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>