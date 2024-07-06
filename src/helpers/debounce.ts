export const searchDebounceHandler = (cb: React.Dispatch<React.SetStateAction<string>>, time = 500) => {  
  let id: number | undefined
  return (text: string) => {
    clearTimeout(id)
    id = setTimeout(() => {
      localStorage.setItem('searchText', text)
      cb(text)
    }, time)
  }
}