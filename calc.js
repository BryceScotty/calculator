const problemHolder=document.querySelector('.problemHolder')

const digits=document.querySelectorAll('.digit')
const basicOperators=document.querySelectorAll('.operator')
const specialOperators=document.querySelectorAll('.orange')
const clearButton=document.querySelector('.clearAll')
const currentProblem=document.querySelector('.currentProblem')
const equal=document.querySelector('.equal')
const previousProblem=document.querySelector('.previousProblem')
const chooseInteger=document.querySelector('.chooseInteger')
const percentage=document.querySelector('.percentage')
const decimal=document.querySelector('.decimal')
const deleteButton=document.querySelector('.delete')
const bottomHalf=document.querySelector('.bottomHalf')
const screen=document.querySelector('.screen')
const leftParentheses=document.querySelector('.leftParentheses')
const rightParentheses=document.querySelector('.rightParentheses')
const powers=document.querySelector('.powers')


let ayo=prompt('enter number','')

let currentText=[]

let tempText=''

let displayText=ayo

let answer=''

let backSearch=''

let parentCounter=0

let numberNegative=''

for(const digit of digits){
    digit.onmouseup=function(){
        if(digit.innerHTML=='.' || digit.innerHTML=='Del') return
        if(/[)|%]/g.test(displayText.charAt(displayText.length-1))) displayText+=' x '
        displayText+=digit.innerHTML
        currentProblem.innerHTML=displayText
    }
}

decimal.onmouseup=function(){
    let lastDecimalIndex=displayText.lastIndexOf('.')
    if(displayText.lastIndexOf(' ')>lastDecimalIndex || displayText.lastIndexOf('(')>lastDecimalIndex || !/[ |.]/.test(displayText)){
        if(/[)|%]/.test(displayText.slice(-1))){
            displayText+=' x ' + decimal.innerHTML
            currentProblem.innerHTML=displayText
        }
        else{
        displayText+=decimal.innerHTML
        currentProblem.innerHTML=displayText
        }
    }
}

deleteButton.onmouseup=function(){
    if(displayText.slice(-1)==')'){
        parentCounter++
        console.log(parentCounter)
    }
    if(displayText.slice(-1)=='(') {
        parentCounter--
        console.log(parentCounter)
    }
    if(displayText.slice(-1)==' '){
        displayText=displayText.slice(0,-3)
        currentProblem.innerHTML=displayText
    }
    else {
    displayText=displayText.slice(0,-1)
    currentProblem.innerHTML=displayText
    }
}

for(const operator of basicOperators){
    operator.onmouseup=function(){
        if(/[.]/g.test(displayText.charAt(displayText.length-1)) && (/[^0-9|]/g.test(displayText.charAt(displayText.length-2)) || displayText.length<=2)) return
        else if(/[0-9|%|.|)]/g.test(displayText.charAt(displayText.length-1))){
            displayText+=' '+operator.innerHTML+' '
            currentProblem.innerHTML=displayText
        }
        else if(/[x|/|+\-]/g.test(displayText.charAt(displayText.length-2))){
            displayText=displayText.slice(0,-2)
            displayText+=operator.innerHTML+' '
            currentProblem.innerHTML=displayText
            console.log('uhu')
        }
    }
}


let emptyIndexesFiltered=''


chooseInteger.onmouseup=function(){
    console.log(displayText)
    if(displayText.slice(-1)=='-'){
        displayText=displayText.slice(0,-1)
        currentProblem.innerHTML=displayText
    }
    else if(displayText.slice(-1)==' ' || displayText==''){
        displayText+='-'
        currentProblem.innerHTML=displayText
    }
    else if(displayText.slice(-1)==')'){
        let integerParenthesesCounter=1
        for(i=displayText.length-2;integerParenthesesCounter>0;i--){
            if (displayText[i]==')') integerParenthesesCounter++
            else if (displayText[i]=='('){
                integerParenthesesCounter--
                if(integerParenthesesCounter==0){
                    console.log(displayText[i])
                    if(!(displayText[i-1]=='-')){
                        displayText=displayText.slice(0,i) + '-'+ displayText.slice(i)
                        currentProblem.innerHTML=displayText
                    }
                    else if(displayText[i-1]=='-'){
                        displayText=displayText.slice(0,i-1) + displayText.slice(i)
                        currentProblem.innerHTML=displayText
                    }
                }
            }
        }
        

    }
    else if(/[0-9|.|%|(]/.test(displayText.slice(-1))){
        let index=displayText.lastIndexOf(' ')
        let leftParentIndex=displayText.lastIndexOf('(')
        console.log(index + '' + leftParentIndex)
        if(index>leftParentIndex){
            if(/[0-9|%|.]/.test(displayText.slice(index+1,index+2))){
                displayText=displayText.slice(0,index+1) + '-' + displayText.slice(index+1)
                currentProblem.innerHTML=displayText
            }
            else if(displayText.slice(index+1,index+2)=='-') {
                displayText=displayText.slice(0,index+1) + displayText.slice(index+2)
                currentProblem.innerHTML=displayText
            }
        }
        else {
            console.log('sj')
            if(displayText.slice(-1)=='('){
                displayText+='-'
                currentProblem.innerHTML=displayText
            }
            else if(/[0-9|.|%]/.test(displayText.charAt(leftParentIndex+1))){
                displayText=displayText.slice(0,leftParentIndex+1) + '-' + displayText.slice(leftParentIndex+1)
                currentProblem.innerHTML=displayText
            }
            else if(displayText.charAt(leftParentIndex+1)=='-') {
                displayText=displayText.slice(0,leftParentIndex+1) + displayText.slice(leftParentIndex+2)
                currentProblem.innerHTML=displayText
            }
        }
    }

}

percentage.onmouseup=function(){
    if(displayText=='' || displayText.slice(-1)=='('){
        console.log('sjsj')
        displayText+='%'
        console.log(displayText)
        currentProblem.innerHTML=displayText
        console.log(currentProblem.innerHTML)
    }
    else if(/[.]/g.test(displayText.charAt(displayText.length-1)) && (/[^0-9|]/g.test(displayText.charAt(displayText.length-2)) || displayText.length<=2)) return
    else if(/[0-9|.| |\-]/g.test(displayText.charAt(displayText.length-1))){
        displayText+='%'
        currentProblem.innerHTML=displayText
    }
    else if(/[)]/g.test(displayText.charAt(displayText.length-1))){
        displayText+=' x %'
        currentProblem.innerHTML=displayText
    }
    else if(/[%]/g.test(displayText.charAt(displayText.length-1))){
        displayText=displayText.slice(0,-1)
        currentProblem.innerHTML=displayText
    }
}

rightParentheses.onmouseup=function(){
    if(/[(]/g.test(displayText.charAt(displayText.length-1))) return
    else if(/[.]/g.test(displayText.charAt(displayText.length-1)) && (/[^0-9|]/g.test(displayText.charAt(displayText.length-2)) || displayText.length<=2)) return
    if(parentCounter>=1){
        parentCounter--
        displayText+=rightParentheses.innerHTML
        currentProblem.innerHTML=displayText
    }
}

leftParentheses.onmouseup=function(){
    if(/[(]/g.test(displayText.charAt(displayText.length-1))) return
    else if(/[.]/g.test(displayText.charAt(displayText.length-1)) && (/[^0-9|]/g.test(displayText.charAt(displayText.length-2)) || displayText.length<=2)) return
    if(/[0-9|(|)|%|.]/g.test(displayText.charAt(displayText.length-1))){
        displayText+=' x '+leftParentheses.innerHTML
        currentProblem.innerHTML=displayText
        parentCounter++
    }
    else{
        displayText+=leftParentheses.innerHTML
        currentProblem.innerHTML=displayText
        parentCounter++
    }
}



// powers.onmouseup=function(){
//     const para=document.createElement("span")
//     para.innerHTML='sjsj'
//     para.style='height: 80%, display:flex'
//     problemHolder.appendChild(para)
//     console.log('sjs')
//     // const brum=document.createElement('span')
//     // brum.innerHTML='sksk'
//     // brum.style.height="80%"
//     // currentProblem.appendChild(brum)
// }

powers.onmouseup=function(){
    if(displayText.slice(-1)=='^') return
    displayText+=powers.innerHTML
    currentProblem.innerHTML=displayText
}

equal.onmouseup=function(){
    if(/[0-9]/.test(displayText)){
        if(/[0-9|.|)|%]/.test(displayText.slice(-1))){
            if(/[.]/g.test(displayText.charAt(displayText.length-1)) && (/[^0-9|]/g.test(displayText.charAt(displayText.length-2)) || displayText.length<=2)) return
            for(;parentCounter>=1;parentCounter--){
                displayText=displayText+')'
            }
            previousProblem.innerHTML=displayText
            solveParent()
            currentText=displayText.split(' ')
            console.log(currentText)
            console.log(displayText)
            solveExponents()
            solvePercents()
            solveMultiplicationAndDivision()
            emptyIndexesFiltered=currentText.filter(value => (!(value=='')))
            solveAdditionAndSubtraction()
            if(!(/[ |%|^]/.test(displayText))) currentProblem.innerHTML='= '+displayText
            else currentProblem.innerHTML='= '+answer
            if(/[-\-]/.test(currentProblem.innerHTML)) currentProblem.innerHTML=currentProblem.innerHTML.replaceAll('--','')
            clear()
        }
    }
}

clearButton.onmouseup=function(){
    clear()
    currentProblem.innerHTML=''
}
let tempBlog=''


solveExponents=function(){
    console.log('xxx   '+displayText)
    console.log(currentText)
    tempBlog=currentText
    for(i=0;i<currentText.length;i++){
        console.log('ye')
        if(currentText[i].includes('^')){
            let currentTextSubArray=currentText[i].split(/[\^|(]/)
            console.log(currentTextSubArray)
            for(j=currentTextSubArray.length-2;j>=0;j--){
                console.log('parent!!!  ' +currentTextSubArray[j])
                if(currentTextSubArray[j].includes(')') ){
                    currentTextSubArray[j]=currentTextSubArray[j].replace(')','')
                    currentTextSubArray[j]=Number(currentTextSubArray[j])**Number(currentTextSubArray[j+1])
                }
                // else if(currentTextSubArray[j].includes('--')){
                //     currentTextSubArray[j]=currentTextSubArray[j].replace('-','')
                //     console.log(currentTextSubArray)
                //     currentTextSubArray[j]=(Number(currentTextSubArray[j])**Number(currentTextSubArray[j+1]))*-1
                // }
                else if (currentTextSubArray[j]=='-') {
                    console.log(currentTextSubArray[j])
                    console.log(currentTextSubArray[j+1])
                    currentTextSubArray[j]=-1*Number(currentTextSubArray[j+1])
                }
                else if (currentTextSubArray[j].includes('-') && !/[)]/.test(currentTextSubArray[j])) {
                    currentTextSubArray[j]=currentTextSubArray[j].replace('-','')
                    currentTextSubArray[j]=(Number(currentTextSubArray[j])**Number(currentTextSubArray[j+1]))*-1
                }
                else{
                    currentTextSubArray[j]=Number(currentTextSubArray[j])**Number(currentTextSubArray[j+1])
                }
                currentTextSubArray[j+1]=''
                currentTextSubArray=currentTextSubArray.filter(value => (!(value==' ')))
                console.log(currentTextSubArray)
                currentText[i]=String(currentTextSubArray[j])
                answer=String(currentTextSubArray[j])
            }
        }
    }
    displayText=displayText.replace(tempBlog,currentText.join(' '))
}

let boof=0

solveParent=function(){
    currentText=displayText.split('')
    // while(displayText.includes('(')){
    //     currentText.reduce((value, item, index) =>{
    //         if(item=='('){
    //             value++
    //             if(value>=boof){
    //                 boof=index
    //             }
    //         }
    //         else if(item==')'){
    //             value--
    //         }
    //         console.log('value    '+value)
    //         return value
    //     },0)
    while(displayText.includes('(')){
        let trueIndex=displayText.lastIndexOf('(')
        let noof=displayText.indexOf(')',trueIndex)
        let doof=displayText.slice(trueIndex, noof+1)
        console.log('doof     '+doof)
        currentText=doof.replace(/[)|(]/g,'').split(' ')
        currentText=currentText.filter(value => (!(value==' ')))
        console.log('ct     '+currentText)
        solveExponents()
        if(currentText.length>1){
            solvePercents()
            solveMultiplicationAndDivision()
            emptyIndexesFiltered=currentText.filter(value => (!(value=='')))
            solveAdditionAndSubtraction()
        }
        else answer=currentText
        console.log(answer)
        console.log(displayText.charAt(trueIndex-1))
        console.log(displayText.charAt(noof+1))
        // if(displayText.charAt(displayText.charAt(noof+1)=='^')){
        //     displayText=displayText.replace(doof,'('+answer+')')
        //     console.log('exp     '+displayText)
        //     if (displayText.charAt(trueIndex-1)=='-'){
        //         currentText=displayText.slice(trueIndex-1)
        //         tempBlog=currentText
        //     }
        //     else currentText=displayText.slice(trueIndex)
        //     solveExponents()
        //     console.log('NOOOF'+   noof)
        //     displayText=displayText.replace(tempBlog,currentText)
        // }
        displayText=displayText.replace(doof,answer)
        console.log('answer    '+answer)
        boof=0
        console.log('noof   '+noof)
        console.log('displaytext        '+displayText)
        currentText=displayText.split('')
    }
}

solveAdditionAndSubtraction= function(){
    console.log(emptyIndexesFiltered)
    for(i=0;i<emptyIndexesFiltered.length-2;i+=2){
        if(emptyIndexesFiltered[i+1]=='+'){
            console.log(emptyIndexesFiltered)
            answer=Number(emptyIndexesFiltered[i])+Number(emptyIndexesFiltered[i+2])
            emptyIndexesFiltered[i+2]=answer
            console.log(emptyIndexesFiltered)
        }
        if(emptyIndexesFiltered[i+1]=='-'){
            console.log(emptyIndexesFiltered)
            answer=Number(emptyIndexesFiltered[i])-Number(emptyIndexesFiltered[i+2])
            emptyIndexesFiltered[i+2]=String(answer)
            console.log(emptyIndexesFiltered)
        }
    }
}

solveMultiplicationAndDivision =function(){
    currentText=currentText.map(item => item.includes('--') ? item.replace('--',''): item)
    console.log(currentText)
    // for(i=0;i<currentText.length-1;i++){
    //     if
    // }
    for(i=0;i<currentText.length-2;i+=2){
        if(currentText[i+1]=='x'){
            console.log(currentText)
            answer=Number(currentText[i])*Number(currentText[i+2])
            currentText[i+2]=String(answer)
            currentText[i]=''
            currentText[i+1]=''
            console.log(currentText)
        }
        if(currentText[i+1]=='/'){
            console.log(currentText)
            answer=Number(currentText[i])/Number(currentText[i+2])
            currentText[i+2]=String(answer)
            currentText[i]=''
            currentText[i+1]=''
            console.log(currentText)
        }
    }
}

solvePercents=function(){
    for(i=0;i<currentText.length;i++){
        console.log(currentText)
        if(currentText[i]=='%'){
            currentText[i]='0.01'
        }
        else if(currentText[i]=='-%'){
            currentText[i]='-0.01'
        }
        console.log(currentText)
        if(/[%]/.test(currentText[i])){
            currentText[i]=currentText[i].replace('%','')
            answer=Number(currentText[i])/100
            currentText[i]=answer.toFixed(currentText[i].length+2)
        }
    }
}


clear =function(){
    tempText=''
    answer=''
    currentText=[]
    displayText=''
    parentCounter=0
}






const slider=document.querySelector('.slider')
const sliderBox=document.querySelector('.theme')


sliderBox.onmouseup=function(){
    if(/[a-b]/.test(slider.style.transform)) slider.style.transform=''
    else slider.style.transform=`translateX(100%)`
    for(const specialOperator of specialOperators){
        specialOperator.classList.toggle('orangeWhiteMode')
    }
    for(const digit of digits){
        digit.classList.toggle('digitWhiteMode')
    }
    for(const operator of basicOperators){
        operator.classList.toggle('operatorWhiteMode')
    }
    document.body.classList.toggle('bodyWhiteMode')
    bottomHalf.classList.toggle('bottomHalfWhiteMode')
    screen.classList.toggle('screenWhiteMode')
    slider.classList.toggle('sliderWhiteMode')
    sliderBox.classList.toggle('sliderBoxWhiteMode')
    equal.classList.toggle('equalANDclearAllWhiteMode')
    clearButton.classList.toggle('equalANDclearAllWHiteMode')
    equal.classList.toggle('equalANDclearAllWHiteMode')
}











