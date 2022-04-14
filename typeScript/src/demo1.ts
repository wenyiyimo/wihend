// 1、类型 基本类型 数组类型 对象类型 class类型==类类型

/* 基本类型 */
const a:number = 1;

/* 数组类型 */
const b:{
    name:string,
    age:number
} = {
    name:'刘',
    age:18
}

const c:string[] = ['1','2'];

/* 对象类型 */
const d:()=>string = () =>{
    return '123123'
}

/* 类类型 */
class e{
    
}

const f:e = new e();


//2、类型推断和类型注解 ts会自动分析类型 分析的出来就不需要类型注解 分析不出来即全是any 届时就需要类型注解定义数据类型

//3、接口interface
interface g{
    name: string;
    age: number;
    [key: string]: (string| number);
}

function h(info:g){
    console.log(info.name+'你好 你的年龄是'+info.age+'岁');
    info.height && console.log('身高是'+info.height);
}

h({name: '老刘',age:18,height:180})

//4、类
class i{
    name : string;
    constructor(name:string){
        this.name = name
    }
}
const j: i = new i('老刘');
j.name = '老刘'
console.log(j.name);

