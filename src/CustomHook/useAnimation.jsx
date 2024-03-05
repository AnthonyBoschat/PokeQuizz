

export default function useAnimation(){

    const injectStyleForRefInTimeOut = (
        tableauOfRef, 
        callBackIncrementScoreAnimation,
        index = 0
    ) => {

        const applyStyle = (item, callbackFunction) => {

            const element = item.ref.current.style
            const style = {opacity:"1"}
            const delay = item.delay ? item.delay : 1000
            setTimeout(() => {
                Object.assign(element, style)
                if(callbackFunction){
                    callbackFunction()
                }
            }, delay)
        }

        if(index < tableauOfRef.length){
            applyStyle(
                tableauOfRef[index], 
                () => injectStyleForRefInTimeOut(
                    tableauOfRef,
                    callBackIncrementScoreAnimation,
                    index + 1
                )
            )
        }else{
            callBackIncrementScoreAnimation()
        }
    }

























    const injectClassAnimationForRefInTimeOut = (array) => {
        for(let i = 0; i<array.length; i++){
            setTimeout(() => {
                const element = array[i].ref
                element.add(array[i].class)
            }, array[i].delay);
        }
    }

    return{injectStyleForRefInTimeOut, injectClassAnimationForRefInTimeOut}
}