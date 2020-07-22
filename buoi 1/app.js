// let str ='hello world'; // kieu string 
// console.log(typeof str); // kieu tra thi them typeof
// str = 1;
// console.log(typeof str);
// let y 
// console.log(y) // kieu undifine

// let arr = [1,2,3,4,5,4]
// console.log(arr)
// console.log(arr.lastIndexOf(4));
// arr.push(6); // day vao cuoi cung
// console.log(arr);
// arr.unshift(0)// them vao dua mang
// console.log(arr)

// const student = {
//     name:'Nguyen Tien Thuan',
//     age: 18,
//     sing: function (){
//         console.log('Sing a song')
//     }
// }
// student.age = 20;
// console.log(student.age);
// student.sing();

// // function in js 
// function sum (a,b){ // a va b la input
//     return a+b;
// }

// const sum2 = (a,b) =>{ // arrow function
//     return a+b;
// }
// sum2();
// // const sum2 = (a,b)=>a+b la nhu cai tren

// const arr =[1,2,3,4,5,6,7,8]
// const myFunction =(arr)=>{// cmt : cmt k+C hay c=u la bo
//     for(let i=0;i<arr.length;i++){
//         console.log(arr[i]);
//         if(i==3){
//             arr[i]=10;
//         }
//     }
//     // for (const element of arr){
//     //     console.log(element)
//     // }
// } 
// const function2 = () =>{
//     if(true){
//         let a=10;
//     }
//     console.log(a)// day la bien cuc bo nen khong truy xuat duoc  con var la bien toan cuc dung var thi se truy xuat duoc ra a
// }
// function2();
const my_button = document.getElementById('my_button')// co the .querySelector thi phai them dau //#endregion
my_button.addEventListener('click',()=>{
    //document.getElementsByClassName('change_html_content')[0].innerHTML = 'Hello World'// or inner text
    //document.getElementsByClassName('change_html_content')[0].style='font-size:30px'
    document.querySelector('.change_html_content').classList.add('size_30px') // them 1 class thi moi co the su dung ben css. neu bat su kien thi phai them cai nay khong thi phai viet nhu o tren nhung viet the nay thi se nhat quan viet style ben css
})



    
    


