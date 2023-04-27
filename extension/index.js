const inputBtn=document.getElementById("input-btn")
let myleads=[]

const inputEl=document.getElementById("input-el")
const ulEl=document.getElementById("ul-el")
const deletebtn=document.getElementById("delete-el")
const leadsfromlocalstorage=JSON.parse(localStorage.getItem("myleads"))
const tabBtn=document.getElementById("save-btn")


if(leadsfromlocalstorage){
    myleads=leadsfromlocalstorage
    render(myleads)
}

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true, currentWindow: true},function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(myleads))
        render(myleads)
    })
})

function render(leads){
    let listitems=""
    for(let i=0;i<leads.length;i++){
        //ulEl.innerHTML+="<li>"+myleads[i]+"</li>"
        listitems+=
        `
        <li>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
        </a>
        </li>
        `
    }
    ulEl.innerHTML=listitems
}
deletebtn.addEventListener("dblclick",function(){
    
    localStorage.clear()
    myleads=[]
    render(myleads)
})
inputBtn.addEventListener("click",function(){
    myleads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myleads",JSON.stringify(myleads))
    render(myleads)
})
