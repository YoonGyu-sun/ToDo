let taskInput = document.getElementById("task-input"); 

let addButton = document.getElementById("add-button"); 
let tabs = document.querySelectorAll(".task-tabs div");
let taskList=[];
let mode = "all";
let filterList=[];

taskInput.addEventListener('keypress', function(event){
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("add-button").click();
    }
});


addButton.addEventListener('click', addTask); // 버튼 클릭 시 event



for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event);
    });
}

function addTask(){
    if(document.getElementById("task-input").value == ""){
        alert("입력을 먼저 해주세요!");
        return;
    }
    let task = {
        id:randomId(),
        taskContent: taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    // console.log(taskList);
    taskInput.value ="";
    render();
}

function render() {
    //1. 내가 선택한 탭에 따라서 리스트를 달리 보여준다.

    let list = [];
    if(mode === 'all'){
        list = taskList;
    }else if(mode === 'notdone'){
        list = filterList;
    }else if(mode === 'done'){
        list = filterList;
    }

    let resultHTML = "";
    for(let i=0; i<list.length; i++){
        // 만약에 true이면
        if(list[i].isComplete == true){
            resultHTML += `<div class="task-list">
                            <div class="task-done-background">
                                <div class="task-done">${list[i].taskContent}</div>
                            </div>
                        <div>
                            <button class="emoji-button" onclick="toggleComplete('${list[i].id}')">↩️</button>
                            <button class="emoji-button" onclick="deleteTask('${list[i].id}')">🗑️</button>
                        </div>
                    </div>`
        }else{
            resultHTML += `<div class="task-list">
                             <div>${list[i].taskContent}</div>
                            <div>
                                <button class="emoji-button" onclick="toggleComplete('${list[i].id}')">✅</button>
                                <button class="emoji-button" onclick="deleteTask('${list[i].id}')">🗑️</button>
                            </div>
                        </div>`;
        }
    }

    document.getElementById('task-board').innerHTML = resultHTML;
}


// input 값 +버튼 클릭 event 받아와서 innerHTML 해주기


function toggleComplete(id){ // 값에 대한 true false를 바꿔주기
    // console.log(id);
    for(let i = 0; i<taskList.length; i++){  //개수만큼 id를 비교하는건데 낭비일 수가 있어서 여기부분 코드 수정도 필요할부분
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id){
    for(let i = 0; i<taskList.length; i++){  //개수만큼 id를 비교하는건데 낭비일 수가 있어서 여기부분 코드 수정도 필요할부분
        if(taskList[i].id == id){
            taskList.splice(i, 1)
            break;
        }
    }
    filterList = taskList.filter(function(task){
        if(mode === "notdone"){
            return !task.isComplete;
        } else if(mode === "done"){
            return task.isComplete;
        } else {
            return true; // "all" 모드에서는 모든 task를 포함합니다.
        }
    });
    render();
}

function filter(event){
    // console.log("filter", event.target.id);
    
    mode = event.target.id;
    
    var underline = document.getElementById('under-line');
    var shift = 90;
    
    switch(mode) { // id값 구분
        case "all":
            underline.style.left = '200px'; 
            break;
        case "notdone":
            underline.style.left = (1 * shift +190) + 'px'; 
            break;
        case "done":
            underline.style.left = (2 * shift +190) + 'px';
            break;
    }


    filterList = []; // 진행중 또는 진행되지 않은 것들만 선택하기 위한 배열
        if( mode == "all"){
            render();
        }else if( mode == "notdone"){
            for(let i =0; i<taskList.length; i++){
                if(taskList[i].isComplete===false){
                    filterList.push(taskList[i]);
                    // console.log(filterList);
                }
                render();
            }
        }else if( mode == "done"){
            for(let i =0; i<taskList.length; i++){
                if(taskList[i].isComplete===true){
                    filterList.push(taskList[i]);
                    // console.log(filterList);
                }
                render();
            }
        }
}

function randomId(){
    return '_' + Math.random().toString(36).substr(2, 9); 
}

