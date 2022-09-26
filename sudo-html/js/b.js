class a{
  let sss;
  constructor(){
    this.b = 0
  }
  
  add(){
    this.b++
  },
  sss.a(){
    
  }
  
  
}

var c = new a();
c.add();
console.log(c.b)

class d extends a {
  constructor() {
    super();
  }
}

setTimeout(()=>{
  var e = new d();
  console.log(e.b)
  e.add();
  console.log(e.b)
},500)


