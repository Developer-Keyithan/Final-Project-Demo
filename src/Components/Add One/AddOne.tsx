import './AddOne.css'

interface AddOneProps {
    textContent: string;
    onClick: () => void;
}

const AddOne: React.FC<AddOneProps> = ({ textContent, onClick }) => {
    return (
        <button className="add-container" onClick={onClick}>
            + {textContent}
        </button>
    );
};

export default AddOne;
