import { useState, type FC, type FormEvent } from "react"

interface AppProps  {
  first?:number,
  operant?:'+' | '-' | '*' | '/' | 'Не выбрано',
  second?:number
  res?:number
}

const App:FC<AppProps> = () => {
 
  const [resultList,setResultList] = useState<AppProps[]>([])
  const [addRes,setAddRes] = useState<Required<AppProps>>({
    first:0,
    operant:'Не выбрано',
    second:0,
    res:0
  })
  
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    if(addRes.operant === 'Не выбрано'){
      alert('Выберите операнд')
      return
    } 

    const culc = (first:number,operant:string,second:number):number => {
       if(operant === '+'){
        return first+second
       } else if (operant === '-'){
        return first-second
       } else if (operant === '*'){
        return first*second
       } else if (operant === '/'){
        return first/second
       } else {
        return 0
       }
    }
    
    const newResult:Required<AppProps> ={
      first:addRes.first,
      operant:addRes.operant ,
      second:addRes.second,
      res:culc(addRes.first,addRes.operant,addRes.second)
    }
    setAddRes(prev => ({ ...prev, res: newResult.res }))
    setResultList([...resultList,newResult])
    
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Первое число</label>
          <input 
          type="number" 
          value={addRes.first}
          onChange={(e)=>setAddRes({...addRes,first:Number(e.target.value)})}
          required
          />
        </div>
        <div>
          <select value={addRes.operant} onChange={(e)=>setAddRes({...addRes,operant:e.target.value as  '+' | '-' | '*' | '/' | 'Не выбрано'})}>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
            <option value="Не выбрано">Не выбрано</option>
          </select>
        </div>
        <div>
          <label>Второе число</label>
          <input 
          type="number" 
          value={addRes.second}
          onChange={(e)=>setAddRes({...addRes,second:Number(e.target.value)})}
          required
          />
        </div>
        <button type="submit">Выполнить вычисление</button>
      </form>
      <div>
        {resultList.map(res=>(
          <div>
            {res.res}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
