import { Link } from 'react-router-dom'

const Index = ({ children, linkRoute }: { children: JSX.Element, linkRoute: string }) => {
  return (
    <>
      <main className='flex flex-col items-center py-2 h-full'>
        <Link to={'/'+linkRoute} className='btn btn-primary'>
          {linkRoute}
        </Link>
        <section className='py-2 h-full flex justify-center w-full items-center'>
          {children}
        </section>
      </main>
    </>
  )
}

export default Index
