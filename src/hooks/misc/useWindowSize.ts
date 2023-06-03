import { ref,reactive, computed, onBeforeUnmount, watch } from "vue";

interface UseWindowSizeArgs {
    watchWidth?:boolean,
    watchHeight?:boolean,
    widthBreakpoints?: {[key:string]: number},
    heightBreakpoints?: {[key:string]: number},
}

interface CurrentBreakpoint {
    height: string|null,
    width: string|null
}

interface AppSize {
    width:number,
    height:number
}

export function useWindowSize(args : UseWindowSizeArgs |undefined) {


const appSize = reactive<AppSize>({
    width: window.innerWidth,
    height: window.innerHeight,
})

const currentBreakpoint = reactive({
    height:null,
    width:null,
}as CurrentBreakpoint)



function onResize() {
    if (args?.watchHeight) { appSize.height = window.innerHeight }
    if (args?.watchWidth) { appSize.width = window.innerWidth }
}

function renderType(breakpoints:UseWindowSizeArgs["widthBreakpoints"], axis : "width"|"height",appSize:AppSize) {
    let  currentBP = null;
    if (breakpoints) {
        let SortDesc = Object.entries(breakpoints).sort((a, b) => b[1] - a[1])
        for (const [type, breakpoint] of Object.entries(SortDesc)) {
    
           let  currentBP = breakpoint[0];
            if (appSize.width < +breakpoint[1]) {
                currentBP  = breakpoint[0]
            }
            else break;
          }
    }
      return currentBP

}

if (args?.watchWidth || args?.watchHeight) {
    window.addEventListener('resize', onResize);

    onBeforeUnmount(()=> {
    window.removeEventListener('resize', onResize);
    })

    watch(appSize,(newSize)=> {
        currentBreakpoint.width = renderType(args?.widthBreakpoints,'width',newSize)
        currentBreakpoint.height = renderType(args?.heightBreakpoints,'height',newSize)
    },{deep:true})
    
}
return {
    appSize,
    currentBreakpoint,
    
}
}

// watch(()=> appSize),()=> {
//   if (onMobile.value) {
//     if(!preferences.isMenuCompact) {
//       preferences.toggleMenu(false,true)
//     }
//   }
//   else {
//     preferences.refreshMenuCompact()
//   }
// })



// if (onMobile.value && !preferences.isMenuCompact) {
//     preferences.toggleMenu(false,true)
//   }
// }