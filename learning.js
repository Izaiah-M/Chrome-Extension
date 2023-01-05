// Building a chrome extension

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")

// localStorage.setItem("myLeads", "www.example.com")
// localStorage.getItem("myLeads")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// rendering function for when the stuff is input
function render(leads) {
    
    let listItems = ""
    
    for (let i = 0; i < leads.length; i++) {
    
        // listItems += "<li><a target= '_blank' href= '" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItems += `
            <li>
               <a target= '_blank' href= '${leads[i]}'>
                  ${leads[i]}
               </a>
            </li>`
    
    
    
    
        // ALternatively    
        // const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(li)
    }
    
    ulEl.innerHTML = listItems
    
    }

// The event listener for the save btn/ Giving the save btn functionality
inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

// giving the delete btn functionality

const deleteBtn = document.getElementById("delete-btn")

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

//  giving hte tab btn functionality 

const tabBtn = document.getElementById("tab-btn")

tabBtn.addEventListener("click", function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)  
      })
})

// const errorMsg = document.getElementById("error-msg")
// deleteBtn.addEventListener("click", function(){
    
//     errorMsg.textContent = "Double click to delete"
//     setTimeout( ()=> {
//     errorMsg.textContent = ""
//     }, 1000)
// })

