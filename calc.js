const digits=document.querySelectorAll('.digit')
const basicOperators=document.querySelectorAll('.operator')
const specialOperators=document.querySelectorAll('.orange')
const clearButton=document.querySelector('.clearAll')
const currentProblem=document.querySelector('.currentProblem')
const equal=document.querySelector('.equal')
const previousProblem=document.querySelector('.previousProblem')
const chooseInteger=document.querySelector('.chooseInteger')
const percentage=document.querySelector('.percentage')

let currentText=[]

let tempText=''

let displayText=''

let answer=''

for(const digit of digits){
    digit.onmouseup=function(){
        if(!(tempText.includes('%'))){
        tempText+=digit.innerHTML
        displayText+=digit.innerHTML
        currentProblem.innerHTML=displayText
    }
}}

for(const operator of basicOperators){
    operator.onmouseup=function(){
        if(/[0-9]/g.test(tempText)){
        displayText+=' '+operator.innerHTML+' '
        currentProblem.innerHTML=displayText
        currentText.push(tempText)
        currentText.push(operator.innerHTML)
        console.log(currentText)
        tempText=''
    }
}}

let emptyIndexesFiltered=''


chooseInteger.onmouseup=function(){
    let index=displayText.lastIndexOf(tempText)
    if(!(tempText.includes('-')))  tempText='-'+tempText 
    else tempText=tempText.replace('-','')
    displayText=displayText.slice(0,index) + tempText
    currentProblem.innerHTML=displayText
}

percentage.onmouseup=function(){
    if(/[0-9]/g.test(tempText)){
        let index=displayText.lastIndexOf(tempText)
        if(!(tempText.includes('%')))  tempText+='%' 
        else tempText=tempText.replace('%','')
        displayText=displayText.slice(0,index) + tempText
        currentProblem.innerHTML=displayText
    }}







equal.onmouseup=function(){
    if(/[0-9]/g.test(tempText) && (currentText.length>1 || tempText.includes('%') )){
    currentText.push(tempText)
    console.log(currentText)
    solvePercents()
    solveMultiplicationAndDivision()
    emptyIndexesFiltered=currentText.filter(value => (!(value=='')))
    solveAdditionAndSubtraction()
    previousProblem.innerHTML=displayText
    currentProblem.innerHTML='= '+answer
    clear()
}}

clearButton.onmouseup=function(){
    clear()
    currentProblem.innerHTML=''
}


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

solvePercents=function(){
    for(i=0;i<currentText.length;i++){
        if(currentText[i].includes('%')){
            currentText[i]=currentText[i].replace('%','')
            answer=Number(currentText[i])/100
            currentText[i]=answer.toFixed(currentText[i].length+1)
        }
    }
}


clear =function(){
    tempText=''
    answer=''
    currentText=[]
    displayText=''
}