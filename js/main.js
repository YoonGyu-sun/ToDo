let taskInput = document.getElementById("task-input"); 
let addButton = document.getElementById("add-button"); 

let taskList=[];
addButton.addEventListener('click', addTask); // 버튼 클릭 시 event

function addTask(){
    let task = {
        id:randomId(),
        taskContent: taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = "";
    for(let i=0; i<taskList.length; i++){
        // 만약에 true이면
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task-list">
                            <div class="task-done-background">
                                <div class="task-done">${taskList[i].taskContent}</div>
                            </div>
                        <div>
                            <button class="emoji-button" onclick="toggleComplete('${taskList[i].id}')">↩️</button>
                            <button class="emoji-button" onclick="deleteTask('${taskList[i].id}')">🗑️</button>
                        </div>
                    </div>`
        }else{
            resultHTML += `<div class="task-list">
                             <div>${taskList[i].taskContent}</div>
                            <div>
                                <button class="emoji-button" onclick="toggleComplete('${taskList[i].id}')">✅</button>
                                <button class="emoji-button" onclick="deleteTask('${taskList[i].id}')">🗑️</button>
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
    render();
}

function randomId(){
    return '_' + Math.random().toString(36).substr(2, 9); 
}

