<template>
  <div class="programa">
    <nav class="tabs">
      <span>
        <button v-for="tab in tabs" type="button" @click="active=tab.key" :class="{active:active==tab.key}" :key="tab.key">
          <aside>
            <small>{{tab.dia}}</small>
          </aside>
          <aside>
            <small>{{tab.data}}</small>
            <small>{{mes}}</small>
          </aside>
        </button>
      </span>
    </nav>
    <div class="content-tab">
      <header>
        {{activetab.name}}
      </header>
      <div class="schedule-ws" v-if="lista.ws">
        <div class="inner-schedule-ws" v-for="sheet in lista.ws" :key="sheet.key">
          <aside>
            <span>{{sheet.Numero}}</span>
            <span>
              <small>{{sheet['Dia']}}</small>
              <small>{{sheet['Horário']}}</small>
            </span>
          </aside>
          <aside>
            <span class="tema-ws">{{sheet.Tema}}</span>
            <span class="wrapper-info">
              <span class="ministrante-ws">{{sheet.Ministrante}}</span>
              <span class="turno-ws">{{sheet.Turno}}</span>
            </span>
          </aside>
        </div>
      </div>
      <div v-if="lista.conf" class="schedule-conf">
        <div v-for="(sheet, index) in lista.conf" :key="index" class="inner-schedule-conf" :class="[sheet.class, sheet.class=='track' ? 'styck-top':'']">
          <aside>
            <span>
              <small>{{activetab.dia}} {{activetab.data}} {{mes}}</small>
              <small>{{sheet.data}}</small>
            </span>
          </aside>
          <aside>
            <article v-html="sheet.plenaria01" :class="{'planeria01': sheet.class =='conferencia'}"></article>
            <article v-html="sheet.plenaria02" :class="{'planeria02': sheet.class =='conferencia'}"></article>
            <article v-html="sheet.plenaria03" :class="{'planeria03': sheet.class =='conferencia'}"></article>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const url="https://docs.google.com/spreadsheets/d/e/2PACX-1vSGvDgbiktqviy8SGcJCirFT5PeLePO-siZZ3oWRHQdNOlti4WXbjsM8EdLNJTDeW31D7eic90YXEIj/pub?output=xlsx"
export default {
  name:'Programa',
  data(){
    let commons={'name': "Programação Científica", classe: 'conferencia'}
    let header_colums = ["Dia", "Horário", "Tema", "Ministrante", "Numero", "Turno"]
    let tab_ws = '15-09-2022'
    return{
      mes:'Set',
      tab_ws,
      active:tab_ws,
      tabs:[
        {data:'15', dia:'Qui', key:tab_ws, name: "WorkShops", classe: 'ws', header_colums:header_colums },
        {data:'16', dia:'Sex', key:'16-09-2022', ...commons, header_colums:[]},
        {data:'17', dia:'Sab', key:'17-09-2022', ...commons, header_colums:[]},
        {data:'18', dia:'Dom', key:'18-09-2022', ...commons, header_colums:[]}
      ],
      sheets: {},
      ws: null,
      loading: false
    }
  },
  computed: {
    lista() {
      let lista = {
        conf:null,
        ws:null
      }
      let key = this.active !== this.tab_ws ? 'conf':'ws'
      lista[key] = this.sheets[this.active]
      return lista
    },
    activetab(){
      let tab = this.tabs.find(tb=>tb.key === this.active) || {}
      return tab
    }
  },
  methods: {
    get_sheets() {
      let oReq = new XMLHttpRequest();
      oReq.open("GET", url, true);
      oReq.responseType = "arraybuffer";
      this.loading = true
      oReq.onload = (e)=> {
        let arraybuffer = oReq.response;
        let data = new Uint8Array(arraybuffer);
        let arr = new Array();
        for (let i = 0; i != data.length; ++i) {
          arr[i] = String.fromCharCode(data[i]);
          binary += String.fromCharCode(data[i]);
        }
        let bstr = arr.join("");
        let cfb = XLSX.read(bstr, {
          type: 'binary',
          dateNF: 'dd/mm/yyyy',
          cellDates: true,
          cellStyles: true
        });
        cfb.SSF['57'] = 'dd/mm/yyyy';
        let colection= {}
        let styles ={}
        for (let s in cfb.SheetNames) {
          if (typeof colection[cfb.SheetNames[s]] == 'undefined') {
            styles[cfb.SheetNames[s]]=[]
            for(let cell in cfb.Sheets[cfb.SheetNames[s]]){
              if(cell !='!ref' || cell !='!cols'){
                let new_value = cfb.Sheets[cfb.SheetNames[s]][cell].h
                if(cfb.Sheets[cfb.SheetNames[s]][cell].w)
                  cfb.Sheets[cfb.SheetNames[s]][cell].w = new_value
                if(cfb.Sheets[cfb.SheetNames[s]][cell].v)
                  cfb.Sheets[cfb.SheetNames[s]][cell].v = new_value
                if(cfb.Sheets[cfb.SheetNames[s]][cell].s && cfb.Sheets[cfb.SheetNames[s]][cell].s.patternType){
                  styles[cfb.SheetNames[s]].push(cfb.Sheets[cfb.SheetNames[s]][cell].s)

                }
              }
            }
            colection[cfb.SheetNames[s]] = XLS.utils.sheet_to_json(cfb.Sheets[cfb.SheetNames[s]], { dateNF: 'dd/mm/yyyy', raw:false });
          }
        }

        // console.log(styles['16-09-2022'])
        for(let s in colection){
          let c = 0;
          for(let t in colection[s]){
            if(!Object.keys(colection[s][t]).some(p=>p ==='class')){
              colection[s][t]['class'] = "conferencia"
            }
              // for(let i in colection[s][t]){

              //   c++
              //   // colection[s][t][`${i}_style`] = {}
              //   // if(styles[s][c] && styles[s][c].patternType !=='none'){
              //   //   colection[s][t][`${i}_style`] = '#'+styles[s][c].bgColor.rgb
              //   // }
              // }

          }

        }
        this.$nextTick(()=>{
          if(colection[this.tab_ws] && colection[this.tab_ws].length <1){
            this.active =  this.tabs.find(t=>t.data=='16').key
          }
          this.sheets = colection
        })
        this.loading = false;

      }
      oReq.send();
    }
  },
  created() {
    const InitLib=()=>{
      return new Promise(resolve=>{
        const xlsxLib = document.querySelector('#xlsx-lib');

        let result=null
        if(xlsxLib==null){
          let injectxlsx = document.createElement('script');
          const src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.12.4/xlsx.core.min.js';

          Object.assign(injectxlsx, {
            src:src,
            id:'xlsx-lib',
            async:''
          })
          document.body.appendChild(injectxlsx)
          result = injectxlsx
        } else {
          result = xlsxLib
        }
        resolve(result)
      })
    }
    InitLib().then(()=>{
      this.get_sheets();
    })
  }
}
</script>
<style lang="scss" src="./style-programa.scss"></style>
