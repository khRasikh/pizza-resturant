import Image from 'next/image'
import { getUsers } from './components/users'

export default async function Home() {
  const data = await getUsers()
  const filteredData = data.filter((item: { id: number; }) => item.id === 100 || item.id === 99);

  return (
    <div>
      Welcome to SSR Home
      <ul>
        {filteredData.map((i: any) =>{
          return <div key={i.userId}>
            <li >{i.userId}</li>
            <li>{i.id}</li>
            <li>{i.title}</li>
          </div>
        })}
      </ul>
    </div>
  )
}
