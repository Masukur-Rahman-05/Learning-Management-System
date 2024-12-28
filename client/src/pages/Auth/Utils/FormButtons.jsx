import { Button } from "@/components/ui/button";

export const CustomRegisterButton = ({children}) => {
    return (
        <Button
            type="submit"
            className="w-full bg-violet-500 text-white hover:bg-violet-700"
    
        >
            {children}
    </Button>
        
    )
};
export const CustomLoginButton = ({children}) => {
    return (
        <Button
            type="submit"
            className="w-full bg-violet-500 text-white hover:bg-violet-700"
    
        >
            {children}
    </Button>
        
    )
};
