/* 数组 */

/* 定义方式一 类型+[] */
let teacher1: (number | string)[] = [1, 2, '3']
/* 定义方式二 Array+<类型> */
const teacher2: Array<string | number> = [1, 2, '3']


/* 元组 固定了类型固定和长度 */
const student: [string, number] = ['1', 2];

/* object类型 表示非原始类型 string/number/boolean/null/symbol/undefined 意外的类型 为什么没有 object类型 因为直接定义标注的类型不具体所以用ts的(接口|interface)来定义 */
interface article {
    readonly title: string;
    author: string;
    content: string;
    //这两行定义为可选，但是和下面的拓展 同为可有可无 所以会冲突 添加 undefined 类型就不会报错
    color?: string;
    size?: string;
    [key: string]: (string | number | undefined); //一个拓展性 可有可无 延伸至整个对象作用域
}
const articleInfo: article = {
    title: '老刘今天赚多少',
    author: 'Wihend',
    content: '2021/01/01 新的一年开始。。。',
    share: '天纵期才期货大佬分析',
    share1: 123
}
// articleInfo.title = '韦总今天赚多少'; 这里回报错 因为上面第一次赋值之后就不能修改了

/* 定义函数 */
interface toArray {
    (n: number, s: string): [number, string]
}

const toArrayFunction: toArray = (a, b) => {
    return [a, b]
}

console.log(toArrayFunction(1, '3'));


/* 类型别名 */

//1、可以通过type修改已经定义的类型换个名字 即 别名 (感觉没啥用)

type N = number;
type S = string;

interface F1 {
    (a: string): string;
}
type F2 = F1

//2、使用type定义接口
interface a {
    (a: string): string;
}
type b = (a: string) => string;
const c: a = (val) => val;
//3、使用type联合接口 联合类型
interface Cat {
    hand: string;
    foot: string;
}
interface Duck {
    body: string;
}
type Animal = Cat | Duck;
// 错误, Cat没有body字段
// const animal: Cat = { hand: '手', body: '身体', foot: '脚' };
// 正确
const animal: Animal = { hand: '手', body: '身体' };//字段可选择性


//4、使用type交叉类型
interface A { a: number };
interface B { b: string };
type AB = A & B;
// 错误, 缺少a字段
// const ab1: AB = { b: '2' };
// 正确
const ab2: AB = { a: 1, b: '2' };//字段需要补齐


//5、泛形

//泛形类
class person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    aged(age: number = 0) {
        console.log(`${this.name}的年龄是${age}`);
    }
}

/* 派生类包含了一个构造函数，它必须调用super()，它会执行基类的构造函数。 而且，在构造函数里访问this的属性之前，我们一定要调用super()。 这个是TypeScript强制执行的一条重要规则。 */
class person1 extends person {
    constructor(name: string) {
        super(name)
    }
    aged(age = 5) {
        console.log('person1...');
        super.aged(age)
    }
}

class person2 extends person {
    constructor(name: string) {
        super(name)
    }
    aged(age = 45) {
        console.log('person2...');
        super.aged(age)
    }
}

let sam = new person1("老刘");
let tom: person = new person2("老刘");

sam.aged();
tom.aged(34);

/* 泛形方法定义 */
class ABC {
    getFirst<T>(data: T[]): T {
        return data[0]
    }
}
let ABCresult = new ABC().getFirst([1, 2, 3]);
console.log(ABCresult);
/* 泛形type */
type fane1<T> = T[];
const fane11: fane1<string> = ["1", "2", "3"];
/* 泛形接口 */
interface fane2<T = string> {
    name: string,
    photo: number,
    age: T
}
const fane: fane2<number> = {
    name: '213',
    photo: 213213,
    age: 123
}
/* 泛形约束 */
function fan3<T extends {name: string}>(input: T):T{
    // console.log(input.name);这里默认input没有name属性所以需要通过"extends"可以约束"T"的范围
    return input
}
/* 多个类型变量 */
function fan4<T,U>(a:T, b:U):[T,U]{
    return [a,b]
}


//6.工具类型
type tool1 = {a:number,b:string};

/* Partial < T > 让属性都变成可选的 */
type tools1 = Partial<tool1>;


/* Required<T> 让属性都变成必选. */
type tool2 = {a?:number,b?:string}
type tools2 = Required<tool2>
// const tools2s: tools2 = {a:1}


/* Pick<T,K> 只保留自己选择的属性, K代表要保留的属性键值 */
type pick2 = Pick<{ a: number, b: string ,c:boolean},'a'|'b'|'c'>
const pick3:pick2 = { a: 1, b: '2',c:false}

/* Omit<T,K> 实现排除已选的属性. */
type omit = Omit<{ a: number, b: string, c: boolean },'b'|'c'>
const pick4: omit = { a: 1 }


/* Record<K,T>创建一个类型,K代表键值的类型, T代表值的类型 */
type record = Record<string, number>;// 等价{[k:string]:string}

/* Record 案例 他会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型 */
interface record1 {
    name: string;
    age: number;
    manage: boolean;
}

let record2 : Record<number, record1> = {
    0: {name: '老刘', age: 12, manage: false},
    1: { name: '老王', age: 86, manage: true }
}
/* Record 案例 */

type recod3 = 'a'|'b';
interface recod4 {
    name: string;
    age: number;
}
type records = Record<recod3,recod4>;
let record5:records = {
    'a':{
        name: 'liu',
        age: 86
    },
    'b': {
        name: 'liu',
        age: 86
    },
}


document.body.addEventListener('click', e=>{
  	// 报错, 因为e.target的类型是EventTarget, 其上没有innerHTML
    // e.target.innerHTML = 'test'; 
    // 正确
    (e.target as HTMLElement).innerHTML = 'test';
    // 等价
    (<HTMLElement>e.target).innerHTML = 'test';
});







