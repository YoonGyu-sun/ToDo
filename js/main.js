let taskInput = document.getElementById("task-input"); 
let addButton = document.getElementById("add-button"); 

let taskList=[];
addButton.addEventListener('click', addTask); // 버튼 클릭 시 event

function addTask(){
    let taskContent = taskInput.value
    taskList.push(taskContent);
    render();
}

function render() {
    let resultHTML = "";
    for(let i=0; i<taskList.length; i++){
        resultHTML += `<div class="task-list">
                                <div>${taskList[i]}</div>
                            <div>
                                <button>CHECK</button>
                                <button>DELETE</button>
                            </div>
                        </div>`;
    }

    document.getElementById('task-board').innerHTML = resultHTML;
}


// input 값 +버튼 클릭 event 받아와서 innerHTML 해주기

