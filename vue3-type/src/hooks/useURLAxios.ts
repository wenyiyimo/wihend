import {ref} from 'vue'
import axios from 'axios'


function useUrlAxios(url:string){
    const result = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const loaded = ref(false)

    axios.get(url).then((res)=>{
        result.value = res.data
        loading.value = false
        loaded.value = true
    }).catch((err)=>{
        error.value = err
        loading.value = false
        loaded.value = false
    })

    return {
        result,
        loading,
        error,
        loaded
    }
}

export default useUrlAxios
