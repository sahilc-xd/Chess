import { useNavigate } from "react-router-dom";
import image from "../assets/image_main.jpeg"
import { Button } from "../components/Button";
export const Landing = () => {
    const navigate = useNavigate();

    return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-3/5 h-screen relative">
                    
         <img 
                        src={image} 
            alt="Chess board" 
            className="absolute inset-0 w-full h-full object-cover"
            />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="w-full md:w-2/5 p-8 md:p-16 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6">
            Lets play the <span className="text-yellow-500">Chess Game</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Immerse yourself in the artistry of chess. Our platform marries 
            timeless strategy with contemporary design, offering an unparalleled 
            chess experience that's as visually stunning as it is intellectually stimulating.
            </p>
            <Button onClick={() => {
              navigate("/game");
            }}>Play Online</Button>
          
         
        </div>
      </div>
    </div>
  );
}