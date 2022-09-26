function fanA<T>(value:T):T {
    return value;
}

console.log(fanA(1));

function fanB<T,U>(value:T,message:U):T {
    return value;
}

console.log(fanB(1,"hello"));

const fanC = <T>(value:T):T => {
    return value;
}

// 交叉类型 &

type fanD = (a:number,b:number) => void;
type fanE = (a: string, c: string) => void;
type fanF = (a: number, c: string) => void;

let fanF: fanD & fanE & fanF = (a: number | string, b?: number | string) => {}

fanF(1,2);
fanF("1","2");
fanF(1,'2');
// fanF('1', 2);


interface fanG {
    name: string;
    age: number;
    [porName:string]:string|number;
}


