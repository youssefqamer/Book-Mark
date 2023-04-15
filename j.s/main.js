let nameinput=document.getElementById("name");
let urlinput=document.getElementById("url");
let content=document.getElementById("data")
let searchinput=document.getElementById("search")
let add=document.getElementById("add")
let nameAlert=document.getElementById('nameAlert')
let urlRequired=document.getElementById('urlRequired')
let urlAlert=document.getElementById('urlAlert')
 let currentindex;
let bookMarklist;
if(localStorage.getItem("bookMarkData")===null){
    bookMarklist=[]
}else{
    bookMarklist=JSON.parse(localStorage.getItem("bookMarkData"))
    showData()
}
function collectData(){
    let myBookMark={
        bName:nameinput.value,
        link:urlinput.value,
    }
    if(nameinput.value!==''){
        nameAlert.classList.add('d-none')
        if(validateLinkeInput()){
            if(add.innerHTML=="Add"){
                bookMarklist.push(myBookMark)
            }else{
            updateData()
        }
        localStorage.setItem("bookMarkData", JSON.stringify(bookMarklist))
        showData()
        clearForm()
        }
    }else{
        nameAlert.classList.remove('d-none')
    }
}
function showData(){
    let div=""
    for(let i=0; i<bookMarklist.length; i++){
        div+=
       ` <div class=" mb-5  bg-warning p-3  linear  ">
       <div  class="d-flex align-items-center justify-content-between w-100">
       <h5 class="fw-bolder  siteName">${bookMarklist[i].bName}</h5>
       <div class='text-center'>
       <a href="${bookMarklist[i].link}" target="_blank" class=" btn bg-info border-0" >visit</a>
       <button class=" btn btn-danger mx-1 my-2" onclick="remove(${i})">Delete</button>
       <button class=" btn btn-dark btn-outline-primary mx-1"onclick="getData(${i})" >Update</button>
       </div>
       </div>
       </div>`
}
content.innerHTML=div
}

function clearForm(){
    nameinput.value=null
   urlinput.value=null
}
function remove(index){
    bookMarklist.splice(index ,1)
    localStorage.setItem("bookMarkData",JSON.stringify(bookMarklist))
   showData()
    }
function search(){
    let div=""
    for(let i=0; i<bookMarklist.length; i++){
        if(bookMarklist[i].bName.toLowerCase().includes(searchinput.value.toLowerCase())){
      div+=
      ` <div class=" mb-5  bg-warning p-3  linear  ">
      <div  class="d-flex align-items-center justify-content-between w-100">
      <h5 class="fw-bolder  siteName">${bookMarklist[i].bName}</h5>
      <div class='text-center'>
      <a href="${bookMarklist[i].link}" target="_blank" class=" btn bg-info border-0" >visit</a>
      <button class=" btn btn-danger mx-1 my-2" onclick="remove(${i})">Delete</button>
      <button class=" btn btn-dark btn-outline-primary mx-1"onclick="getData(${i})" >Update</button>
      </div>
      </div>
      </div>`
        }
}
content.innerHTML=div
}
function getData(index){
nameinput.value=bookMarklist[index].bName
urlinput.value=bookMarklist[index].link
add.innerHTML="Update"
currentindex=index
}
function updateData(){
    bookMarklist[currentindex].bName=nameinput.value
    bookMarklist[currentindex].link=urlinput.value
    add.innerHTML="Add"
}
function validateLinkeInput(){
    let linkValidation=urlinput.value
    if(urlinput.value!==''){
        urlRequired.classList.add('d-none')
        if(/^https:/.test(linkValidation)){
            urlAlert.classList.add('d-none')
            return true
            }else{
                urlAlert.classList.remove('d-none')
            }
    }else{
        urlRequired.classList.remove('d-none')
    }
   
}


