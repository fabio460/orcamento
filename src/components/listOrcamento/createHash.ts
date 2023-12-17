export const hash = ()=>{
    const arr = ['a','b','c','d','e','f','g','h','i','j','l','m','n','o','p','q','r','s','t','u','v','x','z','1','2','3','4','5','6','7','8','9']
    let str = ""
    for (let i = 0; i < arr.length; i++) {
        let pos = (Math.floor(Math.random() * arr.length))
        str += arr[pos];
        
    }
    return str 
}