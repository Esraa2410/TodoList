var inputBox = document.getElementById("getData");
var addBtn = document.getElementById("addBtn");
var addBtn1 = document.getElementById("addBtn1");
var todoList = document.getElementById("todoList");
var pendingTasks = document.getElementById("pendingTasks");
var deleteAllBtn = document.getElementById("clearBtn");
let listArray ;
let getLocalstorge = localStorage.getItem('dataList');
let currentIndex = 0 ;

if(getLocalstorge == null){
    listArray = [];
}else{
    listArray = JSON.parse(getLocalstorge);
    showData();
}

inputBox.addEventListener('keyup' , function(){
    let userdata = inputBox.value ;
   // console.log(userdata)
   if(userdata.trim() != 0){
       addBtn.classList.add("active");
       addBtn1.classList.add("active");
   }else{
       addBtn.classList.remove("active");
       addBtn1.classList.remove("active");
   }
})


addBtn.addEventListener('click' , function(){
    let enterData = inputBox.value ;
    listArray.push(enterData);
    console.log(listArray);
    localStorage.setItem('dataList' , JSON.stringify(listArray))


    showData();
})


function showData(){
    pendingTasks.innerHTML = listArray.length;
    if(listArray.length > 0){
        deleteAllBtn.classList.add("active");
    }else{
        deleteAllBtn.classList.remove("active");
    }
    let newList = ``;
    for(let i = 0 ; i < listArray.length ; i++){
        newList+=`<li onclick="update(${i})">${listArray[i]}<span  onclick="deletList(${i})"><i class="fas fa-trash"></i></span></li>
        `
    }
    todoList.innerHTML = newList;
    inputBox.value='';
}

deleteAllBtn.addEventListener('click' , function(){
    listArray = [];
    localStorage.setItem('dataList' , JSON.stringify(listArray));
    showData();

})

function deletList(index){
    listArray.splice(index,1);
    localStorage.setItem('dataList' , JSON.stringify(listArray));
    showData();

}

function update(index){
    currentIndex = index ;
    inputBox.value = listArray[index];

}

addBtn1.addEventListener('click' , function(){
    listArray[currentIndex] = inputBox.value ;
    localStorage.setItem('dataList' , JSON.stringify(listArray));
    showData();
    addBtn.classList.remove("active");
    addBtn1.classList.remove("active");

})