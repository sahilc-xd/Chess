export const Button = ({onClick, children }:{onClick:()=>void, children : React.ReactNode}) => {
     return <button onClick={onClick} className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition duration-300 transform hover:scale-105 self-start">
            {children}
          </button>
}
//we have done till 1 hr 19 mins