import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid"
import { Button } from "@material-tailwind/react"
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"

const PaginationArrowButton = ({ disabled, handleClick, direction }) => {
    if (direction === 'left') {
        return (
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={handleClick}
                disabled={disabled}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
        )
    } else {
        return (
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={handleClick}
                disabled={disabled}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        )
    }
}

export default PaginationArrowButton