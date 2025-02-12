import Image from "next/image";
import { Button } from "../ui/button";

const Header = () => {
    return (
        <div className="p-4 flex justify-between h-[10%]">
            <Image src={'/logo.png'} width={50} height={50} alt={'logo'} />
            <div className="flex gap-2">
                <Button variant="secondary">Sign In</Button>
                <Button className="bg-purple-700 hover:bg-purple-500 text-white">Get Started</Button>
            </div>
        </div>
    );
}

export default Header;