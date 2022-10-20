const digits=document.querySelectorAll('.digit')
const basicOperators=document.querySelectorAll('.operator')
const specialOperators=document.querySelectorAll('.orange')
const clearButton=document.querySelector('.clearAll')
const currentProblem=document.querySelector('.currentProblem')
const equal=document.querySelector('.equal')
const previousProblem=document.querySelector('.previousProblem')

let currentText=[]

let tempText=''

let displayText=''

let answer=''

for(const digit of digits){
    digit.onmouseup=function(){
        displayText+=digit.innerHTML
        tempText+=digit.innerHTML
        currentProblem.innerHTML=displayText
    }

}

for(const operator of basicOperators){
    operator.onmouseup=function(){
        displayText+=operator.innerHTML
        currentProblem.innerHTML=displayText
        currentText.push(tempText)
        currentText.push(operator.innerHTML)
        console.log(currentText)
        tempText=''
    }
}
let emptyIndexesFiltered=''


equal.onmouseup=function(){
    currentText.push(tempText)
    solveMultiplicationAndDivision()
    emptyIndexesFiltered=currentText.filter(value => (!(value=='')))
    console.log(emptyIndexesFiltered)
    solveAdditionAndSubtraction()
    previousProblem.innerHTML=displayText
    currentProblem.innerHTML='='+answer
    tempText=''
    answer=''
    currentText=[]
    displayText=''
}

clearButton.onmouseup=function(){
    clear()
}




// solveTheOperator = function(){
//     for(i=0;i<currentText.length-2;i+=2){
//         if(currentText[i+1]=='+'){
//             console.log(currentText)
//             answer=Number(currentText[i])+Number(currentText[i+2])
//             currentText[i+2]=answer
//         }
//         if(currentText[i+1]=='-'){
//             console.log(currentText)
//             answer=Number(currentText[i])-Number(currentText[i+2])
//             currentText[i+2]=answer
//         }
//     }
// }
solveAdditionAndSubtraction= function(){
    for(i=0;i<emptyIndexesFiltered.length-2;i+=2){
        if(emptyIndexesFiltered[i+1]=='+'){
            console.log(emptyIndexesFiltered)
            answer=Number(emptyIndexesFiltered[i])+Number(emptyIndexesFiltered[i+2])
            emptyIndexesFiltered[i+2]=answer
        }
        if(emptyIndexesFiltered[i+1]=='-'){
            console.log(emptyIndexesFiltered)
            answer=Number(emptyIndexesFiltered[i])-Number(emptyIndexesFiltered[i+2])
            emptyIndexesFiltered[i+2]=answer
        }
    }
}

solveMultiplicationAndDivision =function(){
    for(i=0;i<currentText.length-2;i+=2){
        if(currentText[i+1]=='x'){
            answer=Number(currentText[i])*Number(currentText[i+2])
            currentText[i+2]=answer
            currentText[i]=''
            currentText[i+1]=''
        }
        else if(currentText[i+1]=='/'){
            answer=Number(currentText[i])/Number(currentText[i+2])
            currentText[i+2]=answer
            currentText[i]=''
            currentText[i+1]=''
        }
    }
}

clear =function(){
    tempText=''
    answer=''
    currentText=[]
    displayText=''
    currentProblem.innerHTML=''
}